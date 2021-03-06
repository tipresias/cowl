#!/bin/bash

set -euo pipefail

# Deploy main app
APP_DIR=/var/www/${PROJECT_ID}
APP_DOCKER_IMAGE=cfranklin11/${PROJECT_ID}_app:latest
PORT=80
CI=${CI:-""}


if [ "${CI}" ]
then
  sudo chmod 600 ~/.ssh/deploy_rsa
  sudo chmod 755 ~/.ssh
fi

echo "Building production image"

docker pull ${APP_DOCKER_IMAGE}
docker build --cache-from ${APP_DOCKER_IMAGE} -t ${APP_DOCKER_IMAGE} .
docker push ${APP_DOCKER_IMAGE}

echo "Uploading source maps to Rollbar"

# Save a short git hash, must be run from a git
# repository (or a child directory)
COMMIT_HASH=$(git rev-parse --short HEAD)

docker run \
  --rm \
  -e ROLLBAR_TOKEN=${ROLLBAR_TOKEN} \
  -e COMMIT_HASH=${COMMIT_HASH} \
  -v ${PWD}:/app \
  -w /app \
  ${APP_DOCKER_IMAGE} bash ./scripts/upload_source_maps.sh

echo "Deploying main app to DigitalOcean..."

scp -i ~/.ssh/deploy_rsa -oStrictHostKeyChecking=no \
  docker-compose.prod.yml \
  ${DIGITAL_OCEAN_USER}@${PRODUCTION_HOST}:${APP_DIR}/docker-compose.yml

RUN_APP="
  cd ${APP_DIR} \
    && docker pull ${APP_DOCKER_IMAGE} \
    && docker-compose stop \
    && docker-compose up -d
"

# We use 'ssh' instead of 'doctl compute ssh' to be able to bypass key checking.
ssh -i ~/.ssh/deploy_rsa -oStrictHostKeyChecking=no \
  ${DIGITAL_OCEAN_USER}@${PRODUCTION_HOST} \
  ${RUN_APP}

if [ $? != 0 ]
then
  exit $?
fi

./scripts/wait-for-it.sh ${PRODUCTION_HOST}:${PORT} \
  -t 60 \
  -- ./scripts/post_deploy.sh

echo "Main app deployed!"

# Deploy tipping service
echo "Deploying serverless functions..."

SERVICE_DOCKER_IMAGE=cfranklin11/${PROJECT_ID}_tipping:latest

# Need lots of deploy-specific env vars, so we use docker instead of docker-compose
docker run \
  -v ${HOME}/.aws:/app/.aws \
  -e AWS_SHARED_CREDENTIALS_FILE=".aws/credentials" \
  -e TIPRESIAS_APP=${TIPRESIAS_APP} \
  -e TIPRESIAS_APP_TOKEN=${TIPRESIAS_APP_TOKEN} \
  -e DATA_SCIENCE_SERVICE=${DATA_SCIENCE_SERVICE} \
  -e DATA_SCIENCE_SERVICE_TOKEN=${DATA_SCIENCE_SERVICE_TOKEN} \
  -e TIPPING_SERVICE_TOKEN=${TIPPING_SERVICE_TOKEN} \
  -e MONASH_USERNAME=${MONASH_USERNAME} \
  -e MONASH_PASSWORD=${MONASH_PASSWORD} \
  -e FOOTY_TIPS_USERNAME=${FOOTY_TIPS_USERNAME} \
  -e FOOTY_TIPS_PASSWORD=${FOOTY_TIPS_PASSWORD} \
  -e SPLASH_SERVICE=${SPLASH_SERVICE} \
  -e ROLLBAR_TOKEN=${ROLLBAR_TOKEN} \
  ${SERVICE_DOCKER_IMAGE} \
  npx sls deploy

echo "Serverless functions deployed!"

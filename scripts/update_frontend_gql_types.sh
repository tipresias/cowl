#!/bin/bash

set -euo pipefail

CI=${CI:-""}
DOCKER_RUN="docker-compose run --rm frontend"
ENDPOINT="http://host.docker.internal:8000/graphql"

echo "Checking GraphQL type compatibility..."

if [ "${CI}" ]
then
  PORT_MAP="3000:3000"
  DOCKER_RUN="
    docker run \
      --rm \
      -p $PORT_MAP \
      -v $PWD/frontend:/app \
      -v /app/node_modules \
      -e CI=$CI \
      cfranklin11/tipresias_frontend:latest
  "
  ENDPOINT="http://172.17.0.1:8000/graphql"

  docker-compose -f docker-compose.ci.yml up -d
fi

./scripts/wait-for-it.sh localhost:8000 -- echo "Server ready"

$DOCKER_RUN \
yarn run apollo client:download-schema \
  --config=src/apollo.config.js \
  --endpoint=$ENDPOINT

$DOCKER_RUN \
yarn run apollo client:codegen graphql-types \
  --target=flow \
  --includes=src/graphql/index.js \
  --tagName=gql \
  --localSchemaFile=schema.json

if [ "${CI}" ]
then
  git diff --color --exit-code frontend/schema.json
fi

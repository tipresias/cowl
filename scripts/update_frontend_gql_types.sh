#!/bin/bash

set -euo pipefail

CI=${CI:-"false"}
DOCKER_RUN="docker-compose run --rm frontend"

echo "Checking GraphQL type compatibility..."

if [[ $CI = "true" ]]
then
  DOCKER_RUN="
    docker run \
      --rm \
      -p "3000:3000" \
      -v $PWD/frontend:/app \
      -v /app/node_modules \
      -e CI=$CI \
      cfranklin11/tipresias_frontend:latest
  "
fi

docker-compose -f docker-compose.ci.yml up -d

./scripts/wait-for-it.sh localhost:8000 -- \
  $DOCKER_RUN \
  yarn run apollo client:download-schema --config=src/apollo.config.js

$DOCKER_RUN \
yarn run apollo client:codegen graphql-types \
  --target=flow \
  --includes=src/graphql/index.js \
  --tagName=gql \
  --localSchemaFile=schema.json

if [[ $CI = "true" ]]
then
  git diff --color --exit-code frontend/schema.json
fi

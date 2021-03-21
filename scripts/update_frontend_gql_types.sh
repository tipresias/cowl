#!/bin/bash

set -euo pipefail

CI=${CI:-""}
DOCKER_RUN=""
ENDPOINT="http://localhost:8000/graphql"

echo "Checking GraphQL type compatibility..."

if [ "${CI}" ]
then
  DOCKER_RUN="docker-compose -f docker-compose.ci.yml run --rm frontend"
  ENDPOINT="http://backend:8000/graphql"

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
  git diff --color --exit-code schema.json
fi

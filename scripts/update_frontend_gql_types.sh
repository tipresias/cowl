#!/bin/bash

set -euo pipefail

CI=${CI:-""}

echo "Checking GraphQL type compatibility..."

if [ "${CI}" ]
then
  docker-compose -f docker-compose.ci.yml up -d
fi

./scripts/wait-for-it.sh localhost:8000 -- echo "Server ready"

yarn run apollo client:download-schema \
  --config=apollo.config.js \
  --endpoint=http://localhost:8000/graphql

yarn run apollo client:codegen graphql-types \
  --target=typescript \
  --includes=graphql/index.ts \
  --tagName=gql \
  --localSchemaFile=schema.json

if [ "${CI}" ]
then
  git diff --color --exit-code schema.json
fi

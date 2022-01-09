#!/bin/bash

set -euo pipefail

CI=${CI:-""}

echo "Checking GraphQL type compatibility..."

if [ "${CI}" ]
then
  docker-compose -f docker-compose.ci.yml up -d
fi

./scripts/wait-for-it.sh localhost:8000 -- echo "Server ready"

npx apollo client:download-schema \
  --config=src/apollo.config.js \
  --endpoint=http://localhost:8000/graphql

npx apollo client:codegen graphql-types \
  --target=typescript \
  --includes=src/graphql/index.ts \
  --tagName=gql \
  --localSchemaFile=schema.json

if [ "${CI}" ]
then
  git diff --color --exit-code schema.json
fi

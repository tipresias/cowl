#!/bin/bash

set -euo pipefail

CI=${CI:-""}

echo "Checking GraphQL type compatibility..."

if [ "${CI}" ]
then
  # docker-compose -f docker-compose.ci.yml up -d

  docker run \
  --rm \
  -d \
  --name backend \
  -p "8000:8000" \
  -e DATABASE_HOST=http://localhost:5432 \
  -e EMAIL_RECIPIENT=test@test.com \
  -e SENDGRID_API_KEY=test \
  -e CI=1 \
  -e DATABASE_NAME=$DATABASE_NAME \
  -e DATA_SCIENCE_SERVICE=$DATA_SCIENCE_SERVICE \
  -e DATA_SCIENCE_SERVICE_TOKEN=$DATA_SCIENCE_SERVICE_TOKEN \
  $BACKEND_IMAGE \
  python3 manage.py runserver 0.0.0.0:8000
fi

./scripts/wait-for-it.sh localhost:8000 -- echo "Server ready"

yarn run apollo client:download-schema \
  --config=src/apollo.config.js \
  --endpoint=http://localhost:8000/graphql

yarn run apollo client:codegen graphql-types \
  --target=flow \
  --includes=src/graphql/index.js \
  --tagName=gql \
  --localSchemaFile=schema.json

if [ "${CI}" ]
then
  git diff --color --exit-code schema.json
  docker stop backend
fi

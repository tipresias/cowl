#!/bin/bash

set -euo pipefail

#### SETUP ####
DOCKER_COMPOSE_FILE=docker-compose.ci.yml
DEFAULT_DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS_MODULE:-""}
DEFAULT_DATABASE_NAME=${DATABASE_NAME}

export DJANGO_SETTINGS_MODULE=project.settings.test

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

#### SEED TEST DB ####
./scripts/wait-for-it.sh localhost:8000 -t 30 -- \
  docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
    backend python3 server/tests/fixtures/seed_db.py

# There's probably a better way to do this, but we change the default DB name
# to test_$DATABASE_NAME, which the app will then use as the default DB
# for the browser tests. This follows Django's naming convention for test DBs.
export DATABASE_NAME="test_${DEFAULT_DATABASE_NAME}"

# Restarting backend for the new env var to be used
docker-compose -f ${DOCKER_COMPOSE_FILE} stop backend
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d backend
./scripts/wait-for-it.sh localhost:8000 -- echo "Server ready"

npm run dev & ./scripts/wait-for-it.sh http://localhost:3000 -- echo "App ready"

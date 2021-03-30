#!/bin/bash

set -euo pipefail

cleanup () {
  # Need to stop backend & sleep a bit to make sure there are no
  # connections to test database when trying to drop it
  docker-compose -f ${DOCKER_COMPOSE_FILE} stop backend
  sleep 1

  echo "Dropping ${DATABASE_NAME}"
  docker-compose -f ${DOCKER_COMPOSE_FILE} exec -T db psql \
    -U postgres \
    -d postgres \
    --command "DROP DATABASE IF EXISTS ${DATABASE_NAME}"

  # Need to stop before exiting to reset to non-test env vars
  docker-compose -f ${DOCKER_COMPOSE_FILE} stop

  export DJANGO_SETTINGS_MODULE=${DEFAULT_DJANGO_SETTINGS_MODULE}
  export DATABASE_NAME=${DEFAULT_DATABASE_NAME}
}

#### SETUP ####
DOCKER_COMPOSE_FILE=docker-compose.ci.yml
DEFAULT_DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS_MODULE:-""}
DEFAULT_DATABASE_NAME=${DATABASE_NAME}

export DJANGO_SETTINGS_MODULE=project.settings.test

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

trap cleanup EXIT

#### SEED TEST DB ####
./scripts/wait-for-it.sh localhost:8000 -t 30 -- \
  docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
    backend python3 server/tests/fixtures/seed_db.py

#### RUN TESTS ####

# There's probably a better way to do this, but we change the default DB name
# to test_$DATABASE_NAME, which the app will then use as the default DB
# for the browser tests. This follows Django's naming convention for test DBs.
export DATABASE_NAME="test_${DEFAULT_DATABASE_NAME}"

# Restarting backend for the new env var to be used
docker-compose -f ${DOCKER_COMPOSE_FILE} stop backend
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d backend

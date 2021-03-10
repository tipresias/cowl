#!/bin/bash

#### SETUP ####
DOCKER_COMPOSE_FILE=docker-compose.ci.yml
DEFAULT_DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS_MODULE}
FRONTEND_CONTAINER=frontend

export DJANGO_SETTINGS_MODULE=project.settings.test

docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

#### SEED TEST DB ####
./scripts/wait-for-it.sh localhost:8000 -t 30 -- \
  docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
    backend python3 server/tests/fixtures/seed_db.py

# We manually manage exit codes rather than using pipefail, because we want
# to be sure to stop docker-compose before exiting.
EXIT_CODE=$?

if [ ${EXIT_CODE} != 0 ]
then
  # Need to stop before exiting to reset to non-test env vars
  docker-compose -f ${DOCKER_COMPOSE_FILE} stop
  export DJANGO_SETTINGS_MODULE=${DEFAULT_DJANGO_SETTINGS_MODULE}
  docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

  exit ${EXIT_CODE}
fi

#### RUN TESTS ####

# There's probably a better way to do this, but we change the default DB name
# to test_$DATABASE_NAME, which the app will then use as the default DB
# for the browser tests. This follows Django's naming convention for test DBs.
DEFAULT_DATABASE_NAME=${DATABASE_NAME}
export DATABASE_NAME="test_${DEFAULT_DATABASE_NAME}"

# Restarting backend for the new env var to be used
docker-compose -f ${DOCKER_COMPOSE_FILE} stop backend
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d backend
docker run \
  --rm \
  -d \
  -p "3000:3000" \
  -v $PWD/frontend:/app \
  -v /app/node_modules \
  -e CI=$CI \
  --name $FRONTEND_CONTAINER \
  cfranklin11/tipresias_frontend:latest

./scripts/wait-for-it.sh localhost:3000 -- \
  docker-compose -f ${DOCKER_COMPOSE_FILE} run --rm \
    browser_test npx cypress run

EXIT_CODE=$?

#### CLEANUP ####
# Need to stop before exiting to reset to non-test env vars
docker-compose -f ${DOCKER_COMPOSE_FILE} exec db psql \
  -U postgres \
  -d ${DATABASE_NAME} \
  --command "DROP DATABASE ${DATABASE_NAME}"

docker stop $FRONTEND_CONTAINER
docker-compose -f ${DOCKER_COMPOSE_FILE} stop

export DJANGO_SETTINGS_MODULE=${DEFAULT_DJANGO_SETTINGS_MODULE}
export DATABASE_NAME=${DEFAULT_DATABASE_NAME}

exit ${EXIT_CODE}

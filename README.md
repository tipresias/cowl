# cowl

[![build](https://github.com/tipresias/cowl/actions/workflows/build.yml/badge.svg)](https://github.com/tipresias/cowl/actions/workflows/build.yml)

Frontend code for the Tipresias app

## Running things

### Setup

#### Install dependencies

- Install [`nvm`](https://github.com/nvm-sh/nvm) (or an alternative Node version manager).
  - Run `nvm install` then `nvm use` to work with the correct Node version for this app.
- Install [`yarn`](https://classic.yarnpkg.com/en/docs/install).
- Run `yarn` to install the project's `node_modules`.

#### Set up API

- Follow the instructions for setting up and running the [Tipresias API](https://github.com/tipresias/tipresias)

### Run the app

- Make sure the `tipresias` app is running.
- Run `yarn start`.
- Navigate to `localhost:3000`.

### Testing

- Run `yarn test` to run unit tests.
- With both the app and API running, use `yarn run cypress run` to run Cypress browser tests (see Cypress documentation for more options)

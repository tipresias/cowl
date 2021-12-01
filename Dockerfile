# Specifying the sha is to guarantee that CI will not try to rebuild from the
# source image (i.e. node:13.5), which apparently CIs are bad at avoiding on
# their own.
# Using buster-slim instead of alpine, because there's an open issue
# about flow not working on alpine, and the response is *shrug*
FROM node:17.1.0-buster-slim@sha256:75b6629366aa4dc8b8f40dd3d92ec957657ac0d12432143ce47d3d56e1c0e8d6

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Add rest of the client code
COPY . .

EXPOSE 3000

CMD yarn start

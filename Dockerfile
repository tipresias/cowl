# Specifying the sha is to guarantee that CI will not try to rebuild from the
# source image (i.e. node:13.5), which apparently CIs are bad at avoiding on
# their own.
# Using buster-slim instead of alpine, because there's an open issue
# about flow not working on alpine, and the response is *shrug*
FROM node:16.10.0-buster-slim@sha256:9bec98898848c3e3a1346bc74ab04c2072da9d0149d8be1ea0485dbf39fd658f

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Add rest of the client code
COPY . .

EXPOSE 3000

CMD npm run dev

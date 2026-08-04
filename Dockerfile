FROM node:24-slim

WORKDIR /src

COPY . .

RUN yarn

# Baked into the bundle, not read at runtime: the federation remote entry is
# resolved inside the Vite config while the client is built, so a Cloud Run
# environment variable would arrive far too late to change it.
#
# `/api/client` rather than `/client` because the API is private — everything it
# serves reaches the browser through this server's proxy, under one prefix.
ENV KICL_API_REMOTE_ENTRY=/api/client/remoteEntry.js

RUN yarn run build:client

EXPOSE 3001

CMD [ "yarn", "run", "build:server" ]
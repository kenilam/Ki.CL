FROM node:24-slim

WORKDIR /src

COPY . .

RUN yarn

RUN yarn run build:client

EXPOSE 3001

CMD [ "yarn", "run", "build:server" ]
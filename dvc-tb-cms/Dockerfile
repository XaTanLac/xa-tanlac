ARG NODE_ENV

FROM node:20-alpine3.21

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /opt/
COPY package.json ./ 
RUN npm install -g node-gyp pm2
RUN npm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app

COPY . . 
RUN chown -R node:node /opt/app
USER node
RUN npm run build
RUN rm -rf src
RUN rm -rf database
RUN rm -rf config
RUN rm -rf types
RUN rm -rf tsconfig.json
RUN rm docker-compose.yml
RUN rm docker-compose-prod.yml
RUN rm Dockerfile

EXPOSE 1337

CMD ["node", "server.js"]

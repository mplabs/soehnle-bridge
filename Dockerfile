FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY ./src/server.js .

EXPOSE 1337

CMD [ "node", "server.js" ]

FROM node:14.16-alpine3.13

ADD . /app

WORKDIR /app

RUN npm install

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]

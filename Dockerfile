FROM node:12.14-alpine3.9

ADD . /app

WORKDIR /app

RUN npm install
RUN rm -R .git

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]

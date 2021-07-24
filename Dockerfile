FROM node:15

WORKDIR /var/www

COPY ./dist dist

COPY ./deploy .

COPY ./server.js server.js

RUN npm i

EXPOSE $PORT

CMD npm run start

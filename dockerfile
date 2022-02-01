FROM node:14.17.0-alpine3.12

RUN npm i -g typescript

RUN npm i -g @nestjs/cli@8.0.0

ADD . server/

WORKDIR /server
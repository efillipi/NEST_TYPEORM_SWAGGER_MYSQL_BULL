- [x] NodeJS - Typescript,
- [x] Docker,
- [x] NEST,
- [x] MYSQL,
- [x] REDIS,
- [x] TYPEORM
- [x] SWAGGER
- [x] JWT
- [x] ACCESS LEVEL
- [x] SOLID
- [x] BULL-QUEUE

## Getting started

1. Clone this repository;<br />
2. Start MYSQL. `docker run -d --name mysql --env MYSQL_ROOT_PASSWORD=efillipi --env MYSQL_DATABASE=api -p 3306:3306 bitnami/mysql:latest`<br />
3. Start REDIS. `docker run -d --name redis -e REDIS_PASSWORD=efillipi -p 6379:6379 bitnami/redis:latest`<br />
4. Rename `env_example` for `.env` (If you want to put your own variables of Bank and api port)
5. Run `npm or yarn install` on API.<br />
6. Run `npm or yarn typeorm migration:run`.<br />
7. Run `npm or yarn typeorm migration:run -c seed` up db info.<br />
8. Run `yarn start:prod or start:dev or start` on API.<br />
9. Enjoy sending requests to REST API available at `http://localhost:3333`.<br />
  9.1. You can import `Insomnia file` - `Insomnia.yaml`.<br />
10. Log in to `http://localhost:3333/swagger` view the API documentation .<br />
11. Log in to `http://localhost:3333/admin/queues` view the API queue .<br />

## Users API

- USER-ADM

  API_USER_ADM_NAME=ADM
  API_USER_ADM_LOGIN=adm@adm.com
  API_USER_ADM_SENHA=102030

- USER-USER

  API_USER_NAME=USER
  API_USER_LOGIN=user@user.com
  API_USER_SENHA=102030

## DOCKER COMPOSE

1. Clone this repository;<br />
2. Start docker compose. `docker-compose up`<br />

<h3 align="center">Developed by Edney Fillipi</h3>

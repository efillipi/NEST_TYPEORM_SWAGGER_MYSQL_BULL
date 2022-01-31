- [x] NodeJS com Typescript,
- [x] Docker,
- [x] Nest,
- [x] Mysql,
- [x] TYPEORM
- [x] Swagger
- [x] JWT
- [x] BULL-QUEUE

## Getting started

1. Clone this repository;<br />
2. Start MYSQL. `docker run -d --name mysql --env MYSQL_ROOT_PASSWORD=efillipi --env MYSQL_DATABASE=api -p 3306:3306 mysql:latest`<br />
3. Start REDIS. `docker run -d --name redis -e REDIS_PASSWORD=efillipi -p 6379:6379 bitnami/redis:latest`<br />
4. Run `npm or yarn install` on API.<br />
5. Rename `env_example` for `.env` (If you want to put your own variables of Bank and api port)
6. Run `yarn typeorm migration:run`.<br />
7. Run `yarn start:prod or start:dev or start` on API.<br />
8. Enjoy sending requests to REST API available at `http://localhost:3333`.<br />
  8.1. You can import `Insomnia file` - `Insomnia.yaml`.<br />
9. Log in to `http://localhost:3333/swagger` view the API documentation .<br />
10. Log in to `http://localhost:3333/admin/queues` view the API queue .<br />

<h3 align="center">Developed by Edney Fillipi</h3>

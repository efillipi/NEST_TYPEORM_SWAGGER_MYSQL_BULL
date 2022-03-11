/* eslint-disable @typescript-eslint/no-var-requires */
const dotevnt = require('dotenv');

dotevnt.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.production',
});

module.exports = [
  {
    name: process.env.DB_NAME,
    type: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATION],
    cli: {
      migrationsDir: process.env.TYPEORM_CLI,
    },
  },
  {
    name: 'seed',
    type: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_SEEDING_SEEDS],
    cli: {
      migrationsDir: process.env.TYPEORM_SEEDING_CLI,
    },
  },
];

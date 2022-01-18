/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  name: process.env.DB_NAME,
  type: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE,
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  migrations: [process.env.TYPEORM_MIGRATION],
  cli: {
    migrationsDir: process.env.TYPEORM_CLI,
  },
};

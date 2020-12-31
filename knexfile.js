require('dotenv').config();

const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_DATABASE;
const port = process.env.DATABASE_PORT || 3306;

module.exports = {
  client: 'mysql',
  migrations: {
     directory:'./terceirizaai/migrations'
  },
  connection: {
    host,
    user,
    port,
    password,
    database
  },
  pool: { min: 0, max: 7 }
};

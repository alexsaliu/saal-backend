// ENVIRONMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config();

// POSTGRES DB CONNECTION
const {Pool, Client} = require('pg');
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/saal`;
const db = new Client({connectionString: connectionString});
// const db = new Client("postgres://qsxqqkci:hWGkN9yANYqdvbHRAOU6bApsgpuS6_QN@rosie.db.elephantsql.com:5432/qsxqqkci");

db.connect();

module.exports = {
  dbConnection: db
}

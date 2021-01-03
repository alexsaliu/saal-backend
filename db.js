// ENVIRONMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config();

// POSTGRES DB CONNECTION
const {Pool, Client} = require('pg');
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

// const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/saal`;
const connectionString = `postgres://elucotbv:cbWLPWqArK8aTiaSrbuJ1M_87XUDnFlQ@rosie.db.elephantsql.com:5432/elucotbv`;
const db = new Client({connectionString});

db.connect();

module.exports = {
  dbConnection: db
}

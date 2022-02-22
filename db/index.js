// Connect to DB
const { Client } = require("pg");
require("dotenv").config(); // this code allows us to use process .env. Anything that uses client uses this. So anywhere else you use .env outside of client you need this

const DB_NAME = "RPG-Data";
const DB_URL =
  process.env.DATABASE_URL || `postgres://postgres@localhost:5432/${DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = {
  client,
};

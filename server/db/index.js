require("dotenv").config();
// The easiest and by far most common way to use node-pg is through a connection pool (instead of Client).
const { Pool } = require("pg");

// Create a client with specific connection information
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_NAME,
  port: process.env.REACT_APP_DB_PORT, // optional, default PostgreSQL port is 5432
});

// Connect to our DB using Promise, cd into /server/db and run node index.js || yarn dev
pool
  .connect()
  .then(() =>
    console.log(
      `Connected to ${process.env.REACT_APP_DB_NAME}, welcome ${process.env.REACT_APP_DB_USER}`
    )
  )
  .catch((err) => console.error("Failed to connect to DB", err.stack));

/* 
   query function which we export, so we can use it other places in our app for querying.
   - text will be something like 'SELECT * FROM $1'
   - params something like this array: ['users'] i.e. the table name
*/
module.exports = {
  async query(text, params) {
    const res = await pool.query(text, params);
    return res;
  },
};

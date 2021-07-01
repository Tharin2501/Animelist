require("dotenv").config();
const { Client } = require("pg");

// Create a client with specific connection information
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_NAME,
  port: process.env.REACT_APP_DB_PORT, // optional, default PostgreSQL port is 5432
});

// Connect to our DB using Promise, cd into /server/db and run node index.js
client
  .connect()
  .then(() =>
    console.log(`connected to ${client.database}, welcome ${client.host}`)
  )
  .catch((err) => console.error("Failed to connect to DB", err.stack));

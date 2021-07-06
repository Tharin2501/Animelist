require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");

//  everywhere else in my application instead of requiring pg directly, I'll require this file
const db = require("./db");

// Since CRA is using 3000, we’ll just make the server port 3001.
const PORT = process.env.REACT_APP_SERVER_PORT || 3001;

app.use(express.json());

// Docs: https://www.npmjs.com/package/node-fetch
app.get("/", (req, res) => {
  fetch("https://api.jikan.moe/v3/anime/21")
    .then((res) => res.json())
    .then((data) => res.send(data));
});

// db.query: the query method we exported earlier from db/index.js
app.get("/test", (req, res) => {
  db.query("SELECT NOW()", (err, res) => {
    console.log(err, res);
  });
  res.send("test");
});

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});

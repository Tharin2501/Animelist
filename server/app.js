require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");

// middleware, allows us to use req.body
const bodyParser = require("body-parser");
// allows cors
const cors = require("cors");
//  everywhere else in my application instead of requiring pg directly, I'll require this file
const db = require("./db");

// Since CRA is using 3000, we’ll just make the server port 3001.
const PORT = process.env.REACT_APP_SERVER_PORT || 3001;

// Middlewares
app.use(cors());
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// For parsing application/json
app.use(express.json());

// Docs: https://www.npmjs.com/package/node-fetch
app.get("/", (req, res) => {
  fetch("https://api.jikan.moe/v3/anime/21")
    .then((res) => res.json())
    .then((data) => res.send(data));
});

// TEST CAN BE DELETED
// db.query: the query method we exported earlier from db/index.js
app.get("/test", (req, res) => {
  const sqlInsertTest = "INSERT INTO favorite (anime) VALUES ('test anime20')";
  db.query(sqlInsertTest, (err, res) => {
    console.log(err, res);
  });
  res.send("data inserted, check pgadmin");
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * from favorite";
  db.query(sqlSelect, (err, result) => {
    console.log(res);
    res.send(result);
  });
});

// TODO: 14:45 pedrotech
// this route should INSERT (the posted data from "add to favorites") to pg.
// need to write a db.query to insert data (just title) into favorites
app.post("/api/insert", (req, res) => {
  // catch the state variable in our frontend
  const animeName = req.body.animeName;

  // MY FIX: https://stackoverflow.com/questions/43755454/bind-message-supplies-1-parameters-but-prepared-statement-requires-2
  // insert into id and anime columns of favorites with values (to be defined as variables)
  const sqlInsert = "INSERT INTO favorite (anime) VALUES ($1)";
  const data = [animeName];
  db.query(sqlInsert, data, (err, result) => {
    console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});

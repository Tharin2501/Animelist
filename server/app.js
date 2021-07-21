require("dotenv").config();
const express = require("express");
const app = express();
//const fetch = require("node-fetch");

// middleware, allows us to use req.body
const bodyParser = require("body-parser");
const cors = require("cors");
// everywhere else in my application instead of requiring pg directly, I'll require this file
const db = require("./db");

// Since CRA is using 3000, we’ll just make the server port 3001.
const PORT = process.env.REACT_APP_SERVER_PORT || 3001;

// Middlewares

// Allows Cors
app.use(cors());
//To handle JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// For parsing application/json
app.use(express.json());

/* Post anime title. see http://localhost:3001/api/get for list of posted anime.
   use case: post handler in Card.tsx
*/
app.post("/api/insert", (req, res) => {
  // catch the state variable(name) in our frontend
  const name = req.body.name;

  //src: https://stackoverflow.com/questions/43755454/bind-message-supplies-1-parameters-but-prepared-statement-requires-2
  // insert into id and anime columns of favorites with values (to be defined as variables)
  db.query(
    {
      text: "INSERT INTO favorite (name) VALUES ($1)",
      values: [name],
    },
    (error) => {
      if (error) {
        throw error;
      }
    }
  ).then(() => {
    res.status(201).json({ status: "success", message: "POST Success." });
  });
});

// might be useful: https://www.taniarascia.com/node-express-postgresql-heroku/

app.get("/", (req, res) => {
  res.send("current routes under construction: /api/insert and /api/get");
});

// Display all anime titles, response from POST are displayed here
app.get("/api/get", (req, res, next) => {
  const sqlSelect = "SELECT * from favorite";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});

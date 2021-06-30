// TODO: add body-parser as dependency (to handle JSON payloads)
const express = require("express");
const app = express();
const fetch = require("node-fetch");
// Since CRA is using 3000, we’ll just make the server port 3001.
const port = 3001;

// Docs: https://www.npmjs.com/package/node-fetch
app.get("/", (req, res) => {
  fetch("https://api.jikan.moe/v3/anime/21")
    .then((res) => res.json())
    .then((json) => console.log(JSON.stringify(json)));
  res.json("dwjdoiwa");
});

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

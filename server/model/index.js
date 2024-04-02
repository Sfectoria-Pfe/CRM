const express = require("express");
const app = express();
require('dotenv').config()
require("./model/index")
const path = require("path");
const port = 3100;
const cors = require("cors");
const clientRoute = require("./router/client.router");
app.use(cors({ origin: process.env.allowedAdress }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "publics")));

app.use("/api/v1/client", clientRoute);

app.listen(port, () => {
  console.log(`listning too`);
});

const express = require("express");
const app = express();
require('dotenv').config()
require('./models/index')
const path = require("path");
const port = 3100;
const cors = require("cors");
const productsRoute = require("./routes/product.router");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "publics")));

app.use("/api/v1/products", productsRoute);
app.use("/api/v1/search", productsRoute);
app.use(cors({ origin:process.env.allowAdress}))


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const productsRoute = require("express").Router();

const {
  selectAll,
  search,
  createProduct,
  findOne,
  deleteProduct
} = require("../controller/products.controller");

productsRoute.get("/", selectAll);
productsRoute.post("/search", search);
productsRoute.post("/", createProduct);
productsRoute.get("/:id", findOne);
productsRoute.delete("/:id", deleteProduct);

module.exports = productsRoute;

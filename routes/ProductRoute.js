const express = require("express");
const routes = express.Router();

const {
  getProducts,
  updateProducts,
  deleteProducts,
  getSingleProducts,
  createProducts,
} = require("../controllers/productsControllers");

// get all products
routes.get("/", getProducts);

// update product
routes.patch("/:id", updateProducts);

// delete product
routes.delete("/:id", deleteProducts);

// get single product
routes.get("/:id", getSingleProducts);

// create product
routes.post("/create", createProducts);

module.exports = routes;

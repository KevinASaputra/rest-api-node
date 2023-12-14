require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModels");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

// get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we can't find any products in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `can't find any product with ID:${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cant find any product with ID:${id}` });
    }
    req.status(200).json(deleteProducts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// get single product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// create product
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

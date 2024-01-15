const Product = require("../models/productModels");

const products = [
  {
    name: "iPhone 6",
    quantity: 10,
    price: 1000,
    category: "Smartphone",
    image: "https://picsum.photos/200",
  },
];

const seedProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log("✅ Products are seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedProducts;

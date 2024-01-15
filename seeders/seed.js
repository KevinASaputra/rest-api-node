const mongoose = require("mongoose");
const env = require("../config/env");
const User = require("../models/userModels");
const Product = require("../models/productModels");
const seedUsers = require("./seedUsers");
const seedProducts = require("./seedProducts");

mongoose
  .connect(env.MONGODB_URL)
  .then(() => {
    console.log("✅ Connected to database");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const seedDB = async () => {
  await User.deleteMany({});
  await Product.deleteMany({});

  await seedUsers();
  await seedProducts();
};

seedDB().then(() => {
  console.log("✅ Database is seeded successfully");
  mongoose.disconnect();
  process.exit(0);
});

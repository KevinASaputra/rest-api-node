const bcrypt = require("bcrypt");
const User = require("../models/userModels");

const salt = await bcrypt.genSalt(10);

const users = [
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: bcrypt.hashSync("123456", salt),
  },
];

const seedUsers = async () => {
  try {
    await User.insertMany(users);
    console.log("✅ Users are seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedUsers;

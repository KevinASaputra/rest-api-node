const express = require("express");
const routes = express.Router();

const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

// create user
routes.post("/create", createUser);

//  read user
routes.get("/", readUser);

//  update user
routes.patch("/:id", updateUser);

// delete user
routes.delete("/:id", deleteUser);

module.exports = routes;

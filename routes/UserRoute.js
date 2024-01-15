const express = require("express");
const routes = express.Router();

const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

// create user
routes.post("/create", createUser);

//  read user
routes.get("/", getAllUsers);

routes.get("/:id", getSingleUser);

//  update user
routes.patch("/:id", updateUser);

// delete user
routes.delete("/:id", deleteUser);

module.exports = routes;

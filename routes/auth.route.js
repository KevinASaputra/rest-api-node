const express = require("express");
const route = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../middleware/authValidation.middleware");
const {
  login,
  register,
  userProfile,
  users,
} = require("../controllers/authController");
const verifyToken = require("../middleware/auth.middleware");

route.post("/register", registerValidation, register);
route.post("/login", loginValidation, login);
route.get("/userProfile", verifyToken, userProfile);
route.get("/users", verifyToken, users);

module.exports = route;

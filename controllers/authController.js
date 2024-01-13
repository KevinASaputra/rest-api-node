const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");

// register
const register = async (res, req) => {
  const { name, email, password } = req.body;

  const verifyEmail = await userModel.findOne({ email: email });
  try {
    if (verifyEmail) {
      return res.status(403).json({
        message: "Email already exists",
      });
    } else {
      bcrypt.hash(req.body.password, 10).than((hash) => {
        const user = new userModel({
          name: name,
          email: email,
          password: hash,
        });

        user.save().then((response) => {
          return res.status(200).json({
            message: "User registered successfully",
            result: response,
            succes: true,
          });
        });
      });
    }
  } catch (err) {
    return res.status(401).send({ message: err, succes: false });
  }
};

// Login
const login = async (res, req) => {
  const { email, passowrd } = req.body;

  let getUser;

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      getUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "auth failed",
        });
      } else {
        const token = jwt.sign(
          {
            email: getUser.email,
            userId: getUser._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          accessToken: jwtToken,
          userId: getUser._id,
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        message: err.message,
        succes: false,
      });
    });
};

// Profile check
const userProfile = async (res, req) => {
  const { userId } = req.params;
  try {
    const verifyUser = await userModel.findOne({ _id: userId });
    if (!verifyUser) {
      return res.status(403).json({
        message: "User not found",
        succes: false,
      });
    } else {
      return res.status(200).json({
        message: `user ${verifyUser.name}`,
        succes: true,
      });
    }
  } catch (error) {
    return res.status(401).json({
      succes: false,
      message: error.message,
    });
  }
};

const users = async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(users);
    return res.status(200).json({
      data: users,
      success: true,
      message: "users list",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  userProfile,
  users,
};

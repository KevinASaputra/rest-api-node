const express = require("express");
const router = express.Router();
const User = require("../models/userModels"); // Adjust the path to your User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { transporter } = require("../config/nodemailer");

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });
    // Generate token
    const token = jwt.sign({ userId: newUser._id }, env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({ message: "User created successfully", token, data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a temporary token
  const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: "15m" });
  // const resetLink = `http://yourdomain.com/reset-password/${token}`;

  // Email config template
  const mailOptions = {
    from: env.MAIL_FROM,
    to: email,
    subject: "Password Reset",
    // text: `Click on this link to reset your password: ${resetLink}`,
    text: `Here is your token to reset your password: ${token}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error sending email" });
    }

    return res.status(200).json({ message: "Password reset email sent" });
  });
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Decode token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Generate new hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

    return res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

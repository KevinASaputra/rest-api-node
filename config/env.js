require("dotenv").config();

// All env variables
const env = {
  // App config
  PORT: process.env.PORT || 3000,
  // Database
  MONGODB_URL: process.env.MONGODB_URL,
  // Authentication
  JWT_SECRET: process.env.JWT_SECRET,
  // Email
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
};

module.exports = env;

require("dotenv").config();

const env = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = env;

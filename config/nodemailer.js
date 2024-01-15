const nodemailer = require("nodemailer");
const env = require("./env");

// Setup nodemailer to send email
const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

module.exports = transporter;

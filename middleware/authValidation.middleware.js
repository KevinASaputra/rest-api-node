const validator = require("validatorjs");

const registerValidation = async (req, res, next) => {
  const validateRule = {
    name: "required|string|min:3",
    email: "required|email",
    password: "required|string|min:6",
  };

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const loginValidation = async (req, res, next) => {
  const validateRule = {
    email: "required|email",
    password: "required|string|min:6",
  };

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  registerValidation,
  loginValidation,
};

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
});

// Remove password from user object
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Check if the password is being modified (or new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Generate hashed password
    this.password = await bcrypt.hash(this.password, salt);
    // Proceed to next middleware
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;

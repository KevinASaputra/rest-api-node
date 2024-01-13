const User = require("../models/userModels");

const readUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.findByIdAndUpdate(id, req.body);
    // we can't find any products in database
    if (!user) {
      return res
        .status(404)
        .json({ message: `can't find any product with ID:${id}` });
    }
    const updateUsers = await User.findById(id);
    res.status(200).json(updateUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cant find any product with ID:${id}` });
    }
    req.status(200).json(deleteUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
};

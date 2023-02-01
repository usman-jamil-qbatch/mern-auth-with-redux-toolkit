const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const { fName, lName, designation, email, password } = req.body;
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      res.status(400);
      throw new Error("User with this email already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      fName,
      lName,
      designation,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    await user.save();
    return res.send(token);
  } catch (error) {
    return res.send(error.message);
  }
};

const getUsers = async (req, res) => {
  const result = await User.find();
  res.send(result);
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401);
      throw new Error("User Not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(401);
      throw new Error("Wrong password");
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.send(token);
  } catch (error) {
    res.send(error.message);
  }
};

// const updateUser = async (req, res) => {
//   const user = await User.updateUserById(req.params.userId, req.body);
//   res.send(user);
// };

// const deleteUser = async (req, res) => {
//   await User.deleteUserById(req.params.userId);
//   res.send(true);
// };

module.exports = {
  createUser,
  getUsers,
  signIn,
  // updateUser,
  // deleteUser,
};

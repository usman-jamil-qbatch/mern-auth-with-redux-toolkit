const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createIntreest = async (req, res) => {
  try {
    const { intrests } = req.body;
    const status = await User.updateOne(
      { _id: req.user.id },
      { $push: { intrests } }
    );
    if (status.modifiedCount == 1) {
      const data = await User.findOne({ _id: req.user.id });
      return res.send(data.intrests);
    } else {
      res.status(500);
      throw new Error("server error");
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const getIntrest = async (req, res) => {
  const result = await User.findOne({ _id: req.user.id });
  res.send(result.intrests);
};

const deleteIntrest = async (req, res) => {
  try {
    const status = await User.updateOne(
      { _id: req.user.id },
      { $pull: { intrests: req.body.intrest } }
    );
    if (status.modifiedCount == 1) {
      const data = await User.findOne({ _id: req.user.id });
      return res.send(data.intrests);
    } else {
      res.status(500);
      throw new Error("server error");
    }
    res.send(status);
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
  createIntreest,
  getIntrest,
  deleteIntrest,
  // updateUser,
  // deleteUser,
};

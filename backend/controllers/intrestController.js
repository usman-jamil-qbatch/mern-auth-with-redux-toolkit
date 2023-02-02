const User = require("../models/userModel");
require("dotenv").config();

const createIntreest = async (req, res) => {
  try {
    const { intrest } = req.body;
    const status = await User.updateOne(
      { _id: req.user.id },
      { $push: { intrests: { intrest } } }
    );
    if (status.modifiedCount == 1) {
      const data = await User.find(
        { _id: req.user.id },
        { intrests: { $elemMatch: { intrest: req.body.intrest } } }
      );
      return res.send(data[0].intrests[0]);
    } else {
      res.status(500);
      throw new Error("server error");
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const getIntrest = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.user.id });
    res.send(result.intrests);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteIntrest = async (req, res) => {
  try {
    const status = await User.updateOne(
      { _id: req.user.id },
      { $pull: { intrests: { intrest: req.body.intrest } } }
    );

    if (status.modifiedCount == 1 && status.acknowledged) {
      return res.send(status.acknowledged);
    } else {
      res.status(500);
      throw new Error("server error");
    }
    res.send(status);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  createIntreest,
  getIntrest,
  deleteIntrest,
};

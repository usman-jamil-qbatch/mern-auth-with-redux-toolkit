const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    intrests: [{}],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

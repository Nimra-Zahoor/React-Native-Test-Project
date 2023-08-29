const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {USER_ROLES} = require('../constants/userTypes');
const { INTERNAL_SERVER_ERROR } = require("../constants/serverMessages");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  userType: {
    type: String,
    enum: USER_ROLES,
    required: true,
    default: "Voter",
  },
  constituency: {
    type: String,
  },
  cnic: { type: String, required: true, unique: true },
  picture: { type: String },
  isCandidate: { type: Boolean, default: false },
  isVoted: { type: Boolean, default: false },
  isInvited: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, "SECRET_KEY");
    return token;

  } catch (err) {
    console.error(INTERNAL_SERVER_ERROR, err);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;

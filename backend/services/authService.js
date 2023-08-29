const User = require("../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { INTERNAL_SERVER_ERROR } = require("../constants/serverMessages");

const createUser = async (userData) => {
  try {
    userData.password = await bcrypt.hash(userData.password, 12);
    const user = new User(userData);
    await user.save();

    return user;
  } catch (error) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const findUserByCNIC = async (cnic) => {
  return await User.findOne({ cnic: cnic });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username: username });
};

const findUserByEmailAndUserType = async (email, userType) => {
  return await User.findOne({ email: email, userType: userType });
};

const generateAuthToken = async (user) => {
  try {
    const payload = {
      _id: user._id,
      userType: user.userType,
    };
    const token = jwt.sign(payload, "SECRET_KEY");
    return token;
  } catch (err) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByCNIC,
  findUserByUsername,
  findUserByEmailAndUserType,
  generateAuthToken,
};

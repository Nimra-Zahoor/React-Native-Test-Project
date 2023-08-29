const { USER_TYPES } = require("../constants/userTypes");
const User = require("../modals/user");

const getAllUsersOtherThenAdmin = async () => {
  return await User.find({ $or: [{ userType: USER_TYPES.VOTER }, { userType: USER_TYPES.CANDIDATE }] });
};

const findUserById = async (userId) => {
  return await User.findById(userId);
};

const findInvitedUserById = async (userId) => {
    return await User.findOne({ _id: userId, isInvited: true, userType: { $ne: USER_TYPES.ADMIN } });
};

module.exports = {
  getAllUsersOtherThenAdmin,
  findUserById,
  findInvitedUserById,
};

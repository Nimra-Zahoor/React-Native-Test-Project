const userService = require("../services/userService");
const { USER_TYPES } = require("../constants/userTypes");
const {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  USER_NOT_FOUND,
  INVITATION_SENT,
  ADMIN_CONFIRMATION,
} = require("../constants/serverMessages");

const getAllUsersOtherThenAdmin = async (req, res) => {
  try {
    if (req.userType !== USER_TYPES.ADMIN) {
      return res.status(404).json({ message: UNAUTHORIZED });
    }
    const users = await userService.getAllUsersOtherThenAdmin();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

const inviteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const loggedInUser = await userService.findUserById(userId);

    if (loggedInUser.userType !== USER_TYPES.ADMIN) {
      return res.status(401).json({ message: UNAUTHORIZED });
    }

    const { userId: invitedUserId } = req.body;

    const invitedUser = await userService.findUserById(invitedUserId);
    if (!invitedUser) {
      return res.status(404).json({ message: USER_NOT_FOUND });
    }

    invitedUser.isInvited = true;
    await invitedUser.save();

    return res.status(200).json({ message: INVITATION_SENT });
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

const getInvitedUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.findInvitedUserById(userId);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

const confirmAdmin = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.findUserById(userId);

    user.userType = USER_TYPES.ADMIN;
    await user.save();

    return res.status(200).json({ message: ADMIN_CONFIRMATION });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getAllUsersOtherThenAdmin,
  inviteUser,
  getInvitedUser,
  confirmAdmin,
};

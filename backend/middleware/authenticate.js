const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const { INTERNAL_SERVER_ERROR, USER_NOT_FOUND, UNAUTHORIZED } = require("../constants/serverMessages");

const authenticateUserByToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: UNAUTHORIZED });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "SECRET_KEY");

    const user = await User.findOne({ _id: decodedToken._id });
    if (!user) {
      return res.status(401).json({ error: USER_NOT_FOUND });
    }

    req.userId = user._id;
    req.userType = decodedToken.userType;

    next();
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

module.exports = authenticateUserByToken;

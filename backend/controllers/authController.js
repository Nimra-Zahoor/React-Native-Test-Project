const bcrypt = require("bcryptjs");
const authService = require("../services/authService");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Messages = require("../constants/serverMessages");

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage: cloudinaryStorage });
const signup = async (req, res) => {
  try {
    const picture = req.file.filename;

    const { username, email, password, cnic, constituency } = req.body;
    if (!username || !email || !password || !cnic || !constituency) {
      return res.status(422).json({ error: Messages.MISSING_FIELDS });
    }

    const emailExists = await authService.findUserByEmail(email);
    const cnicExists = await authService.findUserByCNIC(cnic);
    const usernameExists = await authService.findUserByUsername(username);

    if (emailExists) {
      return res
        .status(422)
        .json({ message: Messages.EMAIL_ALREADY_REGISTERED });
    }
    if (cnicExists) {
      return res
        .status(422)
        .json({ message: Messages.CNIC_ALREADY_REGISTERED });
    }
    if (usernameExists) {
      return res
        .status(422)
        .json({ message: Messages.USERNAME_ALREADY_REGISTERED });
    }

    const user = await authService.createUser({
      username: username,
      email: email,
      password: password,
      constituency: constituency,
      picture: picture,
      cnic: cnic,
    });

    return res.status(201).json({ message: Messages.SUCCESS_MESSAGE });
  } catch (error) {
    return res.status(500).json({ error: Messages.INTERNAL_SERVER_ERROR });
  }
};
const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ message: Messages.MISSING_FIELDS });
    }

    const userLogin = await authService.findUserByEmailAndUserType(
      email,
      userType
    );
    if (!userLogin) {
      return res
        .status(400)
        .json({ message: Messages.INVALID_EMAIL_OR_PASSWORD });
    }
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: Messages.INVALID_EMAIL_OR_PASSWORD });
    }
    const token = await authService.generateAuthToken(userLogin);
    req.session.token = token;

    return res.status(201).json({
      message: Messages.LOGIN_SUCCESS,
      token: token,
      userType: userType,
    });
  } catch (err) {
    return res.status(500).json({ error: Messages.INTERNAL_SERVER_ERROR });
  }
};
module.exports = { login, signup };

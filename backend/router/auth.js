const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage: cloudinaryStorage });
const {
  signup,
  login,
} = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send(`Hello from server`);
});

router.post("/signup", upload.single("picture"), signup);
router.post("/login", login);

module.exports = router;

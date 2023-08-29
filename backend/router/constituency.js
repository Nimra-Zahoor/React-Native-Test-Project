const express = require("express");
const router = express.Router();
const {
  createConstituency,
  getConstituencies,
} = require("../controllers/constituenyController");
const authenticateUserByToken = require("../middleware/authenticate");

router.post(
  "/create-constituency",
  authenticateUserByToken,
  createConstituency
);

router.get("", getConstituencies);
module.exports = router;

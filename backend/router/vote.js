const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const authenticateUserByToken = require("../middleware/authenticate");

router.post("", authenticateUserByToken, voteController.addVote);

module.exports = router;

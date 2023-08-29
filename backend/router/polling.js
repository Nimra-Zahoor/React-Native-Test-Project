const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");
const authenticateUserByToken = require("../middleware/authenticate");

router.post("/start", authenticateUserByToken, pollController.startPolling);
router.post("/end", authenticateUserByToken, pollController.endPolling);

module.exports = router;

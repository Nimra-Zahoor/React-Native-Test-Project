const express = require("express");
const router = express.Router();
const electionController = require("../controllers/electionController");
const authenticateUserByToken = require("../middleware/authenticate");

router.post("/schedule", authenticateUserByToken, electionController.scheduleElection);
router.get("",electionController.getScheduledElections);

module.exports = router;

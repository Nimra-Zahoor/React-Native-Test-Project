const express = require("express");
const inviteRouter = require("./invite");
const candidateRouter = require("./candidate");
const pollingRouter = require("./polling");
const constituencyRouter = require("./constituency");
const electionRouter = require("./election");
const voteRouter = require("./vote");
const resultRouter = require("./result");
const authenticationRouter = require("./auth");

const router = express.Router();

router.use("/users", inviteRouter);
router.use("/candidates", candidateRouter);
router.use("/poll", pollingRouter);
router.use("/elections", electionRouter);
router.use("/vote", voteRouter);
router.use("/results",resultRouter);
router.use("/constituencies",constituencyRouter);
router.use("/auth",authenticationRouter);

module.exports = router;

const cron = require("node-cron");
const mongoose = require("mongoose");
const pollServices = require("../services/pollServices");
const Election = require("../modals/election");
const Candidate = require("../modals/candidate");
const User = require("../modals/user");
const Poll = require("../modals/poll");
const { USER_TYPES } = require("../constants/userTypes");
const {
  UNAUTHORIZED,
  ELECTION_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  POLL_ENDED,
} = require("../constants/serverMessages");

const deleteExpiredPolls = async (req, res) => {
  try {
    const currentTime = Date.now();
    const expiredPolls = await Poll.find({ end_time: { $lt: currentTime } });
    const expiredElections = await Election.find({
      end_date: { $lt: currentTime },
    });

    await Poll.deleteMany({
      _id: { $in: expiredPolls.map((poll) => poll._id) },
    });
    await Election.deleteMany({
      _id: { $in: expiredElections.map((election) => election._id) },
    });
  } catch (error) {
    console.error("Error deleting expired polls:", error);
  }
};

const startPolling = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (req.userType !== USER_TYPES.ADMIN) {
      return res.status(401).json({
        message: UNAUTHORIZED,
      });
    }
    deleteExpiredPolls();
    const start_time = Date.now();
    const electionId = req.body.electionId;
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(400).json({
        message: ELECTION_NOT_FOUND,
      });
    }

    const durationInMinutes = Number(req.body.duration);
    const durationInMilliseconds = durationInMinutes * 60 * 1000;

    const endTime = start_time + durationInMilliseconds;
    const poll = await pollServices.createPoll({
      election: electionId,
      start_time: Date.now(),
      end_time: endTime,
      polling_duration: durationInMilliseconds,
    });

    await Candidate.updateMany({}, { $set: { voters: [] } }, { session });
    await User.updateMany({}, { $set: { isVoted: false } }, { session });
    await pollServices.deleteVotes(session);
    await deleteExpiredPolls();
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json(poll);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};
const endPolling = async (req, res) => {
  try {
    if (req.userType !== USER_TYPES.ADMIN) {
      return res.status(401).json({
        message: UNAUTHORIZED,
      });
    }

    const electionId = req.body.electionId;
    const expiredPolls = await pollServices.getExpiredPolls(electionId);

    await pollServices.deletePolls(expiredPolls);
    expiredPolls.duration = 0;

    res.status(200).json({ message: POLL_ENDED });
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  startPolling,
  endPolling,
  deleteExpiredPolls,
};

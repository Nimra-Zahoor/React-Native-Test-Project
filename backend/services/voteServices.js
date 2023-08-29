const mongoose = require("mongoose");
const Candidate = require("../modals/candidate");
const Poll = require("../modals/poll");
const Vote = require("../modals/vote");
const User = require("../modals/user");
const { CANDIDATE_NOT_FOUND, ALREADY_EXISTS, POLL_NOT_FOUND, VOTE_CASTED, INTERNAL_SERVER_ERROR, INVALID_INPUT } = require("../constants/serverMessages");

const castVote = async (userId, candidateId) => {
  try {
    const user = await User.findById(userId);
    if (user.isVoted) {
      return {
        status: 400,
        message: ALREADY_EXISTS,
      };
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(INVALID_INPUT);
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return { status: 404, message: CANDIDATE_NOT_FOUND };
    }

    if (user.isVoted === true) {
      return {
        status: 400,
        message: ALREADY_EXISTS,
      };
    }

    const currentTime = Date.now();
    const poll = await Poll.findOne();
    if (!poll) {
      return { status: 404, message: POLL_NOT_FOUND };
    }

    if (currentTime < poll.start_time || currentTime > poll.end_time) {
      return {
        status: 400,
        message:
          POLL_NOT_FOUND,
      };
    }

    const newVote = new Vote({
      voter: userId,
      candidate: candidateId,
      constituency: user.constituency,
    });

    candidate.voters.push(userId);
    user.isVoted = true;
    await candidate.save();
    await user.save();
    await newVote.save();

    return { status: 200, message: VOTE_CASTED };
  } catch (error) {
    console.error(error)
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  castVote,
};

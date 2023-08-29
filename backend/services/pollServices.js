const Poll = require("../modals/poll");
const Vote = require("../modals/vote");

const createPoll = async (pollData) => {
  const poll = new Poll(pollData);
  await poll.save();
  return poll;
};

const deletePolls = async (polls) => {
  await Poll.deleteMany({ _id: { $in: polls.map((poll) => poll._id) } });
};

const getExpiredPolls = async (electionId) => {
  return await Poll.find({ election: electionId });
};

const deleteVotes = async () => {
  await Vote.deleteMany({});
};

module.exports = {
  createPoll,
  deletePolls,
  getExpiredPolls,
  deleteVotes,
};

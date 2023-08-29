const Election = require("../modals/election");

const createElection = async (electionData) => {
  const newElection = new Election(electionData);
  await newElection.save();
  return newElection;
};

const findElectionByName = async (electionName) => {
  return await Election.findOne({ name: electionName });
};

const getAllElections = async () => {
  return await Election.find();
};

module.exports = {
  createElection,
  findElectionByName,
  getAllElections,
};

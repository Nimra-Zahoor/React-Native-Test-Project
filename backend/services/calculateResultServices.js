const Candidate = require("../modals/candidate");
const Vote = require("../modals/vote");
const User = require("../modals/user");
const Result = require("../modals/result");
const Constituency = require("../modals/constituency");
const { CONSTITUENCY_NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../constants/serverMessages");

const calculateResult = async (constituencyName) => {
  try {
    const constituency = await Constituency.findOne({ name: constituencyName });

    if (!constituency) {
      throw new Error(CONSTITUENCY_NOT_FOUND);
    }
    const all_candidates = await User.find({
      constituency: constituency.name,
      isCandidate: true,
    });

    const candidateUserIds = all_candidates.map((candidate) => candidate._id);
    const candidates = await Candidate.find({
      user: { $in: candidateUserIds },
      approved: true,
    });

    let winnerCandidate = null;
    let maxVotes = 0;
    let numVotes = 0;
    if (candidates.length > 0) {
      for (const candidate of candidates) {
        const votes = await Vote.find({
          candidate: candidate._id,
          constituency: constituency.name,
        });
        numVotes = votes.length;
        
        if (numVotes > maxVotes) {
          maxVotes = numVotes;
          winnerCandidate = candidate;
        }
      }
    }
    const winnerUserId = winnerCandidate.user;
    const winnerPartyName = winnerCandidate.partyName;
    const winnerUser = await User.findOne({ _id: winnerUserId });

    const winner = {
      constituency: constituency._id,
      name: winnerUser.username,
      partyName: winnerPartyName,
      total_votes: maxVotes,
      votes_to_candidate: winnerCandidate.voters.length,
    };
    const existingResult = await Result.findOne({
      constituency: constituency._id,
    });
    if (existingResult) {
      existingResult.name = winner.name;
      existingResult.partyName = winner.partyName;
      existingResult.total_votes = winner.total_votes;
      existingResult.votes_to_candidate = winner.votes_to_candidate;
      await existingResult.save();
    } else {
      const result = new Result(winner);
      await result.save();
    }
    return winner;
  } catch (error) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};
const getAllConstituencyResults = async (constituencyName) => {
  try {
    const constituency = await Constituency.findOne({ name: constituencyName });
    if (!constituency) {
      throw new Error(CONSTITUENCY_NOT_FOUND);
    }

    const all_results = await Result.find({ constituency: constituency._id });

    return all_results;
  } catch (error) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  calculateResult,
  getAllConstituencyResults,
};

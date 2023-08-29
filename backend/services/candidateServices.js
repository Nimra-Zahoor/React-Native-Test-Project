const { CANDIDATE_NOT_FOUND, INTERNAL_SERVER_ERROR, USER_NOT_FOUND } = require("../constants/serverMessages");
const { USER_TYPES } = require("../constants/userTypes");
const Candidate = require("../modals/candidate");
const User = require("../modals/user");

const approveCandidateService = async (candidateId) => {
  try {
    const candidate = await Candidate.findById(candidateId).populate("user");

    if (!candidate) {
      throw new Error(CANDIDATE_NOT_FOUND);
    }

    if (candidate.user) {
      await User.findByIdAndUpdate(candidate.user._id, {
        isCandidate: true,
        userType: USER_TYPES.CANDIDATE,
      });
    }

    await Candidate.findByIdAndUpdate(candidateId, { approved: true });

    return candidate;
  } catch (error) {
    throw new Error("Internal server error");
  }
};
const getAppliedCandidates = async () => {
  try {
    const candidates = await Candidate.find({ approved: false })
      .populate("user", "username")
      .select("partyName partySymbol");
    return candidates;
  } catch (error) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

const getVotesCastedToCandidate = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    const candidate = await Candidate.findOne({ user: userId, approved: true });
    if (!candidate) {
      throw new Error(CANDIDATE_NOT_FOUND);
    }

    const votersCount = candidate.voters?.length || 0;

    return votersCount;
  } catch (error) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

const getCandidatesByConstituency = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    const candidates = await User.find({
      isCandidate: true,
      constituency: user.constituency,
    });

    const candidateUserIds = candidates.map((candidate) => candidate._id);
    const CandidateUserName = candidates.map((candidate) => candidate.username);

    const approvedCandidates = await Candidate.find({
      approved: true,
      user: { $in: candidateUserIds },
    });

    const mergedArray = approvedCandidates.map((candidate, index) => ({
      _id: candidate._id,
      username: CandidateUserName[index],
      partyName: candidate.partyName,
      partySymbol: candidate.partySymbol,
    }));

    return mergedArray;
  } catch (error) {
    throw new Error(INTERNAL_SERVER_ERROR);
  }
};

const getCandidatesByUser = async (userId) => {
  return await Candidate.find({ user: userId });
};

const getCandidateByPartyName = async (partyName) => {
  return await Candidate.findOne({ partyName: partyName });
};

const createCandidate = async (candidateData) => {
  const candidate = new Candidate(candidateData);
  await candidate.save();
  return candidate;
};

const getUserByUserId = async (userId) => {
  return await User.findOne({ _id: userId });
};

const findVotersByConstituency = async (constituencyName) => {
  return await User.find({ constituency: constituencyName, userType: USER_TYPES.VOTER });
};

module.exports = {
  getAppliedCandidates,
  getVotesCastedToCandidate,
  getCandidatesByConstituency,
  approveCandidateService,
  getCandidatesByUser,
  getCandidateByPartyName,
  getUserByUserId,
  createCandidate,
  findVotersByConstituency,
};

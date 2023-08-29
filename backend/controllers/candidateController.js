const {
  getAppliedCandidates,
  getVotesCastedToCandidate,
  getCandidatesByConstituency,
  getCandidatesByUser,
  getCandidateByPartyName,
  createCandidate,
  approveCandidateService,
  getUserByUserId,
  findVotersByConstituency,
} = require("../services/candidateServices");
const { USER_TYPES } = require("../constants/userTypes");
const {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  SUCCESS_MESSAGE,
  ALREADY_EXISTS,
  INVALID_INPUT,
  CANDIDATE_NOT_FOUND,
} = require("../constants/serverMessages");

const approveCandidateController = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;

    if (req.userType !== USER_TYPES.ADMIN) {
      return res.status(401).json({ message: UNAUTHORIZED });
    }
    const candidate = await approveCandidateService(candidateId);
    res
      .status(200)
      .json({ message: SUCCESS_MESSAGE, candidate });
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

const getAppliedCandidatesController = async (req, res) => {
  try {
    const candidates = await getAppliedCandidates();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVotesCastedToCandidateController = async (req, res) => {
  try {
    const userId = req.userId;
    const votersCount = await getVotesCastedToCandidate(userId);
    res.status(200).json(votersCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCandidatesByConstituencyController = async (req, res) => {
  try {
    const userId = req.userId;
    const candidates = await getCandidatesByConstituency(userId);
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const applyCandidate = async (req, res) => {
  try {
    const user = req.userId;
    const candidates = await getCandidatesByUser(user);

    if (candidates.length != 0) {
      return res
        .status(404)
        .json({ message: UNAUTHORIZED });
    }

    const partyName = req.body.partyName;
    const alreadyExists = await getCandidateByPartyName(partyName);

    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: ALREADY_EXISTS });
    }

    const pictureURL = req.file.secure_url;
    const partySymbol = req.file.filename;
    if (!partyName || !partySymbol) {
      return res
        .status(401)
        .json({ error: INVALID_INPUT });
    }

    const userId = req.userId;
    const candidate = await createCandidate({
      user: userId,
      partyName: partyName,
      approved: false,
      partySymbol: partySymbol,
    });

    res.status(201).json({
      message: SUCCESS_MESSAGE,
      pictureURL: pictureURL,
    });
  } catch (err) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const getVotersByCandidate = async (req, res) => {
  try {
    const candidateUserId = req.userId;
    const candidate = await getCandidatesByUser(candidateUserId);
    if (!candidate) {
      return res.status(400).json({ error: CANDIDATE_NOT_FOUND });
    }
    const user = await getUserByUserId(candidateUserId);
    const voters = await findVotersByConstituency(user.constituency);
    res.status(200).json(voters);
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getAppliedCandidatesController,
  getVotesCastedToCandidateController,
  getCandidatesByConstituencyController,
  getVotersByCandidate,
  approveCandidateController,
  applyCandidate,
};

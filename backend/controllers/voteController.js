const { INTERNAL_SERVER_ERROR } = require("../constants/serverMessages");
const voteServices = require("../services/voteServices");

const addVote = async (req, res) => {
  const userId = req.userId;
  const candidateId = req.body.candidateId;

  try {
    const result = await voteServices.castVote(userId, candidateId);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  addVote,
};

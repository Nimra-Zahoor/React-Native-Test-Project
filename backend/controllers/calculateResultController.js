const User = require("../modals/user");
const {
  calculateResult,
  getAllConstituencyResults,
} = require("../services/calculateResultServices");
const Messages = require("../constants/serverMessages");

const calculateResults = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    const constituencyName = user.constituency;
    const winner = await calculateResult(constituencyName);
    return res.status(200).json(winner);
  } catch (error) {
    return res.status(500).json({ error: Messages.INTERNAL_SERVER_ERROR });
  }
};

const getAllResults = async (req, res) => {
  try {
    const constituencyName = req.query.name;
    const all_results = await getAllConstituencyResults(constituencyName);

    res.status(200).json(all_results);
  } catch (error) {
    return res.status(500).json({ error: Messages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  calculateResults,
  getAllResults,
};

const electionServices = require("../services/electionServices");
const { USER_TYPES } = require("../constants/userTypes");
const {
  UNAUTHORIZED,
  INVALID_INPUT,
  ALREADY_EXISTS,
  SUCCESS_MESSAGE,
  INTERNAL_SERVER_ERROR,
} = require("../constants/serverMessages");

const scheduleElection = async (req, res) => {
  try {
    if (req.userType !== USER_TYPES.ADMIN) {
      return res.status(401).json({
        message: UNAUTHORIZED,
      });
    }
    const { electionName, startDate, endDate } = req.body;
    if (Date.now() > startDate || endDate < startDate) {
      return res.status(400).json({ message: INVALID_INPUT });
    }

    const alreadyExists = await electionServices.findElectionByName(
      electionName
    );
    if (alreadyExists) {
      res.status(400).json({ message: ALREADY_EXISTS });
    }

    const newElection = await electionServices.createElection({
      name: electionName,
      start_date: startDate,
      end_date: endDate,
    });
    res.status(201).json({
      message: SUCCESS_MESSAGE,
      election: newElection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const getScheduledElections = async (req, res) => {
  try {
    const elections = await electionServices.getAllElections();
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  scheduleElection,
  getScheduledElections,
};

const {
  UNAUTHORIZED,
  ALREADY_EXISTS,
  SUCCESS_MESSAGE,
  INTERNAL_SERVER_ERROR,
} = require("../constants/serverMessages");
const { USER_TYPES } = require("../constants/userTypes");
const Candidate = require("../modals/candidate");
const constituencyServices = require("../services/constituencyService");

const createConstituency = async (req, res) => {
  try {
    if (req.userType !== USER_TYPES.ADMIN) {
      return res.status(401).json({
        message: UNAUTHORIZED,
      });
    }
    const { name, location } = req.body;
    const candidates = await Candidate.find({ constituency: name });
    const existingConstituency =
      await constituencyServices.getConstituencyByName(name);

    if (existingConstituency) {
      return res.status(400).json({ error: ALREADY_EXISTS });
    }

    const newConstituency = await constituencyServices.createConstituency({
      name,
      location,
    });

    res.status(201).json({
      message: SUCCESS_MESSAGE,
      constituency: newConstituency,
    });
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

const getConstituencies = async (req, res) => {
  try {
    const constituencies = await constituencyServices.getAllConstituencies();
    res.status(200).json(constituencies);
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createConstituency,
  getConstituencies,
};

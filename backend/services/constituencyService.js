const Constituency = require("../modals/constituency");

const createConstituency = async (constituencyData) => {
  const constituency = new Constituency(constituencyData);
  await constituency.save();
  return constituency;
};

const getConstituencyByName = async (name) => {
  return await Constituency.findOne({ name });
};

const getAllConstituencies = async () => {
  return await Constituency.find();
};

module.exports = {
  createConstituency,
  getConstituencyByName,
  getAllConstituencies,
};

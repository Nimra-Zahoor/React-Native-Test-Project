const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true },
  location: { type: String },
  electionSchema: [{ type: mongoose.Schema.Types.ObjectId, ref: "Election" }],
});

const Constituency = mongoose.model("Constituency", constituencySchema);

module.exports = Constituency;

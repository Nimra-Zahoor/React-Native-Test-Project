
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    voter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    constituency: { type: String },
  });

  const Vote = mongoose.model("Vote", voteSchema);
  module.exports = Vote;
  
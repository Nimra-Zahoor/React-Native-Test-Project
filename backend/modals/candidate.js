
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    partyName: { type: String, required: true },
    partySymbol: { type: String },
    approved: { type: Boolean, default: false },
    voters: [
      {
        type: mongoose.Schema.Types.String,
        ref: "User",
      },
    ],
  });

  const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema  ({
    election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
    start_time: { type: Date },
    end_time: { type: Date },
    polling_duration: { type: Number },

  });

const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;
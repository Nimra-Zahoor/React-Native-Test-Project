const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  });


const Election = mongoose.model("Election", electionSchema);
module.exports = Election;
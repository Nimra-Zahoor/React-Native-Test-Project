const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    constituency:{type:mongoose.Schema.Types.ObjectId,ref:"Constituency",required:true,unique:true},
    name:{type:String},
    partyName:{type:String},
    total_votes:{type:Number},
    votes_to_candidate:{type:Number},
  });

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
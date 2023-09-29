const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    score: Number
})

module.exports = mongoose.model("Score", ScoreSchema);

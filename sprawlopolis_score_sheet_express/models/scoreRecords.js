const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreCardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

// const CombinationRecordsSchema = new Schema({
//     combo: [ScoreCardSchema],
//     score: Number,
//     wins: Number,
//     losses: Number,
//     highScore: Number
// })

module.exports = mongoose.model("ScoreCard", ScoreCardSchema);

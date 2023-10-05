const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreCardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    colOneMulti: {
        type: Number,
        requied: true
    },
    colOneName: {
        type: String,
        required: true
    },
    colTwoMulti: {
        type: Number,
    },
    colTwoName: {
        type: String,
    },
    cardTargetScore: {
        type: Number,
        required: true
    },
    minScore: {
        type: Number,
        required: true
    },
    maxScore: {
        type: Number,
        required: true
    },
    startingTotal: {
        type: Number,
        required: true
    },
    mostPoints: {
        type: Number
    },
    fewestPoints: {
        type: Number
    },
    gamesPlayed: {
        type: Number
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    },
});

module.exports = mongoose.model("ScoreCard", ScoreCardSchema);

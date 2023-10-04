const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ScoreCard = require("./scoringCards");

const CardComboSchema = new Schema({
    cardOne: { type: Schema.Types.ObjectId, ref: "ScoreCard" },
    cardTwo: { type: Schema.Types.ObjectId, ref: "ScoreCard" },
    cardThree: { type: Schema.Types.ObjectId, ref:  "ScoreCard" },
    wins: {
        type: Number,
        required: true,
        min: 0,
    },
    losses: {
        type: Number,
        required: true,
        min: 0,
    },
    targetScore: {
        type: Number,
        required: true,
        min: 6
    },
    avgScore: {
        type: Number,
        required: true,
        min: 0
    },
    highScore: {
        type: Number,
        required: true,
        min: 0
    },
    lowScore: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model("CardCombo", CardComboSchema);
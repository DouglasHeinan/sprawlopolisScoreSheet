const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CardCombo = require("./cardCombos")

const GameResultSchema = new Schema ({
    cardCombo: { type: Schema.Types.ObjectId, CardCombo },
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

module.exports = ("GameResults", GameResultSchema)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const CardCombo = require("./cardCombos")
// const User = require("./user")

const GameResultSchema = new Schema({
    cardCombo: { type: Schema.Types.ObjectId, ref: "CardCombo" },
    win: {
        type: Boolean,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0
    },
    target: {
        type: Number,
        required: true,
        min: 6
    },
    date: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("GameResult", GameResultSchema)

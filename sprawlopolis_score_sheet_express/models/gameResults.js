const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameResultSchema = new Schema({
    cardCombo: {
        type: Schema.Types.ObjectId,
        ref: "CardCombo"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
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
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("GameResult", GameResultSchema)

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
    },
    timesPlayed: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model("ScoreCard", ScoreCardSchema);

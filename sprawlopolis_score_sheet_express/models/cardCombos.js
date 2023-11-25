const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardComboSchema = new Schema({
    cards: [
        { 
            type: Schema.Types.ObjectId,  
            ref: "ScoreCard"
        }
    ],
    targetScore: {
        type: Number,
        required: true,
        min: 6
    }
});

module.exports = mongoose.model("CardCombo", CardComboSchema);
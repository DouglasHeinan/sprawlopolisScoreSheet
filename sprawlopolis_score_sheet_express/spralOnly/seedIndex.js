const mongoose = require("mongoose");
const ScoreCard = require("../models/scoreRecords");
const cards = require("./seedSprawl")

mongoose.connect("mongodb://127.0.0.1:27017/comboRecords", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("db connected");
})

const updateDB = async () => {
    await ScoreCard.deleteMany({});
    for (let i = 0; i < 18; i++) {
        const newCard = new ScoreCard({
            name: cards["scoringCards"][i]["name"],
            number: cards["scoringCards"][i]["target"]
        });
        await newCard.save();
    };
};

updateDB().then(() => {
    mongoose.connection.close();
});

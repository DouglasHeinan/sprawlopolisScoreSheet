const mongoose = require("mongoose");
const ScoreCard = require("../models/scoringCards");
// const Score = require("../models/tempModels/tempScores");
const CardCombo = require("../models/cardCombos")
// const GameResult = require("../models/gameResults")
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

// const updateTempDB = async () => {
//     await Score.deleteMany({});
//     for (let i = 0; i < 15; i++) {
//         let winGame = "false";
//         if (i % 2 === 0) {
//             winGame = "true";
//         }
//         const newScore = new Score({
//             score: Math.floor((Math.random() * 30) + 1),
//             win: winGame
//         });
//         await newScore.save();
//     };
// }

const updateCardDb = async () => {
    await ScoreCard.deleteMany({});
    length = cards["scoringCards"].length
    allCards =[];
    for (let i = 0; i < length; i++) {
        card = cards["scoringCards"][i];
        const newCard = new ScoreCard({
            name: card["name"],
            description: card["description"],
            colOneMulti: card["colOneMulti"],
            colOneName: card["colOneName"],
            colTwoMulti: card["colTwoMulti"],
            colTwoName: card["colTwoName"],
            cardTargetScore: card["target"],
            minScore: card["min-score"],
            maxScore: card["max-score"],
            startingTotal: card["startingTotal"]
        });
        allCards.push(newCard);
        await newCard.save();
    };
    return allCards;
};


const createCombos = async () => {
    const allCards = await updateCardDb();
    let allCombos = [];
    const length = allCards.length
    for (let i = 0; i < length - 2; i++) {
        for (let j = i + 1; j < length - 1; j++) {
            for (let k = j + 1; k < length; k++) {
                cardOne = allCards[i];
                cardTwo = allCards[j];
                cardThree = allCards[k];
                allCombos.push([cardOne, cardTwo, cardThree])
            };
        };
    };
    return allCombos;
};

const saveCombos = async () => {
    await CardCombo.deleteMany({});
    allCombos = await createCombos();
    for (let combo of allCombos) {
        seeds = createResults();
        const newCombo = new CardCombo({
            cardOne: combo[0].id,
            cardTwo: combo[1].id,
            cardThree: combo[2].id,
            wins: seeds["wins"],
            losses: seeds["losses"],
            avgScore: seeds["avgScore"],
            highScore: seeds["highScore"],
            lowScore: seeds["lowScore"]
        });
        await newCombo.save()
    };
};


const createResults = () => {
    const seeds = {};
    seeds["wins"] = Math.floor((Math.random() * 10) + 1);
    seeds["losses"] = Math.floor((Math.random() * 10) + 1);
    seeds["highScore"] = Math.floor(Math.random() * (35 - 25) + 25);
    seeds["lowScore"] = Math.floor(Math.random() * (15 - 10) + 10);
    seeds["avgScore"] = Math.random() * (seeds["highScore"] - seeds["lowScore"]) + seeds["lowScore"];
    return seeds;
};




// updateCardDb()
// .then(
//     updateTempDB())
// .then(
    saveCombos()
// );
.then(() => {
    mongoose.connection.close();
});

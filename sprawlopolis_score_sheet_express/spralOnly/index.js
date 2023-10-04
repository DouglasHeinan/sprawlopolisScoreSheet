const mongoose = require("mongoose");
const ScoreCard = require("../models/scoringCards");
const CardCombo = require("../models/cardCombos")
const GameResult = require("../models/gameResults")
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

const updateCardDb = async () => {
    await ScoreCard.deleteMany({});
    length = cards["scoringCards"].length
    allCards =[];
    for (let i = 0; i < length; i++) {
        const card = cards["scoringCards"][i];
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
    const allCombos = await createCombos();
    for (let combo of allCombos) {
        seeds = createStats();
        const comboTargetScore = combo[0].cardTargetScore + combo[1].cardTargetScore + combo[2].cardTargetScore
        const newCombo = new CardCombo({
            cardOne: combo[0].id,
            cardTwo: combo[1].id,
            cardThree: combo[2].id,
            wins: seeds["wins"],
            losses: seeds["losses"],
            targetScore: comboTargetScore,
            avgScore: seeds["avgScore"],
            highScore: seeds["highScore"],
            lowScore: seeds["lowScore"]
        });
        await newCombo.save();
    };
};


const createStats = () => {
    const seeds = {};
    seeds["wins"] = Math.floor((Math.random() * 10) + 1);
    seeds["losses"] = Math.floor((Math.random() * 10) + 1);
    seeds["highScore"] = Math.floor(Math.random() * (35 - 25) + 25);
    seeds["lowScore"] = Math.floor(Math.random() * (15 - 10) + 10);
    seeds["avgScore"] = Math.random() * (seeds["highScore"] - seeds["lowScore"]) + seeds["lowScore"];
    return seeds;
};

const createResults = async () => {
    await GameResult.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const record = await createRecord();
        const newResult = new GameResult({
            cardCombo: record["combo"],
            win: record["win"],
            score: record["score"],
            target: record["target"]
        });
        await newResult.save();
    };
};

const createRecord = async () => {
    const allCombos = await CardCombo.find({});
    const record = {};
    let win = false;
    const comboIndex = Math.floor(Math.random() * 816 );
    combo = allCombos[comboIndex]
    let score;
    if (comboIndex % 2 === 0) {
        win = true;
    };
    if (win) {
        score = Math.floor(Math.random() * (35 - 25) + 25);
    } else {
        score = Math.floor(Math.random() * (23 - 10) + 10);
    }
    record["combo"] = combo;
    record["win"] = win;
    record["target"] = 25;
    record["score"] = score;
    return record;
};





makeThings = async () => {
    await saveCombos()
    .then(
        await createResults()
    )
    .then(() => {
        mongoose.connection.close();
    })
};

makeThings();

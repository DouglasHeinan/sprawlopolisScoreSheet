const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn} = require("../middleware");

const CardCombo = require("../models/cardCombos");
const GameResult = require("../models/gameResults");
const UserRecord = require("../models/userComboRecords")

router.get("/", catchAsync(async(req, res) => {
    const allCombos = await CardCombo.find({}).populate("cards");
    const someCombos = allCombos.slice(200);
    res.render("tempViews/tempViewCombos", {someCombos});
}));

router.get("/:id/games/new", isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params;
    const combo = await CardCombo.findById(id).populate("cards");
    if (!combo) {
        req.flash("error", "Combination does not exist.")
    }
    const comboRecord = await UserRecord.findOne({ user: req.user._id, cardCombo: combo.id }).populate("gamesPlayed");
    
    if (comboRecord && comboRecord.gamesPlayed.length > 0) {
        numGames = comboRecord.gamesPlayed.length;
        let totalScore = 0;
        for (let i = 0; i < numGames; i++) {
            const thisGame = await GameResult.findById(comboRecord.gamesPlayed[i])
            totalScore += thisGame.score
        }

        comboRecord.avgScore = totalScore / numGames;
        comboRecord.save()
    }

    res.render("tempViews/tempAddNewGame", {combo, comboRecord});
}));

router.post("/:id/games", isLoggedIn, catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const combo = await CardCombo.findById(id);
    const gameScore = req.body.result.score;
    let gameWin = false;
    if (gameScore >= combo.targetScore) {
        gameWin = true;
    }; 
    const newResult = new GameResult({
        cardCombo: combo.id,
        user: req.user._id,
        win : gameWin,
        score: gameScore,
        target: combo.targetScore
    });
    await newResult.save();
    let currentRecord;
    currentRecord = await UserRecord.findOne({ user: req.user._id, cardCombo: combo.id })
    if (!currentRecord) {
        currentRecord = new UserRecord({
            user: req.user._id,
            cardCombo: combo.id,
            wins: 0,
            losses: 0,
            avgScore: 0,
            highScore: 0
        })
    }
    currentRecord.gamesPlayed.push(newResult);
    if (gameWin) {
        currentRecord.wins += 1;
    } else {
        currentRecord.losses += 1
    };
    numGames = currentRecord.gamesPlayed.length;
    let totalScore = 0;
    for (let i = 0; i < numGames; i++) {
        const thisGame = await GameResult.findById(currentRecord.gamesPlayed[i])
        totalScore += thisGame.score
    }
    currentRecord.avgScore = totalScore / numGames;
    if (numGames > 1) {
        const firstGame = await GameResult.findById(currentRecord.gamesPlayed[0])
        let lowScore = firstGame.score;
        for (let i = 1; i < numGames; i++) {
            const compGame = await GameResult.findById(currentRecord.gamesPlayed[i])
            if (compGame.score < lowScore) {
                lowScore = compGame.score;
            };
        };
        currentRecord.lowScore = lowScore;
    }
    if (gameScore > currentRecord.highScore) {
        currentRecord.highScore = gameScore;
    } else if (gameScore < currentRecord.lowScore) {
        currentRecord.lowScore = gameScore;
    };
    await currentRecord.save();
    req.flash("success", "Successfully added new game.")
    res.redirect(`/combos/${id}/games/new`)
}));

// Belong in games file?
router.delete("/:recordId/games/:gameId", catchAsync(async (req, res) => {
    const { recordId, gameId } = req.params;
    const comboRecord = await UserRecord.findByIdAndUpdate(recordId, { $pull: { gamesPlayed: gameId } })
    const result = await GameResult.findByIdAndDelete(gameId)
    if (result.win) {
        comboRecord.wins -= 1;
    } else {
        comboRecord.losses -= 1;
    };
    console.log(comboRecord.wins)
    console.log(comboRecord.losses)
    comboRecord.save()
    console.log("result", result)
    //Run high/low score calc***************
    req.flash("success", "Successfully deleted game.")
    res.redirect(`/combos/${comboRecord.cardCombo}/games/new`)
}));

module.exports = router;

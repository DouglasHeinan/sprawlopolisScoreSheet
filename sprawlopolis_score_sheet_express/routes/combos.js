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
    // console.log(combo)
    console.log(comboRecord)
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
    if (gameScore > currentRecord.highScore) {
        currentRecord.highScore = gameScore;
    } else if (gameScore < currentRecord.lowScore) {
        currentRecord.lowScore = gameScore;
    };
    await currentRecord.save();
    console.log(currentRecord)
    req.flash("success", "Successfully added new game.")
    res.redirect(`/combos/${id}/games/new`)
}));

router.delete("/:id/games/:gameId", catchAsync(async (req, res) => {
    const { id, gameId } = req.params;
    console.log(id, gameId)
    const combo = await CardCombo.findByIdAndUpdate(id, { $pull: { gamesPlayed: gameId } })
    console.log("one", combo.gamesPlayed)
    const result = await GameResult.findByIdAndDelete(gameId)
    console.log("two", result)
    req.flash("success", "Successfully deleted game.")
    res.redirect(`/combos/${id}/games/new`)
}));

module.exports = router;

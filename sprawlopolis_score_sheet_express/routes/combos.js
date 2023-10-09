const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const CardCombo = require("../models/cardCombos");
const GameResult = require("../models/gameResults");


router.get("/", catchAsync(async(req, res) => {
    const allCombos = await CardCombo.find({}).populate("cards");
    const someCombos = allCombos.slice(700);
    res.render("tempViews/tempViewCombos", {someCombos});
}));

router.get("/:id/games/new", catchAsync(async (req, res) => {
    const {id} = req.params;
    const combo = await CardCombo.findById(id).populate("cards").populate("gamesPlayed");
    // const cards = await CardCombo.findById(id).populate("cards");
    res.render("tempViews/tempAddNewGame", {combo});
}));

router.post("/:id/games", catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const combo = await CardCombo.findById(id);
    const gameScore = req.body.result.score;
    let gameWin = false;
    if (gameScore >= combo.targetScore) {
        gameWin = true;
    }; 
    const newResult = new GameResult({
        cardCombo: combo.id,
        win : gameWin,
        score: gameScore,
        target: combo.targetScore
    });
    await newResult.save();
    if (gameWin) {
        combo.wins += 1;
    } else {
        combo.losses += 1;
    };
    if (gameScore > combo.highScore) {
        combo.highScore = gameScore;
    } else if (gameScore < combo.lowScore) {
        combo.lowScore = gameScore;
    }
    combo.gamesPlayed.push(newResult);
    await combo.save();
    res.redirect(`/combos/${id}/games/new`)
}));

router.delete("/:id/games/:gameId", catchAsync(async (req, res) => {
    const { id, gameId } = req.params;
    console.log(id, gameId)
    const combo = await CardCombo.findByIdAndUpdate(id, { $pull: { gamesPlayed: gameId } })
    console.log("one", combo.gamesPlayed)
    const result = await GameResult.findByIdAndDelete(gameId)
    console.log("two", result)
    res.redirect(`/combos/${id}/games/new`)
}));

module.exports = router;

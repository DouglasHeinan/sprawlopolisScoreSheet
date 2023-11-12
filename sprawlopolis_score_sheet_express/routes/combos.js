const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const CardCombo = require("../models/cardCombos");
const GameResult = require("../models/gameResults");

router.get("/", catchAsync(async(req, res) => {
    console.log("here")
    const allCombos = await CardCombo.find({}).populate("cards");
    const someCombos = allCombos.slice(700);
    res.render("tempViews/tempViewCombos", {someCombos});
}));

router.get("/:id/games/new", catchAsync(async (req, res) => {
    if (!req.isAuthenticated) {
        req.flash("error", "you must be signed in");
        res.redirect("/login")
    }
    const {id} = req.params;
    const combo = await CardCombo.findById(id).populate("cards").populate("gamesPlayed");
    if (!combo) {
        req.flash("error", "Combination does not exist.")
    }
    res.render("tempViews/tempAddNewGame", {combo});
}));

router.post("/:id/games", catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const combo = await CardCombo.findById(id);
    const gameScore = req.body.result.score;
    let gameWin = false;
    // First block
    if (gameScore >= combo.targetScore) {
        gameWin = true;
    }; 
    const newResult = new GameResult({
        cardCombo: combo.id,
        win : gameWin,
        score: gameScore,
        target: combo.targetScore
    });
    //EndFirst
    await newResult.save();
    //SecondBlock
    if (gameWin) {
        combo.wins += 1;
    } else {
        combo.losses += 1;
    };
    if (gameScore > combo.highScore) {
        combo.highScore = gameScore;
    } else if (gameScore < combo.lowScore) {
        combo.lowScore = gameScore;
    };
    //EndSecond
    combo.gamesPlayed.push(newResult);
    await combo.save();
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

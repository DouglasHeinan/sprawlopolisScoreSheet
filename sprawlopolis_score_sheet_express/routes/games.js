const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const CardCombo = require("../models/cardCombos");
const GameResult = require("../models/gameResults");



router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const game = await GameResult.findById(id);
    res.render("tempViews/tempEditGame", {game});
}));

router.put("/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    const newScore = req.body.game.score;
    const game = await GameResult.findByIdAndUpdate(id, {score: req.body.game.score}, {runValidators: true});
    const combo = await CardCombo.findById(game.cardCombo)
    if (game.win) {
        if (combo.highScore < newScore) {
            combo.highScore = newScore;
        };
        if (newScore < game.target) {
            game.win = false;
            combo.wins -= 1;
            combo.losses += 1;
            if (combo.lowScore > newScore) {
                combo.lowScore = newScore;
            };
        };
    } else if (!game.win) {
        if (combo.lowScore > newScore) {
            combo.lowScore = newScore;
        };
        if (newScore >= game.target) {
            game.win = true;
            combo.wins += 1;
            combo.losses -= 1;
            if (combo.highScore < newScore) {
                combo.highScore = newScore;
            };
        };
    };
    await game.save();
    await combo.save();
    res.redirect(`/combos/${combo.id}/games/new`);
}));

module.exports = router;

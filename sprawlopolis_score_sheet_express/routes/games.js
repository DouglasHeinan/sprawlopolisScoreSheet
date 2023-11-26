const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const CardCombo = require("../models/cardCombos");
const GameResult = require("../models/gameResults");
const UserRecord = require("../models/userComboRecords")

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const game = await GameResult.findById(id);
    if (!game) {
        req.flash("error", "This game no longer exists.")
        return res.redirect("/combos")
    }
    res.render("tempViews/tempEditGame", {game});
}));

router.put("/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    const newScore = req.body.game.score;
    const game = await GameResult.findByIdAndUpdate(id, {score: req.body.game.score}, {runValidators: true});
    const combo = await CardCombo.findById(game.cardCombo);
    const comboRecord = await UserRecord.findOne({user: req.user._id, cardCombo: combo});
    if (game.win) {
        if (comboRecord.highScore < newScore) {
            comboRecord.highScore = newScore;
        };
        if (newScore < game.target) {
            game.win = false;
            comboRecord.wins -= 1;
            comboRecord.losses += 1;
            if (comboRecord.lowScore > newScore) {
                comboRecord.lowScore = newScore;
            };
        };
    } else if (!game.win) {
        if (comboRecord.lowScore > newScore) {
            comboRecord.lowScore = newScore;
        };
        if (newScore >= game.target) {
            game.win = true;
            comboRecord.wins += 1;
            comboRecord.losses -= 1;
            if (comboRecord.highScore < newScore) {
                comboRecord.highScore = newScore;
            };
        };
    };
    console.log(comboRecord)
    await game.save();
    await comboRecord.save();
    req.flash("success", "You've updated this game.")
    res.redirect(`/combos/${combo.id}/games/new`);
}));

module.exports = router;

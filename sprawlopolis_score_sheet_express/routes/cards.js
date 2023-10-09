const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const ScoreCard = require("../models/scoringCards");


router.get("/", catchAsync(async (req, res) => {
    const cards = await ScoreCard.find({});
    res.render("tempviews/tempAllCards", {cards});
}));

router.get("/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    const card = await ScoreCard.findById(id);
    res.render("tempViews/tempSingleCard", {card})
}));

module.exports = router;

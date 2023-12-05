const express = require("express");
const router = express.Router();
const games = require("../controllers/games")

const catchAsync = require("../utils/catchAsync");
const {isGameUser} = require("../middleware");
// const CardCombo = require("../models/cardCombos");
// const GameResult = require("../models/gameResults");
// const UserRecord = require("../models/userComboRecords");

router.get("/:id/edit", isGameUser, catchAsync(games.editGamePage));

router.put("/:id", isGameUser, catchAsync(games.editGame));

module.exports = router;

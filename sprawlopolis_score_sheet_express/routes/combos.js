const express = require("express");
const router = express.Router();
const combos = require("../controllers/combos")
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn} = require("../middleware");

// const CardCombo = require("../models/cardCombos");
// const GameResult = require("../models/gameResults");
// const UserRecord = require("../models/userComboRecords")

router.get("/", catchAsync(combos.index));

router.get("/:id/games/new", isLoggedIn, catchAsync(combos.viewGames));

router.post("/:id/games", isLoggedIn, catchAsync(combos.addGame));

// Belong in games file?
router.delete("/:recordId/games/:gameId", catchAsync(combos.deleteGame));

module.exports = router;

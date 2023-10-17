const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");


// router.get("/:id/edit", catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const game = await GameResult.findById(id);
//     if (!game) {
//         req.flash("error", "This game no longer exists.")
//         return res.redirect("/combos")
//     }
//     res.render("tempViews/tempEditGame", {game});
// }));

router.get("/register", catchAsync(async (req, res) => {
    
}))


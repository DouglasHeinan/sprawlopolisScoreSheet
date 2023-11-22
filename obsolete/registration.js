const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const aWeekAway = require("../utils/constants")

router.get("/", (req, res) => {
    res.render("register")
});

router.post("/", catchAsync(async (req, res) => {
    try {
        const {password, username, email} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password)
        req.flash("success", "Welcome to Sprawlopolis Scoresheet.")
        res.redirect(`/${user.id}`)
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("register")
    }
}));

module.exports = router;

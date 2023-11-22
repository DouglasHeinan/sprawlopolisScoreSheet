const express = require("express");
const router = express.Router();
const aWeekAway = require("../utils/constants");
const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

router.get("/", (req, res) => {
    res.render("login")
});

router.post("/", passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), catchAsync(async (req, res) => {
    req.flash("success", "welcome back!")
    res.redirect(`/${req.user._id}`)
}));

router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
})

module.exports = router;

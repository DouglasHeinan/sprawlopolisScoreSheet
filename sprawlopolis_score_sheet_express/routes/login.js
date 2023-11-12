const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
// const session = require("express-session");
const aWeekAway = require("../utils/constants");
const passport = require("passport");

// const sessionConfig = {
//     secret: "changeToBeBetterSoon",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + aWeekAway,
//         maxAge: aWeekAway
//     }
// };

// router.use(session(sessionConfig));

const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");

router.get("/", (req, res) => {
    res.render("login")
});

router.post("/", passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), catchAsync(async (req, res) => {
    req.flash("success", "welcome back!")
    res.redirect(`/${HERE}`)
}));

router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
})

module.exports = router;

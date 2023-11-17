const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");


router.get("/register", (req, res) => {
    res.render("register")
});

router.post("/register", catchAsync(async (req, res) => {
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

    // await user.save();

    // req.session.user_id = user._id;
}));


router.get("/login", (req, res) => {
    res.render("login")
});

router.post("/login", passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), catchAsync(async (req, res) => {
    req.flash("success", "welcome back!")
    res.redirect(`/${req.user._id}`)
}));

router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
})

router.get("/:id", async (req, res) => {
    console.log("userID")
    console.log("")
    const {id} = req.params;
    const user = await User.findById(id);
    res.render("userLanding", {user});
});

module.exports = router;

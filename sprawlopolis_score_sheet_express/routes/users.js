const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require('../middleware');
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("register")
});

router.post("/register", catchAsync(async (req, res) => {
    try {
        const {password, username, email} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash("success", "Welcome to Sprawlopolis Scoresheet.")
            res.redirect(`/${user.id}`)
        })
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("register")
    }
}));

router.get("/login", (req, res) => {
    res.render("login")
});

router.post("/login", storeReturnTo, passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), (req, res) => {
    req.flash("success", "welcome back!")
    const redirectUrl = res.locals.returnTo || `/${req.user._id}`
    res.redirect(redirectUrl)
});

router.post("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}); 

module.exports = router;

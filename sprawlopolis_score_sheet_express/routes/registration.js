const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");
// const session = require("express-session");
const aWeekAway = require("../utils/constants")

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

    // await user.save();

    // req.session.user_id = user._id;
}));

module.exports = router;

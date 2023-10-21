const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");
const session = require("express-session");
const aWeekAway = require("../utils/constants")

const sessionConfig = {
    secret: "changeToBeBetterSoon",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + aWeekAway,
        maxAge: aWeekAway
    }
};

router.use(session(sessionConfig));

router.get("/", (req, res) => {
    res.render("register")
})

router.post("/", catchAsync(async (req, res) => {
    const {password, username} = req.body;
    const user = new User({username, password})
    // const hash = await bcrypt.hash(password, 12);
    // const user = new User({
    //     username,
    //     password: hash
    // });
    await user.save();
    req.session.user_id = user._id;
    res.redirect(`/${user.id}`)
}));

module.exports = router;

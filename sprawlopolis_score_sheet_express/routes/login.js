const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
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

const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");

router.get("/", (req, res) => {
    res.render("login")
});

router.post("/", catchAsync(async (req, res) => {
    const {username, password} = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        // req.session.user_id = foundUser._id;
        res.redirect(`/${foundUser.id}`)
    } else {
        res.redirect(`/login`)
    }
    // const user = await User.findOne({username});
    // const validPW = await bcrypt.compare(password, user.password)
    // if (validPW) {
    //     req.session.user_id = user._id;
    //     res.redirect(`/${user.id}`)
    // } else {
    //     res.redirect(`/login`)
    // }
}));

router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
})

module.exports = router;

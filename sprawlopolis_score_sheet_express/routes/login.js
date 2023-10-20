const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");

router.get("/", (req, res) => {
    res.render("login")
});

router.post("/", catchAsync(async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const validPW = await bcrypt.compare(password, user.password)
    if (validPW) {
        res.send("Good stuff!")
    } else {
        res.send("NOPE!");
    }
    // res.send(`${username}, ${password}`)
}));

module.exports = router;

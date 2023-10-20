const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/users");


router.get("/", (req, res) => {
    res.render("register")
})

router.post("/", catchAsync(async (req, res) => {
    const {password, username} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    });
    await user.save();
    res.redirect(`/${user.id}`)
}));

module.exports = router;

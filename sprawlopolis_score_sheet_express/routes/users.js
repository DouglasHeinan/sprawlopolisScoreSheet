const express = require("express");
const router = express.Router();
const users = require("../controllers/users")
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require('../middleware');
// const User = require("../models/user");

router.route("/register")
    .get(users.registerPage)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.loginPage)
    .post(
        storeReturnTo, 
        passport.authenticate(
            "local", 
            {
                failureFlash: true, 
                failureRedirect: "/login"
            }
        ), 
        users.login
    );

router.post("/logout", users.logout); 

module.exports = router;

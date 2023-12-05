const User = require("../models/user");

module.exports.registerPage = (req, res) => {
    res.render("register")
};

module.exports.register = async (req, res) => {
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
};

module.exports.loginPage = (req, res) => {
    res.render("login")
};

module.exports.login = (req, res) => {
    req.flash("success", "welcome back!")
    const redirectUrl = res.locals.returnTo || `/${req.user._id}`
    res.redirect(redirectUrl)
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
};

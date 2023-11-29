const GameResult = require("./models/gameResults");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "you must be signed in");
        return res.redirect("/login");
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isGameUser = async (req, res, next) => {
    const {id} = req.params;
    const game = await GameResult.findById(id);
    if (!game.user.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/`)
    }
    next();
}

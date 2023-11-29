const CardCombo = require("../models/cardCombos");

module.exports.index = async(req, res) => {
    const allCombos = await CardCombo.find({}).populate("cards");
    const someCombos = allCombos.slice(200);
    res.render("tempViews/tempViewCombos", {someCombos});
}
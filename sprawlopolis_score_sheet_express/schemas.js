const Joi = require("joi");

module.exports.cardSchema = Joi.object({
    card: Joi.object({
        name: Joi.string().required(),
        number: Joi.number().min(1).max(18).required(),
        timesPlayed: Joi.number().min(0).required()
    }).required()
});

module.exports.resultsSchema = Joi.object({
    result: Joi.object({
        score: Joi.number().min(0).required(),
        win: Joi.string().required()
    }).required()
});
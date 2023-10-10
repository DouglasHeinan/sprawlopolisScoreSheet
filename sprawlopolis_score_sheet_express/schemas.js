const Joi = require("joi");


module.exports.resultsSchema = Joi.object({
    result: Joi.object({
        score: Joi.number().min(0).required(),
        win: Joi.string().required()
    }).required()
});

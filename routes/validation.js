const Joi = require('joi');

const validationSchema = Joi.object().keys({
    voterId : Joi.string().trim().min(7).max(7).required(),
    votes : Joi.array().items({
        awardName : Joi.string().required(),
        nominiName : Joi.string().required()
    }).required()
});
  
module.exports = validationSchema;
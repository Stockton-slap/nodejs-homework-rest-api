const Joi = require("joi");
const { regexp } = require("../helpers/vars");

const emailSchema = Joi.object({
  email: Joi.string().pattern(regexp).required(),
});

module.exports = { emailSchema };

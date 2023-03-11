const Joi = require("joi");
const { regexp } = require("../helpers/vars");

const regSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email(regexp).required(),
});

module.exports = {
  regSchema,
};

const Joi = require("joi");

const register = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
});

const login = Joi.object().keys({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  register,
  login,
};

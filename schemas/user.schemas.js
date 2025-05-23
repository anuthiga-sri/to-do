const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'A valid email is required',
    'string.empty': 'Email is required',
  }),
});

module.exports = {
  registerSchema,
};

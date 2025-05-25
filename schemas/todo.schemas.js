const Joi = require('joi');

const addTodoSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  dueDate: Joi.date().greater('now').required(),
  userId: Joi.number().required()
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().greater('now').optional(),
  status: Joi.string().optional(),
  userId: Joi.number().required()
});

module.exports = {
    addTodoSchema,
    updateTodoSchema
};

const express = require('express');
const validate = require('../middlewares/validate.middlewares');
const { addTodoSchema, updateTodoSchema } = require('../schemas/todo.schemas');
const { getTodoListOfAUser, addTodo, updateTodo } = require('../controllers/todo.controllers');

const router = express.Router();

router.get('/', getTodoListOfAUser);
router.post('/', validate(addTodoSchema), addTodo);
router.put('/:todoId', validate(updateTodoSchema), updateTodo);

module.exports = router;

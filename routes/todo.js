const express = require('express');
const validate  = require('../middlewares/validate.middlewares');
const { addTodoSchema } = require('../schemas/todo.schemas');

const router = express.Router();

const {getTodoListOfAUser, addTodo} = require('../controllers/todo.controllers')

router.get('/', getTodoListOfAUser);
router.post('/', validate(addTodoSchema), addTodo);

module.exports = router;

const express = require('express');
const router = express.Router();

const {getTodoListOfAUser} = require('../controllers/todo.controllers')

router.get('/', getTodoListOfAUser);

module.exports = router;

const express = require('express');
const { register } = require('../controllers/user.controllers');
const validate  = require('../middlewares/validate.middlewares');
const { registerSchema } = require('../schemas/user.schemas');
const router = express.Router();

router.post('/register', validate(registerSchema), register);

module.exports = router;

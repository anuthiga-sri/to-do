const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const todoRoutes = require('./todo');
const adminRoutes = require('./admin');

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
router.use('/admin', adminRoutes);

module.exports = router;

const express = require('express');
const { getStatistic, getOverdue } = require('../controllers/admin.controllers');

const router = express.Router();

router.get('/statistic', getStatistic);
router.get('/overdue', getOverdue);

module.exports = router;

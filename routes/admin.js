const express = require('express');
const { getStatistic, getOverdue, getLateCompletion } = require('../controllers/admin.controllers');

const router = express.Router();

router.get('/statistic', getStatistic);
router.get('/overdue', getOverdue);
router.get('/late-completion', getLateCompletion);

module.exports = router;

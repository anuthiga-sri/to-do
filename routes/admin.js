const express = require('express');
const { getStatistic } = require('../controllers/admin.controllers');

const router = express.Router();

router.get('/statistic', getStatistic);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getDashboardStats, getRecentActivities } = require('../controllers/dashboardController');

router.get('/stats', getDashboardStats);
router.get('/activities', getRecentActivities);

module.exports = router;
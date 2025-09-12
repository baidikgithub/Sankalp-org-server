const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminAuthController');

// @desc Admin login
// @route POST /api/admin/login
// @access Public
router.post('/login', adminLogin);

module.exports = router;
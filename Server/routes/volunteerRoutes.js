const express = require('express');
const router = express.Router();
const { registerVolunteer, getVolunteers } = require('../controllers/volunteerController');

// @desc Register new volunteer
// @route POST /api/volunteers
// @access Public
router.post('/', registerVolunteer);

// @desc Get all volunteers
// @route GET /api/volunteers
// @access Public
router.get('/', getVolunteers);

module.exports = router;

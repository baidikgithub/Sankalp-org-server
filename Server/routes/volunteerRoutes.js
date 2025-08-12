// routes/volunteerRoutes.js
const express = require('express');
const router = express.Router();

const { registerVolunteer } = require('../controllers/volunteerController');

// POST /api/volunteers → Register new volunteer
router.post('/', registerVolunteer);

module.exports = router;

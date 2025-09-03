// routes/volunteerRoutes.js
const express = require('express');
const router = express.Router();

const { registerVolunteer, getVolunteers } = require('../controllers/volunteerController');

// POST /api/volunteers → Register new volunteer
router.post('/', registerVolunteer);

// GET /api/volunteers → Get all volunteers (optional, can be added later)
router.get('/', getVolunteers); // Uncomment if you implement this function

module.exports = router;

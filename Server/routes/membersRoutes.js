const express = require('express');
const router = express.Router();
const { addMember, getMembers } = require('../controllers/membersController');

// @desc Add a new member
// @route POST /api/members
// @access Public
router.post('/', addMember);

// @desc Get all members
// @route GET /api/members
// @access Public
router.get('/', getMembers);

module.exports = router;
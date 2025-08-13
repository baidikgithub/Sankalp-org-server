const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

// @desc Add a new member
// @route POST /api/members
// @access Public
router.post('/', membersController.addMember);

// @desc Get all members
// @route GET /api/members
// @access Public
router.get('/', membersController.getMembers);


module.exports = router;
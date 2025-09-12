const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/usersController');

// Route to get all users
router.get('/', getUsers);

module.exports = router;
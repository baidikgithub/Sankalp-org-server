const express = require('express');
const router = express.Router();
const User = require('../controllers/usersController');

// Route to get all users
router.get('/', User.getUsers);


module.exports = router;
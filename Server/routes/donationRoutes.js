const express = require('express');
const router = express.Router();
const { getDonations } = require('../controllers/donationController');
const { addDonation } = require('../controllers/donationController');
// @desc Get all donations
// @route GET /api/donations
// @access Public
router.get('/', getDonations);  
// @desc Add a new donation
// @route POST /api/donations
// @access Public   
router.post('/', addDonation);



module.exports = router;
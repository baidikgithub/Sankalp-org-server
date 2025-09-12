const express = require("express");
const router = express.Router();
const { submitContactForm, getContacts } = require("../controllers/contactController");

// @desc Handle contact form submission
// @route POST /api/contact/submit
// @access Public
router.post("/submit", submitContactForm);

// @desc Get all contact submissions
// @route GET /api/contact
// @access Public
router.get("/", getContacts);

module.exports = router;
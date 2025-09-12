const express = require("express");
const router = express.Router();
const { forgotPassword, verifyOtp, signup, signin, resetPassword } = require("../controllers/authController");
const { forgotPasswordLimiter, otpVerificationLimiter } = require("../middleware/rateLimiter");

// @desc Request password reset
// @route POST /api/auth/forgot-password
// @access Public
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

// @desc Verify OTP for password reset
// @route POST /api/auth/verify-otp
// @access Public
router.post("/verify-otp", otpVerificationLimiter, verifyOtp);

// @desc Register new user
// @route POST /api/auth/signup
// @access Public
router.post("/signup", signup);

// @desc Login user
// @route POST /api/auth/signin
// @access Public
router.post("/signin", signin);

// @desc Reset password with token
// @route POST /api/auth/reset-password
// @access Public
router.post("/reset-password", resetPassword);

module.exports = router;

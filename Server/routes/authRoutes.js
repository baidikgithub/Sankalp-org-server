const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { forgotPasswordLimiter, otpVerificationLimiter } = require("../middleware/rateLimiter");

// Apply rate limiters to relevant routes
router.post("/forgot-password", forgotPasswordLimiter, authController.forgotPassword);
router.post("/verify-otp", otpVerificationLimiter, authController.verifyOtp);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/reset-password", authController.resetPassword);

module.exports = router;

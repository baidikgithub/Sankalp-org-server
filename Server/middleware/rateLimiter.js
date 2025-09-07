const rateLimit = require('express-rate-limit');

// Limit attempts for password reset requests
exports.forgotPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        message: 'Too many password reset attempts. Please try again after an hour.'
    }
});

// Limit attempts for OTP verification
exports.otpVerificationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 5, // limit each IP to 5 attempts per windowMs
    message: {
        message: 'Too many OTP verification attempts. Please try again after 15 minutes.'
    }
});

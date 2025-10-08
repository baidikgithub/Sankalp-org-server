# Forgot Password Setup Guide

## Overview
The forgot password functionality has been implemented with a secure OTP-based system. Users can request a password reset, receive an OTP via email, verify the OTP, and then set a new password.

## Features
- ✅ Secure OTP generation (6-digit random number)
- ✅ Email delivery with HTML formatting
- ✅ OTP expiration (10 minutes)
- ✅ Rate limiting for security
- ✅ Failed attempt tracking
- ✅ Responsive UI with proper error handling
- ✅ Centralized API configuration

## Setup Instructions

### 1. Environment Variables
Make sure your `.env` file in the Server directory contains:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-connection-string
```

### 2. Email Configuration
For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password as `EMAIL_PASS` in your `.env` file

### 3. Database Schema
The User model includes these fields for password reset:
```javascript
{
  resetPasswordOtp: String,
  resetPasswordExpiry: Date,
  otpAttempts: { type: Number, default: 0 }
}
```

## API Endpoints

### 1. Request Password Reset
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "If email exists, OTP sent"
}
```

### 2. Verify OTP
```
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "OTP verified successfully"
}
```

### 3. Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

## Client-Side Usage

### 1. Forgot Password Page
- Route: `/forgot-password`
- Form: Email input
- Action: Sends OTP to email and navigates to reset password page

### 2. Reset Password Page
- Route: `/reset-password`
- Two-step process:
  1. OTP verification
  2. New password entry
- Pre-fills email if coming from forgot password page

## Security Features

1. **Rate Limiting**: Prevents spam requests
2. **OTP Expiration**: 10-minute validity
3. **Failed Attempt Tracking**: Max 5 attempts before OTP invalidation
4. **Secure OTP Generation**: 6-digit random number
5. **Email Validation**: Proper email format validation
6. **Password Requirements**: Minimum 6 characters

## Testing

### Manual Testing
1. Start the server: `cd Server && npm start`
2. Start the client: `cd Client && npm start`
3. Navigate to `/forgot-password`
4. Enter a valid email address
5. Check email for OTP
6. Complete the reset process

### Automated Testing
Run the test script:
```bash
node test-forgot-password.js
```

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check EMAIL_USER and EMAIL_PASS in .env
   - Verify Gmail App Password is correct
   - Check server logs for email errors

2. **OTP verification failing**
   - Ensure OTP is entered within 10 minutes
   - Check for typos in OTP
   - Verify email address matches

3. **API connection issues**
   - Ensure server is running on port 5001
   - Check CORS configuration
   - Verify API base URL in client

### Error Messages

- `"Email is required"` - Email field is empty
- `"An OTP has already been sent"` - Wait before requesting new OTP
- `"OTP has expired"` - Request a new OTP
- `"Too many failed attempts"` - OTP invalidated, request new one
- `"Failed to send OTP"` - Email service issue

## File Structure

```
Server/
├── controllers/authController.js    # Password reset logic
├── routes/authRoutes.js            # API routes
├── models/user.model.js            # User schema
├── utils/sendEmail.js              # Email utility
└── middleware/rateLimiter.js       # Rate limiting

Client/
├── pages/ForgotPassword.js         # Forgot password page
├── pages/ResetPassword.js          # Reset password page
├── components/ForgotPasswordForm.js # Form component
└── utils/api.js                    # API configuration
```

## Future Enhancements

- [ ] SMS OTP option
- [ ] Password strength indicator
- [ ] Remember device option
- [ ] Audit logging for security events
- [ ] Multi-language support


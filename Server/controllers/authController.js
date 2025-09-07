const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// SIGNIN
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// FORGOT PASSWORD - send OTP
// controllers/authController.js

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email was provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // For security, always send a success response even if user doesn't exist
    if (!user) {
      return res.status(200).json({ 
        success: true,
        message: "If the email exists in our system, you will receive an OTP shortly" 
      });
    }

    // Clear any existing OTP
    if (user.resetPasswordOtp && user.resetPasswordExpiry > Date.now()) {
      return res.status(400).json({ 
        message: "An OTP has already been sent. Please wait before requesting a new one." 
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save OTP and expiry to user
    user.resetPasswordOtp = otp;
    user.resetPasswordExpiry = otpExpiry;
    await user.save();

    // Send OTP via email with HTML formatting
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request - Sankalp Youth Organisation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3949ab;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password for your Sankalp Youth Organisation account.</p>
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; text-align: center; font-size: 24px; letter-spacing: 5px;">
            <strong>${otp}</strong>
          </div>
          <p>This OTP is valid for 10 minutes. If you did not request this password reset, please ignore this email.</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            For security reasons, please do not share this OTP with anyone.
          </p>
        </div>
      `,
      text: `Your OTP for resetting password is: ${otp}. It is valid for 10 minutes.`, // Fallback plain text
    });

    return res.status(200).json({
      message: "If email exists, OTP sent",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid email or OTP" });
    }

    if (!user.resetPasswordOtp || !user.resetPasswordExpiry) {
      return res.status(400).json({ message: "No OTP request found" });
    }

    if (user.resetPasswordExpiry < Date.now()) {
      // Clear expired OTP
      user.resetPasswordOtp = null;
      user.resetPasswordExpiry = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Track failed attempts
    if (user.resetPasswordOtp !== otp) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      
      // If too many failed attempts, invalidate the OTP
      if (user.otpAttempts >= 5) {
        user.resetPasswordOtp = null;
        user.resetPasswordExpiry = null;
        user.otpAttempts = 0;
        await user.save();
        return res.status(400).json({ message: "Too many failed attempts. Please request a new OTP." });
      }
      
      await user.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }
    
    // Reset attempt counter on success
    user.otpAttempts = 0;

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Verify that OTP was validated
    if (!user.resetPasswordOtp || !user.resetPasswordExpiry) {
      return res.status(400).json({ message: "Please verify your OTP first" });
    }

    if (user.resetPasswordExpiry < Date.now()) {
      // Clear expired OTP
      user.resetPasswordOtp = null;
      user.resetPasswordExpiry = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please start the process again." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user
    user.password = hashedPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

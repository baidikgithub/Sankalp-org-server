const Admin = require('../models/admin.model');

exports.adminLogin = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Find admin by email or username
    let admin;
    if (email) {
      admin = await Admin.findOne({ email });
    } else if (username) {
      admin = await Admin.findOne({ username });
    } else {
      return res.status(400).json({ message: "Email or username is required" });
    }

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Direct password check (plain text)
    if (password !== admin.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { adminId: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return res.status(200).json({ 
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email || null
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



const Admin = require('../models/admin.model');

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Direct password check (plain text)
    if (password !== admin.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



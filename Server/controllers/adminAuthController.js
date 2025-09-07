const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}


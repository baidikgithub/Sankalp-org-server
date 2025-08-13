const Member = require('../models/members.model');

// @desc Add a new member
// @route POST /api/members
// @access Public
exports.addMember = async (req, res) => {
  try {
    const { name, email, phone, role, location } = req.body;

    // Basic validation
    if (!name || !email || !phone || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new member document
    const member = new Member({ name, email, phone, role, location });

    // Save to DB
    await member.save();

    return res.status(201).json({ message: 'Member added successfully', member });
  } catch (error) {
    console.error('Error adding member:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// @desc Get all members
// @route GET /api/members
// @access Public
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    return res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
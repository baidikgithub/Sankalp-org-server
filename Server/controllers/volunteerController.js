// controllers/volunteerController.js
const Volunteer = require('../models/volunteer');

// @desc Register a new volunteer
// @route POST /api/volunteers
// @access Public
exports.registerVolunteer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      occupation,
      interests,
      availability,
      experience,
      skills,
      motivation
    } = req.body;

    // Basic validation
    if (
      !name || !email || !phone
    ) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // Check for duplicate email
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Volunteer with this email already exists.' });
    }

    // Create new volunteer
    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      age,
      location: req.body.location || 'Not specified', // Optional field
      role: req.body.role || 'Volunteer', // Default role
      occupation,
      interests,
      availability,
      experience,
      skills,
      motivation
    });

    await newVolunteer.save();

    res.status(201).json({
      message: 'Volunteer registration successful',
      volunteer: newVolunteer
    });

  } catch (error) {
    console.error('Error registering volunteer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Get all volunteers
// @route GET /api/volunteers
// @access Public
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ joinDate: -1 });
    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

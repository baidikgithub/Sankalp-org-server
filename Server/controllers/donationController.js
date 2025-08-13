const Donation = require('../models/donation.model');

// @desc Get all donations
// @route GET /api/donations
// @access Public
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    return res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// @desc Add a new donation
// @route POST /api/donations
// @access Public
exports.addDonation = async (req, res) => {
  try {
    const { donorName, email, amount, currency, category, paymentMethod, status, transactionId, message } = req.body;

    // Basic validation
    if (!donorName || !email || !amount || !currency || !category || !paymentMethod || !status || !transactionId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new donation document
    const donation = new Donation({ donorName, email, amount, currency, category, paymentMethod, status, transactionId, message });

    // Save to DB
    await donation.save();

    return res.status(201).json({ message: 'Donation added successfully', donation });
  } catch (error) {
    console.error('Error adding donation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
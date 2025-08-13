const Contact = require("../models/contact.model");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new contact document
    const contact = new Contact({ name, email, subject, message });

    // Save to DB
    await contact.save();

    return res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
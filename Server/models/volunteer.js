const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true, min: 16, max: 100 },
  occupation: { type: String, required: true },
  interests: [{ type: String, required: true }], // array of interest values
  availability: { type: String, required: true },
  experience: { type: String },
  skills: { type: String },
  motivation: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);

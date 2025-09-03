const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['Member', 'Volunteer', 'Admin'], default: 'Volunteer' },
  age: { type: Number, required: true, min: 16, max: 100 },
  location: { type: String, required: true },
  occupation: { type: String, required: true },
  interests: [{ type: String, required: true }], // array of interest values
  availability: { type: String, required: true },
  experience: { type: String },
  skills: [{ type: String }],
  motivation: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);

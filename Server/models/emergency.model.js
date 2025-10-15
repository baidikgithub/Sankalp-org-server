const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true }
    },
    emergencyType: { 
      type: String, 
      required: true,
      enum: ['medical', 'safety', 'fire', 'accident', 'other']
    },
    description: { type: String, required: true },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: { 
      type: String, 
      enum: ['reported', 'assigned', 'in_progress', 'resolved', 'cancelled'],
      default: 'reported'
    },
    assignedVolunteer: {
      volunteerId: { type: String },
      volunteerName: { type: String },
      volunteerPhone: { type: String }
    },
    updates: [{
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      status: { type: String },
      user: { type: String, required: true },
      userType: { type: String, enum: ['admin', 'volunteer', 'user'], default: 'admin' }
    }],
    isActive: { type: Boolean, default: true },
    resolvedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emergency", emergencySchema);


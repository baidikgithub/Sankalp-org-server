const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // member, donation, event, project
  action: { type: String, required: true },
  user: { type: String, required: true },
  time: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);

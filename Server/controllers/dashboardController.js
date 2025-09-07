const Member = require("../models/members.model");
const Volunteer = require("../models/volunteer");
const Donation = require("../models/donation.model");
const Activity = require("../models/activity");

// Get all dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    // Projects model not present; default to 0
    const activeProjects = 0;
    const totalDonations = await Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const activeVolunteers = await Volunteer.countDocuments({ status: "active" });
    // Events model not present; default to 0
    const eventsThisMonth = 0;

    res.json({
      totalMembers,
      activeProjects,
      totalDonations: totalDonations[0]?.total || 0,
      activeVolunteers,
      eventsThisMonth,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(10);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

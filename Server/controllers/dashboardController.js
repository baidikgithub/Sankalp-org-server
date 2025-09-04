const Member = require("../models/Member");
const Volunteer = require("../models/Volunteer");
const Donation = require("../models/Donation");
const Project = require("../models/Project");
const Event = require("../models/Event");
const Activity = require("../models/Activity");

// Get all dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const activeProjects = await Project.countDocuments({ status: "active" });
    const totalDonations = await Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const activeVolunteers = await Volunteer.countDocuments({ status: "active" });
    const eventsThisMonth = await Event.countDocuments({
      date: { 
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), 
        $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) 
      }
    });

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

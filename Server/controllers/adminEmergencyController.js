const Emergency = require("../models/emergency.model");

// Get all emergency requests
exports.getAllEmergencies = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    const emergencies = await Emergency.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Emergency.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: emergencies,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency requests",
      error: error.message
    });
  }
};

// Get emergency by ID
exports.getEmergencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const emergency = await Emergency.findById(id);
    
    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency request not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: emergency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency request",
      error: error.message
    });
  }
};

// Update emergency status
exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, updateText } = req.body;
    
    const emergency = await Emergency.findById(id);
    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency request not found"
      });
    }
    
    // Add update to the updates array
    emergency.updates.push({
      text: updateText || `Status updated to ${status}`,
      status: status,
      user: 'Admin',
      userType: 'admin'
    });
    
    emergency.status = status;
    emergency.updatedAt = new Date();
    
    if (status === 'resolved') {
      emergency.resolvedAt = new Date();
    }
    
    await emergency.save();
    
    res.status(200).json({
      success: true,
      message: "Emergency status updated successfully",
      data: emergency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update emergency status",
      error: error.message
    });
  }
};

// Assign volunteer to emergency
exports.assignVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const { volunteerId, volunteerName, volunteerPhone } = req.body;
    
    const emergency = await Emergency.findById(id);
    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency request not found"
      });
    }
    
    emergency.assignedVolunteer = {
      volunteerId,
      volunteerName,
      volunteerPhone
    };
    
    emergency.status = 'assigned';
    emergency.updates.push({
      text: `Assigned to volunteer: ${volunteerName}`,
      status: 'assigned',
      user: 'Admin',
      userType: 'admin'
    });
    
    await emergency.save();
    
    res.status(200).json({
      success: true,
      message: "Volunteer assigned successfully",
      data: emergency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to assign volunteer",
      error: error.message
    });
  }
};

// Get emergency statistics
exports.getEmergencyStats = async (req, res) => {
  try {
    const total = await Emergency.countDocuments();
    const active = await Emergency.countDocuments({ status: { $in: ['reported', 'assigned', 'in_progress'] } });
    const resolved = await Emergency.countDocuments({ status: 'resolved' });
    const urgent = await Emergency.countDocuments({ priority: 'urgent' });
    
    // Get emergencies by type
    const byType = await Emergency.aggregate([
      { $group: { _id: '$emergencyType', count: { $sum: 1 } } }
    ]);
    
    // Get emergencies by status
    const byStatus = await Emergency.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        resolved,
        urgent,
        byType,
        byStatus
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency statistics",
      error: error.message
    });
  }
};

// Create new emergency (for admin to report)
exports.createEmergency = async (req, res) => {
  try {
    const emergencyData = {
      ...req.body,
      updates: [{
        text: 'Emergency reported by admin',
        status: 'reported',
        user: 'Admin',
        userType: 'admin'
      }]
    };
    
    const emergency = new Emergency(emergencyData);
    await emergency.save();
    
    res.status(201).json({
      success: true,
      message: "Emergency created successfully",
      data: emergency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create emergency",
      error: error.message
    });
  }
};


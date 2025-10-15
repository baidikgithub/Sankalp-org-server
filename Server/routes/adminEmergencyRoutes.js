const express = require("express");
const router = express.Router();
const {
  getAllEmergencies,
  getEmergencyById,
  updateEmergencyStatus,
  assignVolunteer,
  getEmergencyStats,
  createEmergency
} = require("../controllers/adminEmergencyController");

// Get all emergency requests
router.get("/", getAllEmergencies);

// Get emergency statistics
router.get("/stats", getEmergencyStats);

// Get emergency by ID
router.get("/:id", getEmergencyById);

// Create new emergency (admin reporting)
router.post("/", createEmergency);

// Update emergency status
router.put("/:id/status", updateEmergencyStatus);

// Assign volunteer to emergency
router.put("/:id/assign", assignVolunteer);

module.exports = router;


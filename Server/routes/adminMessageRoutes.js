const express = require("express");
const router = express.Router();
const {
  getConversations,
  getConversationMessages,
  markMessagesAsRead,
  getMessageStats,
  deleteConversation
} = require("../controllers/adminMessageController");

// Get all conversations
router.get("/conversations", getConversations);

// Get message statistics
router.get("/stats", getMessageStats);

// Get messages for a specific conversation
router.get("/conversations/:conversationId/messages", getConversationMessages);

// Mark messages as read
router.put("/conversations/:conversationId/read", markMessagesAsRead);

// Delete conversation
router.delete("/conversations/:conversationId", deleteConversation);

module.exports = router;


const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    senderName: { type: String, required: true },
    receiverName: { type: String, required: true },
    message: { type: String, required: true },
    messageType: { 
      type: String, 
      enum: ['text', 'image', 'file', 'location'],
      default: 'text'
    },
    isEmergency: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ['sending', 'sent', 'delivered', 'read'],
      default: 'sending'
    },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    // Additional user information
    userEmail: { type: String },
    userPhone: { type: String },
    location: { type: String },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    attachments: [{
      type: { type: String },
      url: { type: String },
      name: { type: String },
      size: { type: Number }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Index for efficient querying
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1, receiverId: 1 });

module.exports = mongoose.model("Message", messageSchema);


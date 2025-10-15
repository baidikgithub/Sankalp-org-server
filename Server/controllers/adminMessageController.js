const Message = require("../models/message.model");

// Get all conversations for admin
exports.getConversations = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    // Get unique conversations
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { receiverId: 'admin' },
            { senderId: { $ne: 'admin' } }
          ]
        }
      },
      {
        $group: {
          _id: '$conversationId',
          userId: { $first: '$senderId' },
          userName: { $first: '$senderName' },
          lastMessage: { $last: '$message' },
          lastMessageTime: { $last: '$createdAt' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$receiverId', 'admin'] }, { $eq: ['$isRead', false] }] },
                1,
                0
              ]
            }
          },
          isEmergency: { $max: '$isEmergency' }
        }
      },
      {
        $sort: { lastMessageTime: -1 }
      },
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: parseInt(limit)
      }
    ]);
    
    const total = await Message.distinct('conversationId').length;
    
    res.status(200).json({
      success: true,
      data: conversations.map(conv => ({
        id: conv._id,
        userId: conv.userId,
        userName: conv.userName,
        lastMessage: conv.lastMessage,
        lastMessageTime: conv.lastMessageTime,
        unreadCount: conv.unreadCount,
        isEmergency: conv.isEmergency,
        status: 'online' // This would be determined by Socket.IO connection status
      })),
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
      error: error.message
    });
  }
};

// Get messages for a specific conversation
exports.getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Message.countDocuments({ conversationId });
    
    res.status(200).json({
      success: true,
      data: messages.reverse(), // Return in chronological order
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message
    });
  }
};

// Mark messages as read
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    await Message.updateMany(
      { 
        conversationId, 
        receiverId: 'admin',
        isRead: false 
      },
      { 
        isRead: true, 
        readAt: new Date() 
      }
    );
    
    res.status(200).json({
      success: true,
      message: "Messages marked as read"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to mark messages as read",
      error: error.message
    });
  }
};

// Save message to database (called from Socket.IO)
exports.saveMessage = async (messageData) => {
  try {
    const message = new Message({
      conversationId: messageData.conversationId,
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      senderName: messageData.senderName,
      receiverName: messageData.receiverName,
      message: messageData.message,
      messageType: messageData.messageType || 'text',
      isEmergency: messageData.isEmergency || false,
      status: 'sent',
      attachments: messageData.attachments || []
    });
    
    await message.save();
    return message;
  } catch (error) {
    console.error('Failed to save message:', error);
    throw error;
  }
};

// Get message statistics
exports.getMessageStats = async (req, res) => {
  try {
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ 
      receiverId: 'admin', 
      isRead: false 
    });
    const emergencyMessages = await Message.countDocuments({ 
      isEmergency: true 
    });
    
    // Get messages by day for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const messagesByDay = await Message.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalMessages,
        unreadMessages,
        emergencyMessages,
        messagesByDay
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch message statistics",
      error: error.message
    });
  }
};

// Delete conversation
exports.deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    await Message.deleteMany({ conversationId });
    
    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete conversation",
      error: error.message
    });
  }
};


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/ConnectDB');
const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const membersRoutes = require('./routes/membersRoutes');
const donationRoutes = require('./routes/donationRoutes');
const usersRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const adminEmergencyRoutes = require('./routes/adminEmergencyRoutes');
const adminMessageRoutes = require('./routes/adminMessageRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { saveMessage } = require('./controllers/adminMessageController');
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contact', contactRoutes); 
app.use('/api/members', membersRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin/emergencies', adminEmergencyRoutes);
app.use('/api/admin/messages', adminMessageRoutes);
app.use("/api/chat", chatRoutes);

// Socket.IO connection handling
const connectedUsers = new Map();
const adminUsers = new Set();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('joinUserRoom', (data) => {
    const { userId, userName } = data;
    connectedUsers.set(socket.id, { userId, userName, isAdmin: false });
    socket.join(`user_${userId}`);
    console.log(`User ${userName} joined room: user_${userId}`);
    
    // Notify admin about user online
    socket.broadcast.to('admin_room').emit('userOnline', { userId, userName });
  });

  // Handle admin joining
  socket.on('joinAdminRoom', (data) => {
    const { adminId } = data;
    connectedUsers.set(socket.id, { userId: adminId, userName: 'Admin', isAdmin: true });
    adminUsers.add(adminId);
    socket.join('admin_room');
    console.log(`Admin ${adminId} joined admin room`);
    
    // Notify all users that admin is online
    socket.broadcast.emit('adminOnline', { adminId });
  });

  // Handle sending messages
  socket.on('sendMessage', async (data) => {
    const { receiverId, message, senderId, senderName, isEmergency } = data;
    const messageData = {
      messageId: Date.now().toString(),
      conversationId: receiverId === 'admin' ? `user_${senderId}_admin` : `${senderId}_${receiverId}`,
      senderId,
      receiverId,
      message,
      timestamp: new Date().toISOString(),
      isEmergency: isEmergency || false,
      senderName: senderName || 'User',
      receiverName: receiverId === 'admin' ? 'Admin' : 'User'
    };

    console.log('Message received:', messageData);

    try {
      // Save message to database
      await saveMessage(messageData);
      console.log('Message saved to database');
    } catch (error) {
      console.error('Failed to save message to database:', error);
    }

    // Send to specific user or admin room
    if (receiverId === 'admin') {
      socket.to('admin_room').emit('receiveMessage', messageData);
      console.log('Message sent to admin room');
    } else {
      socket.to(`user_${receiverId}`).emit('receiveMessage', messageData);
      console.log(`Message sent to user_${receiverId}`);
    }

    // Send confirmation back to sender
    socket.emit('messageSent', { ...messageData, status: 'sent' });
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    const { receiverId, isTyping } = data;
    const user = connectedUsers.get(socket.id);
    if (user) {
      if (receiverId === 'admin') {
        socket.to('admin_room').emit('userTyping', { 
          userId: user.userId, 
          userName: user.userName, 
          isTyping 
        });
      } else {
        socket.to(`user_${receiverId}`).emit('adminTyping', { isTyping });
      }
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      if (user.isAdmin) {
        adminUsers.delete(user.userId);
        socket.broadcast.emit('adminOffline', { adminId: user.userId });
      } else {
        socket.broadcast.to('admin_room').emit('userOffline', { 
          userId: user.userId, 
          userName: user.userName 
        });
      }
      connectedUsers.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Socket.IO server ready for real-time chat`);
});

// Serve React frontend (production build)
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "../Client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../Client/build", "index.html"));
  });
}

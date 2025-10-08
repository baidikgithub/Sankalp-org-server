const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const connectDB = require('./config/ConnectDB');
const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const membersRoutes = require('./routes/membersRoutes');
const donationRoutes = require('./routes/donationRoutes');
const usersRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const chatRoutes = require('./routes/chatRoutes');
dotenv.config();
const app = express();
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
app.use("/api/chat", chatRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
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

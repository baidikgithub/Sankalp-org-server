const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/ConnectDB');
const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const membersRoutes = require('./routes/membersRoutes');
const donationRoutes = require('./routes/donationRoutes');
const usersRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

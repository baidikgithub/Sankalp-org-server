const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/ConnectDB');
const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON body
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

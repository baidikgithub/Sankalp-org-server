const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.green.bold);
    } catch (error) {
        console.log(error.red.bold);
        process.exit(1);
    }
};

module.exports = connectDB;

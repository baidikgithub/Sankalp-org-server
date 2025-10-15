const mongoose = require('mongoose');
const Admin = require('./Server/models/admin.model');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://baidikmazumdar:baidikmazumdar@cluster0.tudedjo.mongodb.net/sankalp-org?retryWrites=true&w=majority');

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      return;
    }

    // Create new admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    });

    await admin.save();
    console.log('Admin created successfully:', admin.email);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();

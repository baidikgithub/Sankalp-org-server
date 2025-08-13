const mongoose = require('mongoose');


const memberSchema = new mongoose.Schema({
  name: {
    type: String,   
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  joinDate: {
    type: Date, 
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  role: {
    type: String,
    enum: ['Admin', 'Member', 'Volunteer'],
    default: 'Member'
  },
  location: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
}); 

module.exports = mongoose.model('Member', memberSchema);
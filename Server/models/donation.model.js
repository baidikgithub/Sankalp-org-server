const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'INR', 'GBP'], // Add more currencies as needed
    },
    category: {
        type: String,
        required: true,
        enum: ['General Donation', 'Education Fund', 'Health Fund', 'Corporate Donation'],
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'],
    },
    status: {
        type: String,
        required: true,
        enum: ['completed', 'pending', 'failed'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);
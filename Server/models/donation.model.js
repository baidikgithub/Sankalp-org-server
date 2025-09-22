const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true }, // card / upi / netbanking
    amount: { type: Number, required: true },
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },
    upiId: { type: String },
    bank: { type: String },
    status: { type: String, default: "pending" }, // pending / success
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);

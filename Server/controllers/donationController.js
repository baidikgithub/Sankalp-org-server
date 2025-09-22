const Donation = require("../models/Donation");

// Get Payment Methods
exports.getPaymentMethods = (req, res) => {
  const paymentMethods = [
    { id: "card", title: "Credit/Debit Card", icon: "💳" },
    { id: "upi", title: "UPI Payment", icon: "📱" },
  ];
  res.json(paymentMethods);
};

// Get Banks
exports.getBanks = (req, res) => {
  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
  ];
  res.json(banks);
};

// Create Donation
exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: "Donation created", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Mark Payment Success
exports.markSuccess = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { status: "success" },
      { new: true }
    );
    if (!donation) return res.status(404).json({ error: "Donation not found" });
    res.json({ message: "Payment marked successful", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

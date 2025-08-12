import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Typography, Modal, Result, Spin } from "antd";

import home1 from "../assets/home/home1.jpg";
import home2 from "../assets/home/home2.jpg";
import home3 from "../assets/home/home3.jpg";
import home4 from "../assets/home/home4.jpg";

// Import Components
import DonationHero from "../components/DonationHero";
import ImpactGallery from "../components/ImpactGallery";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import AmountSelector from "../components/AmountSelector";
import PaymentForm from "../components/PaymentForm";
import SuccessMessage from "../components/SuccessMessage";

const { Title } = Typography;

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Payment() {
  // ===== State Management =====
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ===== Data =====
  const paymentMethods = [
    { id: "card", title: "Credit/Debit Card", icon: "💳" },
    { id: "upi", title: "UPI Payment", icon: "📱" },
    { id: "netbanking", title: "Net Banking", icon: "🏦" },
    { id: "wallet", title: "Digital Wallet", icon: "👛" },
  ];

  const amountOptions = [
    { value: "500", label: "₹500" },
    { value: "1000", label: "₹1,000" },
    { value: "2500", label: "₹2,500" },
    { value: "5000", label: "₹5,000" },
    { value: "10000", label: "₹10,000" },
  ];

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

  const galleryData = [
    { img: home1, title: "Education Impact", desc: "Supporting children's education" },
    { img: home2, title: "Healthcare Support", desc: "Providing medical care" },
    { img: home3, title: "Community Development", desc: "Building stronger communities" },
  ];

  // ===== Utility Functions =====
  const getFinalAmount = () => customAmount || amount;

  const onFinish = () => {
    if (!selectedOption || !getFinalAmount()) {
      alert("Please select a payment method and amount");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setIsModalOpen(false);
    }, 2000);
  };

  const resetForm = () => {
    setSelectedOption("");
    setAmount("");
    setCustomAmount("");
    setPaymentSuccess(false);
  };

  // ===== Render =====
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      {/* Hero Section */}
      <DonationHero
        backgroundImage={home4}
        fadeUp={fadeUp}
        title="Support Our Cause"
        subtitle="Your contribution makes a difference in countless lives"
      />

      {/* Gallery Section */}
      <ImpactGallery
        fadeUp={fadeUp}
        galleryData={galleryData}
        onDonateClick={() => setIsModalOpen(true)}
      />

      {/* Payment Modal */}
      <Modal
        title="Make a Donation"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <motion.div variants={fadeUp}>
          {/* Payment Method */}
          <PaymentMethodSelector
            paymentMethods={paymentMethods}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          {/* Amount Selection */}
          <AmountSelector
            amount={amount}
            setAmount={setAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            amountOptions={amountOptions}
          />

          {/* Payment Form */}
          <AnimatePresence>
            {selectedOption && (
              <PaymentForm
                selectedOption={selectedOption}
                banks={banks}
                getFinalAmount={getFinalAmount}
                isProcessing={isProcessing}
                onFinish={onFinish}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </Modal>

      {/* Success Message */}
      {paymentSuccess && (
        <SuccessMessage
          amount={getFinalAmount()}
          resetForm={resetForm}
        />
      )}
    </motion.div>
  );
}

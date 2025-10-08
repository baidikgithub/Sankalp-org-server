// pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { message } from "antd";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import logo from "../assets/logo/logo.png";
import api from "../utils/api";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    console.log("Forgot Password form values:", values);
    try {
      const { data } = await api.post("/auth/forgot-password", values);
      message.success(data.message || "OTP has been sent to your email");
      navigate('/reset-password', { state: { email: values.email } });
    } catch (error) {
      console.error("Forgot Password error:", error);
      if (error.response) {
        // Server responded with an error
        message.error(error.response.data.message || "Failed to send OTP");
      } else if (error.request) {
        // Request was made but no response received
        message.error("Cannot connect to server. Please check your internet connection and try again.");
      } else {
        // Other errors
        message.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      leftContent={
        <AuthBranding
          logo={logo}
          orgName="Sankalp Youth Organisation"
          tagline="Don't worry! It happens. Please enter the email address associated with your account."
        />
      }
      rightContent={
        <>
          <ForgotPasswordForm onFinish={handleFinish} loading={loading} />
          <div style={{ textAlign: "center", padding: "0 2.5rem 3rem" }}>
            Remember your password?{" "}
            <Link to="/signin" style={{ color: "#3949ab", fontWeight: 500 }}>
              Sign In
            </Link>
          </div>
        </>
      }
    />
  );
};

export default ForgotPassword;

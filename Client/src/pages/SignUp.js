// pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import SignUpForm from "../components/SignUpForm";
import logo from "../assets/logo/logo.png";
import api from "../utils/api";
const SignUp = () => {
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      await api.post("/auth/signup", values);
      console.log("Sign Up form values:", values);
      message.success("Registration successful! Please sign in.");
      navigate("/signin");
    } catch (error) {
      console.error("Sign Up error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      message.error(errorMessage);
    }
  };
  return (
    <AuthLayout
      leftContent={
        <AuthBranding
          logo={logo}
          orgName="Sankalp Youth Organisation"
          tagline="Join us in making a difference! Together we can create positive change."
        />
      }
      rightContent={<SignUpForm handleFinish={handleFinish} />}
    />
  );
};

export default SignUp;

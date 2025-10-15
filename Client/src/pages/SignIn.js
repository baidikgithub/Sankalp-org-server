// pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import SignInForm from "../components/SignInForm";
import logo from "../assets/logo/logo.png";
import api from "../utils/api";
const SignIn = () => {
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const { data } = await api.post("/auth/signin", values);
      console.log("Sign In form values:", values);
      if (data.token) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);
        message.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Sign In error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      message.error(errorMessage);
    }
  };
  return (
    <AuthLayout
      leftContent={
        <AuthBranding
          logo={logo}
          orgName="Sankalp Youth Organisation"
          tagline="Welcome back! Empowering youth for a brighter tomorrow."
        />
      }
      rightContent={<SignInForm handleFinish={handleFinish} />}
    />
  );
};

export default SignIn;

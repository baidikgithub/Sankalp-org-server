// pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import SignInForm from "../components/SignInForm";
import logo from "../assets/logo/logo.png";
import axios from "axios";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5001/api/auth/signin", values);
      console.log("Sign In form values:", values);
      if (data.token) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Sign In error:", error);
    }
    finally {
      setLoading(false);
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

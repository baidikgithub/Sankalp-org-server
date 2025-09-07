// pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import SignUpForm from "../components/SignUpForm";
import logo from "../assets/logo/logo.png";
import axios from "axios";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5001/api/auth/signup", values);
      console.log("Sign Up form values:", values);
      if (data.token) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Sign Up error:", error);
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
          tagline="Join us in making a difference! Together we can create positive change."
        />
      }
      rightContent={<SignUpForm handleFinish={handleFinish} />}
    />
  );
};

export default SignUp;

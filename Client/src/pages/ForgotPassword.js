// pages/ForgotPassword.jsx
import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import logo from "../assets/logo/logo.png";

const ForgotPassword = () => {
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
          <ForgotPasswordForm />
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

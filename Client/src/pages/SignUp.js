// pages/SignUp.jsx
import React from "react";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import SignUpForm from "../components/SignUpForm";
import logo from "../assets/logo/logo.png";

const SignUp = () => {
  return (
    <AuthLayout
      leftContent={
        <AuthBranding
          logo={logo}
          orgName="Sankalp Youth Organisation"
          tagline="Join us in making a difference! Together we can create positive change."
        />
      }
      rightContent={<SignUpForm />}
    />
  );
};

export default SignUp;

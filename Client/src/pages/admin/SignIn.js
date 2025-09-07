// pages/SignIn.jsx
import React from "react";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import SignInForm from "../../components/SignInForm";
import logo from "../assets/logo/logo.png";

const SignIn = () => {
  return (
    <AuthLayout
      leftContent={
        <AuthBranding
          logo={logo}
          orgName="Sankalp Youth Organisation"
          tagline="Welcome back! Empowering youth for a brighter tomorrow."
        />
      }
      rightContent={<SignInForm />}
    />
  );
};

export default SignIn;

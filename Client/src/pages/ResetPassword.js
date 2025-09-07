// pages/ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Typography, Form, Input, Button, message } from "antd";
import AuthLayout from "../components/AuthLayout";
import AuthBranding from "../components/AuthBranding";
import logo from "../assets/logo/logo.png";
import axios from "axios";

const { Title } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Step 1: Verify OTP
  const handleOtpVerify = async (values) => {
    setLoading(true);
    try {
      const { email, otp } = values;
      await axios.post("http://localhost:5001/api/auth/verify-otp", { email, otp });
      message.success("OTP verified! Please enter your new password.");
      setOtpVerified(true);
      setEmail(email);
    } catch (error) {
      const errMsg = error.response?.data?.message || "OTP verification failed";
      message.error(errMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit new password
  const handlePasswordReset = async (values) => {
    setLoading(true);
    try {
      const { newPassword } = values;
      await axios.post("http://localhost:5001/api/auth/reset-password", { email, newPassword });
      message.success("Password reset successful! Please sign in.");
      navigate("/signin");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Password reset failed";
      message.error(errMsg);
      console.error(error);
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
          tagline={otpVerified ? "Enter your new password below." : "Enter your email and OTP sent to your email."}
        />
      }
      rightContent={
        <div style={{ padding: "3rem 2.5rem" }}>
          <Title level={4} style={{ color: "#1a237e", marginBottom: 25 }}>
            {otpVerified ? "Reset Password" : "Verify OTP"}
          </Title>

          {!otpVerified ? (
            <Form layout="vertical" onFinish={handleOtpVerify} requiredMark="optional">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Email Address" size="large" />
              </Form.Item>

              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: "Please enter the OTP sent to your email" },
                  { len: 6, message: "OTP must be 6 digits" },
                ]}
              >
                <Input placeholder="OTP" size="large" maxLength={6} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  style={{ background: "#3949ab", padding: "0.8rem 1rem" }}
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form layout="vertical" onFinish={handlePasswordReset} requiredMark="optional">
              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter your new password" },
                  { min: 6, message: "Password must be at least 6 characters" }
                ]}
              >
                <Input.Password placeholder="New Password" size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  style={{ background: "#3949ab", padding: "0.8rem 1rem" }}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          )}

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/signin" style={{ color: "#3949ab", fontWeight: 500 }}>
              Back to Sign In
            </Link>
          </div>
        </div>
      }
    />
  );
};

export default ResetPassword;
            
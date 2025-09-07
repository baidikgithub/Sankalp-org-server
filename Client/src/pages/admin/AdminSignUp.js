// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const AdminSignUpPage= () => {
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleFinish = (values) => {
    setLoading(true);
    // MOCK: Replace with real API call
    setTimeout(() => {
      setLoading(false);
      // Save auth, redirect, etc
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/admin/dashboard";
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3e8fd 30%, #eff4ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          maxWidth: 390,
          width: "100%",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px #223c7a10",
          padding: "2.5rem 2rem"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          {/* <img src="/assets/logo.png" alt="Logo" style={{ width: 70, marginBottom: 8 }} /> */}
          <Title level={4} style={{ color: "#1a237e", marginBottom: 4 }}>Sankalp Youth Organisation</Title>
          <Text type="secondary">Empowering youth for a brighter tomorrow.</Text>
        </div>
        <Title level={5} style={{ color: "#3949ab" }}>Sign In</Title>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="you@example.com"
              size="large"
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Password"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <a href="/forgot-password" style={{ color: "#3949ab" }}>Forgot password?</a>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                background: "#3949ab",
                border: "none",
                height: "auto",
                padding: "0.8rem 1rem"
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminSignUpPage;

// components/auth/SignInForm.jsx
import React, { useState } from "react";
import { Typography, Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = (values) => {
    setLoading(true);
    console.log("Sign In form values:", values);

    // Simulate API login
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div style={{ padding: "3rem 2.5rem" }}>
      <Title level={4} style={{ color: "#1a237e", marginBottom: 25 }}>
        Sign In
      </Title>
      <Form layout="vertical" onFinish={handleFinish} requiredMark="optional">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Email Address"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <Link to="/forgot-password" style={{ color: "#3949ab" }}>
            Forgot password?
          </Link>
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
              height: "auto",
              padding: "0.8rem 1rem",
            }}
          >
            Sign In
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#3949ab", fontWeight: 500 }}>
            Sign Up
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;

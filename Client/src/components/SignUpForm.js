// components/auth/SignUpForm.jsx
import React, { useState } from "react";
import { Typography, Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = (values) => {
    setLoading(true);
    console.log("Sign Up form values:", values);

    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      navigate("/signin");
    }, 1200);
  };

  return (
    <div style={{ padding: "3rem 2.5rem" }}>
      <Title level={4} style={{ color: "#1a237e", marginBottom: 25 }}>
        Sign Up
      </Title>
      <Form layout="vertical" onFinish={handleFinish} requiredMark="optional">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Full Name"
            size="large"
          />
        </Form.Item>

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
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

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
            Sign Up
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/signin" style={{ color: "#3949ab", fontWeight: 500 }}>
            Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;

// components/auth/ForgotPasswordForm.jsx
import React, { useState } from "react";
import { Typography, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // TODO: Implement password reset logic here
      console.log("Reset password for:", values.email);
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1200));
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "3rem 2.5rem" }}>
      <Title level={4} style={{ color: "#1a237e", marginBottom: 25 }}>
        Reset Password
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
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;

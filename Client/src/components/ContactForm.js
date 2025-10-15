import React from "react";
import { motion } from "framer-motion";
import { Card, Form, Input, Button, Row, Col } from "antd";

const ContactForm = ({ onSubmit, isSubmitting, submitMessage }) => (
  <motion.div>
    <Card title="Send Us a Message" variant="borderless">
      {submitMessage && (
        <motion.div style={{ marginBottom: 20, color: "green" }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          {submitMessage}
        </motion.div>
      )}
      <Form layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="name" rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder="Your Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Enter a valid email" }]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="subject" rules={[{ required: true }]}>
          <Input placeholder="Subject" />
        </Form.Item>
        <Form.Item name="message" rules={[{ required: true, message: "Message cannot be empty" }]}>
          <Input.TextArea placeholder="Your Message" rows={6} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          Send Message
        </Button>
      </Form>
    </Card>
  </motion.div>
);

export default ContactForm;

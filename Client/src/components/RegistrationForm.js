import React from "react";
import { motion } from "framer-motion";
import { Card, Form, Input, Select, Checkbox, Row, Col, Button, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const RegistrationForm = ({
  onFinish,
  loading,
  interestOptions
}) => {
  return (
    <Card>
      <Title level={3}>Volunteer Registration Form</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="age" label="Age" rules={[{ required: true, type: "number", min: 16, max: 100 }]}>
              <Input type="number" min={16} max={100} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="occupation" label="Current Occupation" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="interests"
          label="Areas of Interest"
          rules={[{ required: true, message: "Select at least one interest" }]}
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              {interestOptions.map((opt) => (
                <Col xs={24} sm={12} key={opt.value} style={{ padding: "5px 0" }}>
                  <Checkbox value={opt.value}>
                    {opt.icon} {opt.label}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="availability" label="Availability" rules={[{ required: true }]}>
          <Select placeholder="Select availability">
            <Option value="weekends">Weekends only</Option>
            <Option value="weekdays">Weekdays only</Option>
            <Option value="flexible">Flexible schedule</Option>
            <Option value="events-only">Events only</Option>
            <Option value="monthly">Once a month</Option>
          </Select>
        </Form.Item>

        <Form.Item name="experience" label="Previous Volunteer Experience">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="skills" label="Special Skills or Talents">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="motivation" label="Why Do You Want to Join Us?" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{ maxWidth: 300 }}
            >
              Join Our Community
            </Button>
          </motion.div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegistrationForm;

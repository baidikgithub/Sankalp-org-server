import React from "react";
import { Modal, Form, Input, Select, Button, InputNumber } from "antd";

const AddVolunteerForm = ({
  visible,
  onCancel,
  onFinish, // submit function passed as prop
  loading,
  initialValues = {}, // for edit mode
  interestOptions = [], // interests passed as prop
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Volunteer Registration"
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish} // using prop for submission
        initialValues={initialValues} // for edit mode
      >
        {/* Full Name */}
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input />
        </Form.Item>

        {/* Age */}
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please enter your age" }]}
        >
          <InputNumber style={{ width: "100%" }} min={10} max={100} />
        </Form.Item>

        {/* Occupation */}
        <Form.Item
          label="Occupation"
          name="occupation"
        >
          <Input />
        </Form.Item>

        {/* Role */}
        <Form.Item
          label="Role"
          name="role"
        >
          <Select placeholder="Select role">
            <Select.Option value="Member">Member</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Volunteer">Volunteer</Select.Option>
          </Select>
        </Form.Item>

        {/* Location */}
        <Form.Item
          label="Location"
          name="location"
        >
          <Input />
        </Form.Item>

        {/* Interests */}
        <Form.Item
          label="Interests"
          name="interests"
        >
          <Select mode="multiple" placeholder="Select your interests">
            {interestOptions.map((interest) => (
              <Select.Option key={interest} value={interest}>
                {interest}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Availability"
          name="availability"
        >
          <Input placeholder="e.g. Weekends, Evenings, Flexible" />
        </Form.Item>

        <Form.Item
          label="Motivation"
          name="motivation"
        >
          <Input.TextArea rows={3} placeholder="Write your motivation here" />
        </Form.Item>


        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVolunteerForm;

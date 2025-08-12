import React from 'react';
import { Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';

const AddMemberForm = ({ visible, onCancel, onSubmit, loading, initialValues, title, compact = true }) => {
  const [form] = Form.useForm();

  const handleFinish = async values => {
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={<><UserAddOutlined /> {title}</>}
      open={visible}
      onCancel={() => { form.resetFields(); onCancel(); }}
      footer={null}
      width={compact ? 500 : 600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
        requiredMark={false}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
              <Input size={compact ? 'small' : 'large'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}>
              <Input size={compact ? 'small' : 'large'} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="Phone" name="phone"><Input size={compact ? 'small' : 'large'} /></Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Role" name="role" initialValue="Member">
              <Select size={compact ? 'small' : 'large'}>
                <Select.Option value="Member">Member</Select.Option>
                <Select.Option value="Volunteer">Volunteer</Select.Option>
                <Select.Option value="Admin">Admin</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Location" name="location">
          <Input size={compact ? 'small' : 'large'} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onCancel} size={compact ? 'small' : 'large'} icon={<CloseOutlined />} style={{ marginRight: 6 }}>Cancel</Button>
          <Button htmlType="submit" type="primary" loading={loading} size={compact ? 'small' : 'large'} icon={<UserAddOutlined />}>
            {initialValues ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberForm;

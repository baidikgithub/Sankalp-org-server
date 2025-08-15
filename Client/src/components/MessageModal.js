import React from "react";
import { Modal, Typography } from "antd";

const { Paragraph } = Typography;

const MessageModal = ({ visible, onClose, message }) => (
  <Modal title="Message Details" open={visible} onCancel={onClose} footer={null}>
    {message && (
      <>
        <Paragraph><strong>Name:</strong> {message.name}</Paragraph>
        <Paragraph><strong>Email:</strong> {message.email}</Paragraph>
        <Paragraph><strong>Subject:</strong> {message.subject}</Paragraph>
        <Paragraph><strong>Date:</strong> {message.createdAt}</Paragraph>
        <Paragraph><strong>Message:</strong></Paragraph>
        <Paragraph>{message.message}</Paragraph>
      </>
    )}
  </Modal>
);

export default MessageModal;

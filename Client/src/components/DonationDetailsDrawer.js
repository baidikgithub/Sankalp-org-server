import React from 'react';
import { Drawer, Descriptions, Tag, Typography } from 'antd';

const { Text } = Typography;

const DonationDetailsDrawer = ({ open, onClose, donation, formatCurrency, getCategoryColor, getStatusColor }) => (
  <Drawer
    title="Donation Details"
    placement="right"
    onClose={onClose}
    open={open}
    width={600}
  >
    {donation && (
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Donor Name">{donation.donorName}</Descriptions.Item>
        <Descriptions.Item label="Email">{donation.email}</Descriptions.Item>
        <Descriptions.Item label="Amount">
          <Text strong style={{ color: '#52c41a', fontSize: '18px' }}>
            {formatCurrency(donation.amount, donation.currency)}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <Tag color={getCategoryColor(donation.category)}>
            {donation.category}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">{donation.paymentMethod}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={getStatusColor(donation.status)}>
            {donation.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Date">{new Date(donation.date).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Transaction ID">
          <Text code copyable>{donation.transactionId}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Message">
          {donation.message || 'No message provided'}
        </Descriptions.Item>
      </Descriptions>
    )}
  </Drawer>
);

export default DonationDetailsDrawer;

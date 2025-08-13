import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { DollarOutlined, ClockCircleOutlined, BarChartOutlined, CheckCircleOutlined } from '@ant-design/icons';

const DonationsStatsCards = ({ totalAmount, pendingAmount, totalDonations, successfulDonations, formatCurrency }) => (
  <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
    <Col xs={24} sm={12} md={6}>
      <Card>
        <Statistic
          title="Total Received"
          value={totalAmount}
          prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
          formatter={(value) => formatCurrency(value, 'INR')}
          valueStyle={{ color: '#52c41a' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card>
        <Statistic
          title="Pending Amount"
          value={pendingAmount}
          prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
          formatter={(value) => formatCurrency(value, 'INR')}
          valueStyle={{ color: '#faad14' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card>
        <Statistic
          title="Total Donations"
          value={totalDonations}
          prefix={<BarChartOutlined style={{ color: '#1890ff' }} />}
          valueStyle={{ color: '#1890ff' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card>
        <Statistic
          title="Successful"
          value={successfulDonations}
          prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          valueStyle={{ color: '#52c41a' }}
        />
      </Card>
    </Col>
  </Row>
);

export default DonationsStatsCards;

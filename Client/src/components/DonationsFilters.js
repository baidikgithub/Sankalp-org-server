import React from 'react';
import { Card, Col, Input, Select, DatePicker, Button, Row, Space } from 'antd';
import { SearchOutlined, ExportOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DonationsFilters = ({ searchText, setSearchText, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter, setDateRange, handleExport }) => (
  <Card style={{ marginBottom: '8px', border: "none" }}>
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={8}>
          <Input
            placeholder="Search by donor name, email, or transaction ID..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={8} md={4}>
          <Select
            placeholder="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: '100%' }}
          >
            <Option value="all">All Status</Option>
            <Option value="completed">Completed</Option>
            <Option value="pending">Pending</Option>
            <Option value="failed">Failed</Option>
          </Select>
        </Col>
        <Col xs={24} sm={8} md={4}>
          <Select
            placeholder="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: '100%' }}
          >
            <Option value="all">All Categories</Option>
            <Option value="General Donation">General Donation</Option>
            <Option value="Education Fund">Education Fund</Option>
            <Option value="Health Fund">Health Fund</Option>
            <Option value="Corporate Donation">Corporate Donation</Option>
          </Select>
        </Col>
        <Col xs={24} sm={8} md={4}>
          <RangePicker
            onChange={setDateRange}
            style={{ width: '100%' }}
            placeholder={['Start Date', 'End Date']}
          />
        </Col>
        <Col xs={24} sm={24} md={4}>
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={handleExport}
            style={{ width: '100%' }}
          >
            Export Report
          </Button>
        </Col>
      </Row>
    </Space>
  </Card>
);

export default DonationsFilters;

import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Space, 
  Row, 
  Col, 
  Statistic, 
  Tag, 
  Typography, 
  Tooltip,
  Drawer,
  Descriptions,
  Modal,
  message
} from 'antd';
import { 
  SearchOutlined, 
  ExportOutlined, 
  EyeOutlined, 
  EditOutlined, 
  CheckOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Donations = () => {
  const [donations, setDonations] = useState([
    {
      id: 1,
      donorName: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      amount: 5000,
      currency: 'INR',
      paymentMethod: 'Online Transfer',
      status: 'completed',
      date: '2024-02-15',
      category: 'General Donation',
      message: 'Happy to support the cause!',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      donorName: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      amount: 2500,
      currency: 'INR',
      paymentMethod: 'Credit Card',
      status: 'completed',
      date: '2024-02-14',
      category: 'Education Fund',
      message: 'For children\'s education',
      transactionId: 'TXN123456790'
    },
    {
      id: 3,
      donorName: 'Amit Patel',
      email: 'amit.patel@email.com',
      amount: 10000,
      currency: 'INR',
      paymentMethod: 'UPI',
      status: 'pending',
      date: '2024-02-13',
      category: 'Health Fund',
      message: 'Supporting healthcare initiatives',
      transactionId: 'TXN123456791'
    },
    {
      id: 4,
      donorName: 'Neha Singh',
      email: 'neha.singh@email.com',
      amount: 1500,
      currency: 'INR',
      paymentMethod: 'Debit Card',
      status: 'failed',
      date: '2024-02-12',
      category: 'General Donation',
      message: '',
      transactionId: 'TXN123456792'
    },
    {
      id: 5,
      donorName: 'Corporate XYZ Ltd',
      email: 'donations@xyzcorp.com',
      amount: 50000,
      currency: 'INR',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      date: '2024-02-10',
      category: 'Corporate Donation',
      message: 'Corporate social responsibility initiative',
      transactionId: 'TXN123456793'
    }
  ]);

  const [filteredDonations, setFilteredDonations] = useState(donations);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Filter donations based on search and filters
  React.useEffect(() => {
    let filtered = donations.filter(donation => {
      const matchesSearch = donation.donorName.toLowerCase().includes(searchText.toLowerCase()) ||
                           donation.email.toLowerCase().includes(searchText.toLowerCase()) ||
                           donation.transactionId.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || donation.category === categoryFilter;
      
      let matchesDate = true;
      if (dateRange && dateRange.length === 2) {
        const donationDate = new Date(donation.date);
        const [startDate, endDate] = dateRange;
        matchesDate = donationDate >= startDate && donationDate <= endDate;
      }
      
      return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });
    setFilteredDonations(filtered);
  }, [donations, searchText, statusFilter, categoryFilter, dateRange]);

  const totalAmount = donations
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);

  const pendingAmount = donations
    .filter(d => d.status === 'pending')
    .reduce((sum, d) => sum + d.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'General Donation': return 'blue';
      case 'Education Fund': return 'green';
      case 'Health Fund': return 'red';
      case 'Corporate Donation': return 'purple';
      default: return 'default';
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setDrawerVisible(true);
  };

  const handleApproveDonation = (donationId) => {
    setDonations(prev => prev.map(d => 
      d.id === donationId ? { ...d, status: 'completed' } : d
    ));
    message.success('Donation approved successfully!');
  };

  const handleExport = () => {
    message.info('Export functionality will be implemented here');
  };

  const columns = [
    {
      title: <span style={{ fontSize: '12px' }}>Donor</span>,
      dataIndex: 'donorName',
      key: 'donorName',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1890ff' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
        </div>
      ),
      sorter: (a, b) => a.donorName.localeCompare(b.donorName),
    },
    {
      title: <span style={{ fontSize: '12px' }}>Amount</span>,
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <Text strong style={{ color: '#52c41a', fontSize: '12px' }}>
          {formatCurrency(amount, record.currency)}
        </Text>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: <span style={{ fontSize: '12px' }}>Payment Method</span>,
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (text) => (
        <Text style={{ fontSize: '12px' }}>{text}</Text>
      ),
    },
    {
      title: <span style={{ fontSize: '12px' }}>Date</span>,
      dataIndex: 'date',
      key: 'date',
      render: (text, date) => (
        <Text style={{ fontSize: '12px' }}>
          {new Date(date).toLocaleDateString()}
        </Text>
      ),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: <span style={{ fontSize: '12px' }}>Transaction ID</span>,
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (id) => (
        <Text code copyable style={{ fontSize: '12px' }}>{id}</Text>
      ),
    },
    {
      title: <span style={{ fontSize: '12px' }}>Actions</span>,
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="primary" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => handleViewDonation(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="default" 
              size="small" 
              icon={<EditOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

    return (
    <div>
      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                value={donations.length}
                prefix={<BarChartOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Successful"
                value={donations.filter(d => d.status === 'completed').length}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* Controls */}
      <Card style={{ marginBottom: '2px', border: "none" }}>
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

      {/* Donations Table */}
        <Table
        style={{ border: "none"}}
          columns={columns}
          dataSource={filteredDonations}
          rowKey="id"
          size='small'

        />

      {/* Donation Details Drawer */}
      <Drawer
        title="Donation Details"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {selectedDonation && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Donor Name">
              {selectedDonation.donorName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedDonation.email}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              <Text strong style={{ color: '#52c41a', fontSize: '18px' }}>
                {formatCurrency(selectedDonation.amount, selectedDonation.currency)}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              <Tag color={getCategoryColor(selectedDonation.category)}>
                {selectedDonation.category}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {selectedDonation.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={getStatusColor(selectedDonation.status)}>
                {selectedDonation.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {new Date(selectedDonation.date).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Transaction ID">
              <Text code copyable>{selectedDonation.transactionId}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              {selectedDonation.message || 'No message provided'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

export default Donations; 
import React, { useState, useEffect } from 'react';
import { message, Typography, Tooltip, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import DonationsStatsCards from '../../components/DonationsStatsCards';
import DonationsFilters from '../../components/DonationsFilters';
import DonationsTable from '../../components/DonationsTable';
import DonationDetailsDrawer from '../../components/DonationDetailsDrawer';
import api from '../../utils/api';
const { Text } = Typography;

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);

  const [filteredDonations, setFilteredDonations] = useState(donations);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);


  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get('/donations');
      setDonations(res.data);
    } catch (err) {
      message.error("Failed to fetch members.");
    }
  };

  const formatCurrency = (amount, currency) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);

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

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setDrawerVisible(true);
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
      title: <span style={{ fontSize: '12px' }}>Date</span>,
      dataIndex: 'date',
      key: 'date',
      render: (text) => <Text style={{ fontSize: '12px' }}>{new Date(text).toLocaleDateString()}</Text>,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: <span style={{ fontSize: '12px' }}>Transaction ID</span>,
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (id) => <Text code copyable style={{ fontSize: '12px' }}>{id}</Text>,
    },
    {
      title: <span style={{ fontSize: '12px' }}>Actions</span>,
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="primary" size="small" icon={<EyeOutlined />} onClick={() => handleViewDonation(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="default" size="small" icon={<EditOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Filter logic
  useEffect(() => {
    let filtered = donations.filter(donation => {
      const matchesSearch =
        donation.donorName.toLowerCase().includes(searchText.toLowerCase()) ||
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

  return (
    <div>
      {/* Stats Cards */}
      <DonationsStatsCards
        totalAmount={donations.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.amount, 0)}
        pendingAmount={donations.filter(d => d.status === 'pending').reduce((sum, d) => sum + d.amount, 0)}
        totalDonations={donations.length}
        successfulDonations={donations.filter(d => d.status === 'completed').length}
        formatCurrency={formatCurrency}
      />
      {/* Filters */}
      <DonationsFilters
        searchText={searchText}
        setSearchText={setSearchText}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        setDateRange={setDateRange}
        handleExport={handleExport}
      />
      {/* Table */}
      <DonationsTable data={filteredDonations} columns={columns} />
      {/* Drawer */}
      <DonationDetailsDrawer
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        donation={selectedDonation}
        formatCurrency={formatCurrency}
        getCategoryColor={getCategoryColor}
        getStatusColor={getStatusColor}
      />
    </div>
  );
};

export default DonationsPage;

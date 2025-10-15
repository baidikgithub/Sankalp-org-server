import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Timeline, 
  Avatar, 
  Badge, 
  Statistic, 
  Progress,
  Tabs,
  List,
  Divider,
  Alert,
  DatePicker,
  Radio,
  Tooltip
} from 'antd';
import { 
  ExclamationCircleOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  UserOutlined, 
  MessageOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  BookOutlined,
  HomeOutlined,
  CarOutlined,
  TeamOutlined,
  EyeOutlined,
  EditOutlined,
  CloseCircleOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  DownloadOutlined,
  FilterOutlined,
  SearchOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Line, Column, Pie } from '@ant-design/charts';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const AdminAnalytics = () => {
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [volunteerModalVisible, setVolunteerModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [filterType, setFilterType] = useState('all');

  // Mock data for demonstration
  const mockRequests = [
    {
      id: 1,
      type: 'medical',
      title: 'Medical Emergency - Heart Attack',
      description: 'Elderly person experiencing chest pain',
      location: 'Near City Hospital, Sector 15',
      status: 'resolved',
      priority: 'high',
      timestamp: '2024-01-15 10:30:00',
      requester: 'John Doe',
      contact: '+91 98765 43210',
      volunteer: 'Dr. Sarah Johnson',
      volunteerId: 'vol_001',
      resolutionTime: '45 minutes',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: 2,
      type: 'food',
      title: 'Food Assistance Needed',
      description: 'Family of 4 needs immediate food supplies',
      location: 'Slum Area, Block A',
      status: 'active',
      priority: 'medium',
      timestamp: '2024-01-15 11:00:00',
      requester: 'Priya Sharma',
      contact: '+91 98765 43211',
      volunteer: 'Community Helper',
      volunteerId: 'vol_002',
      resolutionTime: null,
      coordinates: { lat: 28.6140, lng: 77.2091 }
    },
    {
      id: 3,
      type: 'education',
      title: 'Educational Support Required',
      description: 'Child needs school supplies and books',
      location: 'Rural Village, 20km from city',
      status: 'pending',
      priority: 'low',
      timestamp: '2024-01-15 12:00:00',
      requester: 'Rajesh Kumar',
      contact: '+91 98765 43212',
      volunteer: null,
      volunteerId: null,
      resolutionTime: null,
      coordinates: { lat: 28.6141, lng: 77.2092 }
    },
    {
      id: 4,
      type: 'shelter',
      title: 'Homeless Family Needs Shelter',
      description: 'Family with 2 children needs temporary shelter',
      location: 'Railway Station Area',
      status: 'resolved',
      priority: 'high',
      timestamp: '2024-01-14 15:30:00',
      requester: 'Meera Singh',
      contact: '+91 98765 43213',
      volunteer: 'Social Worker',
      volunteerId: 'vol_003',
      resolutionTime: '2 hours',
      coordinates: { lat: 28.6142, lng: 77.2093 }
    }
  ];

  const mockVolunteers = [
    {
      id: 'vol_001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+91 98765 43220',
      specialization: 'Medical',
      status: 'active',
      totalRequests: 15,
      resolvedRequests: 12,
      rating: 4.8,
      joinDate: '2023-06-15',
      lastActive: '2 minutes ago'
    },
    {
      id: 'vol_002',
      name: 'Community Helper',
      email: 'helper@email.com',
      phone: '+91 98765 43221',
      specialization: 'General',
      status: 'active',
      totalRequests: 8,
      resolvedRequests: 6,
      rating: 4.5,
      joinDate: '2023-08-20',
      lastActive: '5 minutes ago'
    },
    {
      id: 'vol_003',
      name: 'Social Worker',
      email: 'social.worker@email.com',
      phone: '+91 98765 43222',
      specialization: 'Social Work',
      status: 'active',
      totalRequests: 22,
      resolvedRequests: 20,
      rating: 4.9,
      joinDate: '2023-04-10',
      lastActive: '1 hour ago'
    }
  ];

  const mockAnalytics = {
    totalRequests: 156,
    resolvedRequests: 142,
    activeRequests: 8,
    urgentRequests: 6,
    totalVolunteers: 25,
    activeVolunteers: 18,
    averageResolutionTime: '2.5 hours',
    satisfactionRate: 94.2,
    requestsByType: [
      { type: 'Medical', count: 45, percentage: 28.8 },
      { type: 'Food', count: 38, percentage: 24.4 },
      { type: 'Education', count: 32, percentage: 20.5 },
      { type: 'Shelter', count: 25, percentage: 16.0 },
      { type: 'Transport', count: 16, percentage: 10.3 }
    ],
    requestsByStatus: [
      { status: 'Resolved', count: 142, percentage: 91.0 },
      { status: 'Active', count: 8, percentage: 5.1 },
      { status: 'Pending', count: 6, percentage: 3.9 }
    ],
    dailyRequests: [
      { date: '2024-01-09', count: 12 },
      { date: '2024-01-10', count: 18 },
      { date: '2024-01-11', count: 15 },
      { date: '2024-01-12', count: 22 },
      { date: '2024-01-13', count: 19 },
      { date: '2024-01-14', count: 25 },
      { date: '2024-01-15', count: 8 }
    ]
  };

  useEffect(() => {
    setRequests(mockRequests);
    setVolunteers(mockVolunteers);
    setAnalytics(mockAnalytics);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'red';
      case 'active': return 'orange';
      case 'pending': return 'blue';
      case 'resolved': return 'green';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'medical': return <MedicineBoxOutlined style={{ color: '#ff4d4f' }} />;
      case 'food': return <HeartOutlined style={{ color: '#52c41a' }} />;
      case 'education': return <BookOutlined style={{ color: '#1890ff' }} />;
      case 'shelter': return <HomeOutlined style={{ color: '#722ed1' }} />;
      case 'transport': return <CarOutlined style={{ color: '#fa8c16' }} />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#fa8c16';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const handleViewRequest = (record) => {
    setSelectedRequest(record);
    setRequestModalVisible(true);
  };

  const handleViewVolunteer = (record) => {
    setVolunteerModalVisible(true);
  };

  const requestColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Space>
          {getTypeIcon(type)}
          <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
        </Space>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <Text strong>{title}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.timestamp}
          </Text>
        </div>
      ),
    },
    {
      title: 'Requester',
      dataIndex: 'requester',
      key: 'requester',
      render: (requester, record) => (
        <div>
          <Text>{requester}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.contact}
          </Text>
        </div>
      ),
    },
    {
      title: 'Volunteer',
      dataIndex: 'volunteer',
      key: 'volunteer',
      render: (volunteer) => volunteer || <Text type="secondary">Unassigned</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div>
          <Badge 
            status={getStatusColor(status)} 
            text={status.toUpperCase()}
          />
          <br />
          <div 
            style={{ 
              width: '60px', 
              height: '4px', 
              background: getPriorityColor(record.priority),
              borderRadius: '2px',
              marginTop: '4px'
            }}
          />
        </div>
      ),
    },
    {
      title: 'Resolution Time',
      dataIndex: 'resolutionTime',
      key: 'resolutionTime',
      render: (time) => time || <Text type="secondary">-</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<EyeOutlined />}
          onClick={() => handleViewRequest(record)}
        >
          View
        </Button>
      ),
    },
  ];

  const volunteerColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <Text strong>{name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.specialization}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      key: 'email',
      render: (email, record) => (
        <div>
          <Text>{email}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.phone}
          </Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status.toUpperCase()}
        />
      ),
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_, record) => (
        <div>
          <Text>Requests: {record.totalRequests}</Text>
          <br />
          <Text type="secondary">Resolved: {record.resolvedRequests}</Text>
          <br />
          <Text type="secondary">Rating: {record.rating}/5</Text>
        </div>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<EyeOutlined />}
          onClick={() => handleViewVolunteer(record)}
        >
          View
        </Button>
      ),
    },
  ];

  // Chart configurations
  const requestsByTypeConfig = {
    data: analytics.requestsByType || [],
    angleField: 'count',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const dailyRequestsConfig = {
    data: analytics.dailyRequests || [],
    xField: 'date',
    yField: 'count',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  const requestsByStatusConfig = {
    data: analytics.requestsByStatus || [],
    xField: 'status',
    yField: 'count',
    color: ['#52c41a', '#fa8c16', '#1890ff'],
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <Layout style={{ background: '#f0f2f5', minHeight: '100vh', paddingTop: '80px' }}>
      <Content style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)', border: 'none' }}>
          <Row align="middle" justify="space-between">
            <Col>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                <BarChartOutlined style={{ marginRight: '12px' }} />
                Admin Analytics Dashboard
              </Title>
              <Paragraph style={{ color: 'white', margin: '8px 0 0 0', fontSize: '16px' }}>
                Monitor platform performance and volunteer activities
              </Paragraph>
            </Col>
            <Col>
              <Space>
                <RangePicker 
                  value={dateRange}
                  onChange={setDateRange}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)' }}
                />
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  Export Report
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Key Metrics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Total Requests"
                value={analytics.totalRequests}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Resolved Requests"
                value={analytics.resolvedRequests}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Active Volunteers"
                value={analytics.activeVolunteers}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Satisfaction Rate"
                value={analytics.satisfactionRate}
                suffix="%"
                prefix={<HeartOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} lg={12}>
            <Card title="Requests by Type" extra={<PieChartOutlined />}>
              <Pie {...requestsByTypeConfig} height={300} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Daily Requests Trend" extra={<LineChartOutlined />}>
              <Line {...dailyRequestsConfig} height={300} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} lg={12}>
            <Card title="Requests by Status" extra={<BarChartOutlined />}>
              <Column {...requestsByStatusConfig} height={300} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Performance Metrics">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>Resolution Rate</Text>
                    <Progress 
                      percent={Math.round((analytics.resolvedRequests / analytics.totalRequests) * 100)} 
                      strokeColor="#52c41a"
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>Average Resolution Time</Text>
                    <Text style={{ fontSize: '24px', color: '#1890ff', marginLeft: '16px' }}>
                      {analytics.averageResolutionTime}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Urgent Requests</Text>
                    <Text style={{ fontSize: '24px', color: '#ff4d4f', marginLeft: '16px' }}>
                      {analytics.urgentRequests}
                    </Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Data Tables */}
        <Card>
          <Tabs defaultActiveKey="requests">
            <TabPane tab="All Requests" key="requests">
              <div style={{ marginBottom: '16px' }}>
                <Space>
                  <Select 
                    value={filterType} 
                    onChange={setFilterType}
                    style={{ width: 200 }}
                    placeholder="Filter by type"
                  >
                    <Option value="all">All Types</Option>
                    <Option value="medical">Medical</Option>
                    <Option value="food">Food</Option>
                    <Option value="education">Education</Option>
                    <Option value="shelter">Shelter</Option>
                    <Option value="transport">Transport</Option>
                  </Select>
                  <Button icon={<SearchOutlined />}>Search</Button>
                  <Button icon={<FilterOutlined />}>Advanced Filter</Button>
                </Space>
              </div>
              <Table
                columns={requestColumns}
                dataSource={requests}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1000 }}
              />
            </TabPane>
            <TabPane tab="Volunteers" key="volunteers">
              <Table
                columns={volunteerColumns}
                dataSource={volunteers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
              />
            </TabPane>
          </Tabs>
        </Card>

        {/* Request Details Modal */}
        <Modal
          title="Request Details"
          open={requestModalVisible}
          onCancel={() => setRequestModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setRequestModalVisible(false)}>
              Close
            </Button>
          ]}
          width={800}
        >
          {selectedRequest && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card size="small">
                    <Row justify="space-between" align="top">
                      <Col flex="auto">
                        <Space>
                          {getTypeIcon(selectedRequest.type)}
                          <div>
                            <Title level={4} style={{ margin: 0 }}>
                              {selectedRequest.title}
                            </Title>
                            <Text type="secondary">{selectedRequest.description}</Text>
                          </div>
                        </Space>
                      </Col>
                      <Col>
                        <Badge 
                          status={getStatusColor(selectedRequest.status)} 
                          text={selectedRequest.status.toUpperCase()}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="Requester Information" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space>
                        <UserOutlined />
                        <Text strong>{selectedRequest.requester}</Text>
                      </Space>
                      <Space>
                        <PhoneOutlined />
                        <Text>{selectedRequest.contact}</Text>
                      </Space>
                      <Space>
                        <EnvironmentOutlined />
                        <Text>{selectedRequest.location}</Text>
                      </Space>
                    </Space>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="Request Details" size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space>
                        <ClockCircleOutlined />
                        <Text>Submitted: {selectedRequest.timestamp}</Text>
                      </Space>
                      <Space>
                        <Text>Priority:</Text>
                        <div 
                          style={{ 
                            width: '60px', 
                            height: '8px', 
                            background: getPriorityColor(selectedRequest.priority),
                            borderRadius: '4px'
                          }}
                        />
                        <Text>{selectedRequest.priority}</Text>
                      </Space>
                      {selectedRequest.volunteer && (
                        <Space>
                          <TeamOutlined />
                          <Text>Assigned to: {selectedRequest.volunteer}</Text>
                        </Space>
                      )}
                      {selectedRequest.resolutionTime && (
                        <Space>
                          <CheckCircleOutlined />
                          <Text>Resolved in: {selectedRequest.resolutionTime}</Text>
                        </Space>
                      )}
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        {/* Volunteer Details Modal */}
        <Modal
          title="Volunteer Details"
          open={volunteerModalVisible}
          onCancel={() => setVolunteerModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setVolunteerModalVisible(false)}>
              Close
            </Button>
          ]}
          width={600}
        >
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card size="small">
                  <Row align="middle">
                    <Col>
                      <Avatar size={64} icon={<UserOutlined />} />
                    </Col>
                    <Col style={{ marginLeft: '16px' }}>
                      <Title level={4} style={{ margin: 0 }}>Volunteer Name</Title>
                      <Text type="secondary">Medical Specialist</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="Contact Information" size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <PhoneOutlined />
                      <Text>+91 98765 43220</Text>
                    </Space>
                    <Space>
                      <MessageOutlined />
                      <Text>sarah.johnson@email.com</Text>
                    </Space>
                  </Space>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="Performance" size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <Text>Total Requests: 15</Text>
                    </Space>
                    <Space>
                      <Text>Resolved: 12</Text>
                    </Space>
                    <Space>
                      <Text>Rating: 4.8/5</Text>
                    </Space>
                    <Space>
                      <Text>Join Date: 2023-06-15</Text>
                    </Space>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default AdminAnalytics;









import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Alert, 
  Spin,
  Badge,
  Timeline,
  Avatar,
  Space,
  Divider,
  Statistic,
  Progress,
  Tabs,
  List,
  Drawer,
  Switch,
  Table,
  Tag,
  Tooltip,
  message,
  notification,
  DatePicker,
  InputNumber,
  Radio,
  Checkbox
} from 'antd';
import { 
  ExclamationCircleOutlined, 
  PhoneOutlined, 
  MessageOutlined, 
  EnvironmentOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SendOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  BookOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  CarOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  ShareAltOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StopOutlined,
  SyncOutlined,
  DownloadOutlined,
  UploadOutlined,
  PrinterOutlined,
  MailOutlined,
  PhoneFilled,
  MessageFilled,
  LocationFilled,
  UserAddOutlined,
  UserDeleteOutlined,
  TeamAddOutlined,
  TeamDeleteOutlined,
  CrownOutlined,
  StarOutlined,
  FireOutlined,
  BulbOutlined,
  RocketOutlined,
  ShieldOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  CloudOutlined,
  WifiOutlined,
  MobileOutlined,
  DesktopOutlined,
  TabletOutlined,
  LaptopOutlined,
  MonitorOutlined,
  CameraOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  FileTextOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FileZipOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  FolderAddOutlined,
  FolderDeleteOutlined,
  InboxOutlined,
  OutboxOutlined,
  SendOutlined as SendIcon,
  InboxOutlined as InboxIcon,
  OutboxOutlined as OutboxIcon,
  SendOutlined as SendIcon2,
  InboxOutlined as InboxIcon2,
  OutboxOutlined as OutboxIcon2
} from '@ant-design/icons';
import LocationTracking from '../../components/LocationTracking';
import RealTimeChat from '../../components/RealTimeChat';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const AdminEmergencyPortal = () => {
  const [loading, setLoading] = useState(false);
  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [volunteerModalVisible, setVolunteerModalVisible] = useState(false);
  const [analyticsModalVisible, setAnalyticsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [form] = Form.useForm();
  const [volunteerForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('overview');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true);
  const [location, setLocation] = useState(null);

  // Mock data for demonstration
  const [emergencyRequests, setEmergencyRequests] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'Medical Emergency - Heart Attack',
      description: 'Elderly person experiencing chest pain and shortness of breath',
      location: 'Near City Hospital, Sector 15',
      status: 'urgent',
      priority: 'high',
      timestamp: '2 minutes ago',
      requester: 'John Doe',
      contact: '+91 98765 43210',
      volunteer: 'Dr. Sarah Johnson',
      volunteerId: 'vol_001',
      volunteerContact: '+91 98765 43220',
      updates: [
        { text: 'Emergency reported', timestamp: '2 minutes ago', status: 'reported', user: 'System' },
        { text: 'Volunteer assigned', timestamp: '1 minute ago', status: 'assigned', user: 'Admin' },
        { text: 'Volunteer en route', timestamp: '30 seconds ago', status: 'in_progress', user: 'Dr. Sarah Johnson' }
      ],
      coordinates: { lat: 28.6139, lng: 77.2090 },
      estimatedArrival: '5 minutes',
      responseTime: '2 minutes',
      resolutionTime: null,
      severity: 'critical',
      category: 'medical',
      subcategory: 'cardiac',
      tags: ['elderly', 'chest-pain', 'breathing-issues'],
      attachments: [],
      notes: 'Patient is conscious but in distress. Family is present.',
      followUpRequired: true,
      followUpDate: '2024-01-15',
      followUpNotes: '',
      satisfaction: null,
      feedback: ''
    },
    {
      id: 2,
      type: 'food',
      title: 'Food Assistance Needed',
      description: 'Family of 4 needs immediate food supplies due to job loss',
      location: 'Slum Area, Block A',
      status: 'active',
      priority: 'medium',
      timestamp: '15 minutes ago',
      requester: 'Priya Sharma',
      contact: '+91 98765 43211',
      volunteer: 'Community Helper',
      volunteerId: 'vol_002',
      volunteerContact: '+91 98765 43221',
      updates: [
        { text: 'Request submitted', timestamp: '15 minutes ago', status: 'submitted', user: 'System' },
        { text: 'Volunteer assigned', timestamp: '10 minutes ago', status: 'assigned', user: 'Admin' },
        { text: 'Food supplies being arranged', timestamp: '5 minutes ago', status: 'in_progress', user: 'Community Helper' }
      ],
      coordinates: { lat: 28.6140, lng: 77.2091 },
      estimatedArrival: '20 minutes',
      responseTime: '5 minutes',
      resolutionTime: null,
      severity: 'moderate',
      category: 'food',
      subcategory: 'immediate-need',
      tags: ['family', 'job-loss', 'immediate-need'],
      attachments: [],
      notes: 'Family has children. Need nutritious food supplies.',
      followUpRequired: true,
      followUpDate: '2024-01-20',
      followUpNotes: '',
      satisfaction: null,
      feedback: ''
    },
    {
      id: 3,
      type: 'shelter',
      title: 'Homeless Family Needs Shelter',
      description: 'Family with 2 children needs temporary shelter for the night',
      location: 'Under Bridge, Railway Station',
      status: 'pending',
      priority: 'high',
      timestamp: '1 hour ago',
      requester: 'Anonymous',
      contact: '+91 98765 43212',
      volunteer: null,
      volunteerId: null,
      volunteerContact: null,
      updates: [
        { text: 'Request submitted', timestamp: '1 hour ago', status: 'submitted', user: 'System' }
      ],
      coordinates: { lat: 28.6141, lng: 77.2092 },
      estimatedArrival: null,
      responseTime: '1 hour',
      resolutionTime: null,
      severity: 'high',
      category: 'shelter',
      subcategory: 'temporary',
      tags: ['homeless', 'children', 'urgent'],
      attachments: [],
      notes: 'Family is currently under a bridge. Weather is cold.',
      followUpRequired: true,
      followUpDate: '2024-01-16',
      followUpNotes: '',
      satisfaction: null,
      feedback: ''
    }
  ]);

  const [volunteers, setVolunteers] = useState([
    {
      id: 'vol_001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+91 98765 43220',
      specialization: 'Emergency Medicine',
      experience: '8 years',
      rating: 4.9,
      status: 'available',
      location: { lat: 28.6140, lng: 77.2095 },
      currentRequests: 1,
      totalRequests: 156,
      responseTime: '3 minutes',
      availability: '24/7',
      skills: ['medical', 'emergency', 'cardiac', 'trauma'],
      languages: ['English', 'Hindi', 'Bengali'],
      certifications: ['MD Emergency Medicine', 'ACLS', 'BLS'],
      lastActive: '2 minutes ago',
      joinDate: '2023-01-15',
      notes: 'Excellent response time and medical expertise'
    },
    {
      id: 'vol_002',
      name: 'Community Helper',
      email: 'community.helper@example.com',
      phone: '+91 98765 43221',
      specialization: 'Community Service',
      experience: '5 years',
      rating: 4.7,
      status: 'busy',
      location: { lat: 28.6142, lng: 77.2093 },
      currentRequests: 1,
      totalRequests: 89,
      responseTime: '5 minutes',
      availability: '9 AM - 9 PM',
      skills: ['community', 'food', 'shelter', 'logistics'],
      languages: ['Hindi', 'English', 'Tamil'],
      certifications: ['Community Service Certificate', 'First Aid'],
      lastActive: '5 minutes ago',
      joinDate: '2023-03-20',
      notes: 'Reliable and always willing to help'
    },
    {
      id: 'vol_003',
      name: 'Emergency Responder',
      email: 'emergency.responder@example.com',
      phone: '+91 98765 43222',
      specialization: 'Emergency Response',
      experience: '12 years',
      rating: 4.8,
      status: 'available',
      location: { lat: 28.6143, lng: 77.2094 },
      currentRequests: 0,
      totalRequests: 234,
      responseTime: '2 minutes',
      availability: '24/7',
      skills: ['emergency', 'rescue', 'fire', 'disaster'],
      languages: ['English', 'Hindi', 'Telugu'],
      certifications: ['Emergency Response', 'Fire Safety', 'Disaster Management'],
      lastActive: '1 minute ago',
      joinDate: '2022-11-10',
      notes: 'Highly experienced in emergency situations'
    }
  ]);

  const [statistics, setStatistics] = useState({
    totalRequests: 1247,
    activeRequests: 12,
    resolvedToday: 8,
    averageResponseTime: '4.2 minutes',
    volunteerCount: 45,
    availableVolunteers: 12,
    emergencyMode: false,
    systemUptime: '99.9%',
    lastUpdated: '2 minutes ago'
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStatistics(prev => ({
        ...prev,
        lastUpdated: 'Just now'
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLocationUpdate = (newLocation) => {
    setLocation(newLocation);
  };

  const handleAssignVolunteer = async (requestId, volunteerId) => {
    try {
      setLoading(true);
      
      // Update request with volunteer assignment
      setEmergencyRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              volunteerId, 
              volunteer: volunteers.find(v => v.id === volunteerId)?.name,
              volunteerContact: volunteers.find(v => v.id === volunteerId)?.phone,
              status: 'assigned',
              updates: [
                ...req.updates,
                { 
                  text: `Volunteer assigned: ${volunteers.find(v => v.id === volunteerId)?.name}`, 
                  timestamp: 'Just now', 
                  status: 'assigned', 
                  user: 'Admin' 
                }
              ]
            }
          : req
      ));

      // Update volunteer status
      setVolunteers(prev => prev.map(vol => 
        vol.id === volunteerId 
          ? { ...vol, status: 'busy', currentRequests: vol.currentRequests + 1 }
          : vol
      ));

      message.success('Volunteer assigned successfully');
    } catch (error) {
      message.error('Failed to assign volunteer');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequestStatus = async (requestId, newStatus) => {
    try {
      setLoading(true);
      
      setEmergencyRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: newStatus,
              updates: [
                ...req.updates,
                { 
                  text: `Status updated to ${newStatus}`, 
                  timestamp: 'Just now', 
                  status: newStatus, 
                  user: 'Admin' 
                }
              ]
            }
          : req
      ));

      message.success('Request status updated successfully');
    } catch (error) {
      message.error('Failed to update request status');
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencySubmit = async (values) => {
    try {
      const emergencyData = {
        ...values,
        location: location,
        timestamp: new Date().toISOString(),
        status: 'urgent',
        priority: 'high',
        id: Date.now(),
        updates: [
          { text: 'Emergency reported', timestamp: 'Just now', status: 'reported', user: 'Admin' }
        ]
      };
      
      setEmergencyRequests(prev => [emergencyData, ...prev]);
      
      message.success('Emergency reported successfully');
      setEmergencyModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to report emergency');
    }
  };

  const handleVolunteerSubmit = async (values) => {
    try {
      const volunteerData = {
        ...values,
        id: `vol_${Date.now()}`,
        status: 'available',
        currentRequests: 0,
        totalRequests: 0,
        rating: 0,
        lastActive: 'Just now',
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      setVolunteers(prev => [...prev, volunteerData]);
      
      message.success('Volunteer added successfully');
      setVolunteerModalVisible(false);
      volunteerForm.resetFields();
    } catch (error) {
      message.error('Failed to add volunteer');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'red';
      case 'active': return 'orange';
      case 'pending': return 'blue';
      case 'resolved': return 'green';
      case 'cancelled': return 'gray';
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#ff4d4f';
      case 'high': return '#fa8c16';
      case 'moderate': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const requestColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <Text code>#{id}</Text>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type) => (
        <Space>
          {getTypeIcon(type)}
          <Text>{type ? type.toUpperCase() : 'N/A'}</Text>
        </Space>
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (title, record) => (
        <div>
          <Text strong>{title}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.requester} • {record.timestamp}
          </Text>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Badge 
          status={getStatusColor(status)} 
          text={status ? status.toUpperCase() : 'N/A'}
        />
      )
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority ? priority.toUpperCase() : 'N/A'}
        </Tag>
      )
    },
    {
      title: 'Volunteer',
      dataIndex: 'volunteer',
      key: 'volunteer',
      width: 150,
      render: (volunteer, record) => (
        volunteer ? (
          <Space>
            <Avatar size="small" icon={<UserOutlined />} />
            <div>
              <Text>{volunteer}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '11px' }}>
                {record.volunteerContact}
              </Text>
            </div>
          </Space>
        ) : (
          <Text type="secondary">Unassigned</Text>
        )
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => setSelectedRequest(record)}
            />
          </Tooltip>
          <Tooltip title="Assign Volunteer">
            <Button 
              type="text" 
              icon={<UserAddOutlined />} 
              onClick={() => setSelectedRequest(record)}
            />
          </Tooltip>
          <Tooltip title="Update Status">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => setSelectedRequest(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const volunteerColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <Text strong>{name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.specialization}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Badge 
          status={status === 'available' ? 'success' : status === 'busy' ? 'warning' : 'default'} 
          text={status.toUpperCase()}
        />
      )
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (rating) => (
        <Space>
          <StarOutlined style={{ color: '#faad14' }} />
          <Text>{rating}</Text>
        </Space>
      )
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      width: 100
    },
    {
      title: 'Current Requests',
      dataIndex: 'currentRequests',
      key: 'currentRequests',
      width: 120,
      render: (current, record) => (
        <Text>
          {current} / {record.totalRequests}
        </Text>
      )
    },
    {
      title: 'Response Time',
      dataIndex: 'responseTime',
      key: 'responseTime',
      width: 120
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      width: 120
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Profile">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => setSelectedVolunteer(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => setSelectedVolunteer(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ background: '#f0f2f5', minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
        {/* Header Section */}
        <Card style={{ 
          marginBottom: '24px', 
          background: emergencyMode 
            ? 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          border: 'none' 
        }}>
          <Row align="middle" justify="space-between">
            <Col>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                <SafetyCertificateOutlined style={{ marginRight: '12px' }} />
                Admin Emergency Portal
                {emergencyMode && (
                  <Badge 
                    status="error" 
                    text="EMERGENCY MODE" 
                    style={{ marginLeft: '16px' }}
                  />
                )}
              </Title>
              <Paragraph style={{ color: 'white', margin: '8px 0 0 0', fontSize: '16px' }}>
                Monitor and manage emergency requests and volunteer assignments
              </Paragraph>
            </Col>
            <Col>
              <Space size="large">
                <Button 
                  type="default" 
                  icon={<PlusOutlined />}
                  onClick={() => setEmergencyModalVisible(true)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
                >
                  Report Emergency
                </Button>
                <Button 
                  type="default" 
                  icon={<UserAddOutlined />}
                  onClick={() => setVolunteerModalVisible(true)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
                >
                  Add Volunteer
                </Button>
                <Button 
                  type="default" 
                  icon={<BarChartOutlined />}
                  onClick={() => setAnalyticsModalVisible(true)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
                >
                  Analytics
                </Button>
                <Button 
                  type="default" 
                  icon={<SettingOutlined />}
                  onClick={() => setSettingsModalVisible(true)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
                />
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Requests"
                value={statistics.totalRequests}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Active Requests"
                value={statistics.activeRequests}
                prefix={<ThunderboltOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Resolved Today"
                value={statistics.resolvedToday}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Avg Response Time"
                value={statistics.averageResponseTime}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Location Tracking */}
        <LocationTracking 
          onLocationUpdate={handleLocationUpdate}
          emergencyMode={emergencyMode}
          showVolunteers={true}
          adminView={true}
        />

        {/* Main Content Tabs */}
        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Overview" key="overview">
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card title="Recent Emergency Requests" size="small">
                    <List
                      dataSource={emergencyRequests.slice(0, 5)}
                      renderItem={(request) => (
                        <List.Item
                          actions={[
                            <Button 
                              type="link" 
                              size="small"
                              onClick={() => setSelectedRequest(request)}
                            >
                              View
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={getTypeIcon(request.type)}
                            title={
                              <Space>
                                <Text strong>{request.title}</Text>
                                <Badge 
                                  status={getStatusColor(request.status)} 
                                  text={request.status}
                                />
                              </Space>
                            }
                            description={
                              <div>
                                <Text type="secondary">{request.description}</Text>
                                <br />
                                <Space>
                                  <EnvironmentOutlined />
                                  <Text type="secondary">{request.location}</Text>
                                  <ClockCircleOutlined />
                                  <Text type="secondary">{request.timestamp}</Text>
                                </Space>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="Available Volunteers" size="small">
                    <List
                      dataSource={volunteers.filter(v => v.status === 'available').slice(0, 5)}
                      renderItem={(volunteer) => (
                        <List.Item
                          actions={[
                            <Button 
                              type="link" 
                              size="small"
                              onClick={() => setSelectedVolunteer(volunteer)}
                            >
                              View
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={
                              <Space>
                                <Text strong>{volunteer.name}</Text>
                                <Badge status="success" text="Available" />
                              </Space>
                            }
                            description={
                              <div>
                                <Text type="secondary">{volunteer.specialization}</Text>
                                <br />
                                <Space>
                                  <StarOutlined style={{ color: '#faad14' }} />
                                  <Text type="secondary">{volunteer.rating}</Text>
                                  <ClockCircleOutlined />
                                  <Text type="secondary">{volunteer.responseTime}</Text>
                                </Space>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Emergency Requests" key="requests">
              <div style={{ marginBottom: '16px' }}>
                <Space>
                  <Input 
                    placeholder="Search requests..." 
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select placeholder="Filter by status" style={{ width: 150 }}>
                    <Option value="all">All Status</Option>
                    <Option value="urgent">Urgent</Option>
                    <Option value="active">Active</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="resolved">Resolved</Option>
                  </Select>
                  <Select placeholder="Filter by type" style={{ width: 150 }}>
                    <Option value="all">All Types</Option>
                    <Option value="medical">Medical</Option>
                    <Option value="food">Food</Option>
                    <Option value="shelter">Shelter</Option>
                    <Option value="transport">Transport</Option>
                  </Select>
                  <Button icon={<ReloadOutlined />} />
                  <Button icon={<ExportOutlined />}>Export</Button>
                </Space>
              </div>
              <Table
                columns={requestColumns}
                dataSource={emergencyRequests}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                loading={loading}
                scroll={{ x: 1000 }}
              />
            </TabPane>

            <TabPane tab="Volunteers" key="volunteers">
              <div style={{ marginBottom: '16px' }}>
                <Space>
                  <Input 
                    placeholder="Search volunteers..." 
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                  />
                  <Select placeholder="Filter by status" style={{ width: 150 }}>
                    <Option value="all">All Status</Option>
                    <Option value="available">Available</Option>
                    <Option value="busy">Busy</Option>
                    <Option value="offline">Offline</Option>
                  </Select>
                  <Select placeholder="Filter by specialization" style={{ width: 200 }}>
                    <Option value="all">All Specializations</Option>
                    <Option value="medical">Medical</Option>
                    <Option value="community">Community Service</Option>
                    <Option value="emergency">Emergency Response</Option>
                  </Select>
                  <Button icon={<ReloadOutlined />} />
                  <Button icon={<ExportOutlined />}>Export</Button>
                </Space>
              </div>
              <Table
                columns={volunteerColumns}
                dataSource={volunteers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                loading={loading}
                scroll={{ x: 1000 }}
              />
            </TabPane>

            <TabPane tab="Analytics" key="analytics">
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card title="Request Trends" size="small">
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Text type="secondary">Chart placeholder - Request trends over time</Text>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="Response Time Analysis" size="small">
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Text type="secondary">Chart placeholder - Response time analysis</Text>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="Volunteer Performance" size="small">
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Text type="secondary">Chart placeholder - Volunteer performance metrics</Text>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="Geographic Distribution" size="small">
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Text type="secondary">Chart placeholder - Geographic distribution of requests</Text>
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>

        {/* Emergency Modal */}
        <Modal
          title="Report Emergency"
          open={emergencyModalVisible}
          onCancel={() => setEmergencyModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} onFinish={handleEmergencySubmit} layout="vertical">
            <Form.Item
              name="type"
              label="Emergency Type"
              rules={[{ required: true, message: 'Please select emergency type' }]}
            >
              <Select placeholder="Select emergency type">
                <Option value="medical">Medical Emergency</Option>
                <Option value="fire">Fire Emergency</Option>
                <Option value="accident">Accident</Option>
                <Option value="crime">Crime/Safety</Option>
                <Option value="natural">Natural Disaster</Option>
                <Option value="other">Other Emergency</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="title"
              label="Emergency Title"
              rules={[{ required: true, message: 'Please provide a title' }]}
            >
              <Input placeholder="Brief title for the emergency" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Emergency Description"
              rules={[{ required: true, message: 'Please describe the emergency' }]}
            >
              <TextArea rows={4} placeholder="Describe the emergency situation in detail..." />
            </Form.Item>
            
            <Form.Item
              name="severity"
              label="Severity Level"
              rules={[{ required: true, message: 'Please select severity level' }]}
            >
              <Radio.Group>
                <Radio value="critical">Critical</Radio>
                <Radio value="high">High</Radio>
                <Radio value="moderate">Moderate</Radio>
                <Radio value="low">Low</Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              name="contact"
              label="Contact Number"
              rules={[{ required: true, message: 'Please provide contact number' }]}
            >
              <Input placeholder="Contact number for this emergency" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" danger>
                <ExclamationCircleOutlined /> Report Emergency
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Volunteer Modal */}
        <Modal
          title="Add Volunteer"
          open={volunteerModalVisible}
          onCancel={() => setVolunteerModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={volunteerForm} onFinish={handleVolunteerSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter full name' }]}
                >
                  <Input placeholder="Enter full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter email' }]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="specialization"
                  label="Specialization"
                  rules={[{ required: true, message: 'Please enter specialization' }]}
                >
                  <Input placeholder="e.g., Emergency Medicine" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name="experience"
              label="Years of Experience"
              rules={[{ required: true, message: 'Please enter years of experience' }]}
            >
              <InputNumber placeholder="Enter years of experience" style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="skills"
              label="Skills"
              rules={[{ required: true, message: 'Please select skills' }]}
            >
              <Checkbox.Group>
                <Checkbox value="medical">Medical</Checkbox>
                <Checkbox value="emergency">Emergency Response</Checkbox>
                <Checkbox value="community">Community Service</Checkbox>
                <Checkbox value="logistics">Logistics</Checkbox>
                <Checkbox value="counseling">Counseling</Checkbox>
                <Checkbox value="technical">Technical</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            
            <Form.Item
              name="availability"
              label="Availability"
              rules={[{ required: true, message: 'Please select availability' }]}
            >
              <Select placeholder="Select availability">
                <Option value="24/7">24/7</Option>
                <Option value="9 AM - 9 PM">9 AM - 9 PM</Option>
                <Option value="Weekends Only">Weekends Only</Option>
                <Option value="Evenings Only">Evenings Only</Option>
                <Option value="Custom">Custom Schedule</Option>
              </Select>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                <UserAddOutlined /> Add Volunteer
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Request Details Modal */}
        <Modal
          title={`Emergency Request #${selectedRequest?.id}`}
          open={!!selectedRequest}
          onCancel={() => setSelectedRequest(null)}
          footer={null}
          width={800}
        >
          {selectedRequest && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card size="small" title="Request Details">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>Type:</Text> <Text>{selectedRequest.type.toUpperCase()}</Text>
                      </div>
                      <div>
                        <Text strong>Title:</Text> <Text>{selectedRequest.title}</Text>
                      </div>
                      <div>
                        <Text strong>Description:</Text> <Text>{selectedRequest.description}</Text>
                      </div>
                      <div>
                        <Text strong>Location:</Text> <Text>{selectedRequest.location}</Text>
                      </div>
                      <div>
                        <Text strong>Requester:</Text> <Text>{selectedRequest.requester}</Text>
                      </div>
                      <div>
                        <Text strong>Contact:</Text> <Text>{selectedRequest.contact}</Text>
                      </div>
                      <div>
                        <Text strong>Status:</Text> 
                        <Badge 
                          status={getStatusColor(selectedRequest.status)} 
                          text={selectedRequest.status.toUpperCase()}
                          style={{ marginLeft: '8px' }}
                        />
                      </div>
                      <div>
                        <Text strong>Priority:</Text> 
                        <Tag color={getPriorityColor(selectedRequest.priority)} style={{ marginLeft: '8px' }}>
                          {selectedRequest.priority.toUpperCase()}
                        </Tag>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="Volunteer Assignment">
                    {selectedRequest.volunteer ? (
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                          <Text strong>Assigned Volunteer:</Text> <Text>{selectedRequest.volunteer}</Text>
                        </div>
                        <div>
                          <Text strong>Contact:</Text> <Text>{selectedRequest.volunteerContact}</Text>
                        </div>
                        <div>
                          <Text strong>Estimated Arrival:</Text> <Text>{selectedRequest.estimatedArrival}</Text>
                        </div>
                        <div>
                          <Text strong>Response Time:</Text> <Text>{selectedRequest.responseTime}</Text>
                        </div>
                        <Space>
                          <Button 
                            type="primary" 
                            size="small"
                            onClick={() => handleUpdateRequestStatus(selectedRequest.id, 'resolved')}
                          >
                            Mark Resolved
                          </Button>
                          <Button 
                            size="small"
                            onClick={() => setSelectedRequest(null)}
                          >
                            Reassign
                          </Button>
                        </Space>
                      </Space>
                    ) : (
                      <div>
                        <Text type="secondary">No volunteer assigned</Text>
                        <br />
                        <Button 
                          type="primary" 
                          size="small"
                          onClick={() => setSelectedRequest(null)}
                        >
                          Assign Volunteer
                        </Button>
                      </div>
                    )}
                  </Card>
                </Col>
              </Row>
              
              <Card size="small" title="Timeline" style={{ marginTop: '16px' }}>
                <Timeline
                  items={selectedRequest.updates.map(update => ({
                    color: getStatusColor(update.status),
                    children: (
                      <div>
                        <Text strong>{update.text}</Text>
                        <br />
                        <Text type="secondary">
                          {update.timestamp} • {update.user}
                        </Text>
                      </div>
                    )
                  }))}
                />
              </Card>
            </div>
          )}
        </Modal>

        {/* Volunteer Details Modal */}
        <Modal
          title={`Volunteer Profile - ${selectedVolunteer?.name}`}
          open={!!selectedVolunteer}
          onCancel={() => setSelectedVolunteer(null)}
          footer={null}
          width={600}
        >
          {selectedVolunteer && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card size="small" title="Personal Information">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>Name:</Text> <Text>{selectedVolunteer.name}</Text>
                      </div>
                      <div>
                        <Text strong>Email:</Text> <Text>{selectedVolunteer.email}</Text>
                      </div>
                      <div>
                        <Text strong>Phone:</Text> <Text>{selectedVolunteer.phone}</Text>
                      </div>
                      <div>
                        <Text strong>Specialization:</Text> <Text>{selectedVolunteer.specialization}</Text>
                      </div>
                      <div>
                        <Text strong>Experience:</Text> <Text>{selectedVolunteer.experience}</Text>
                      </div>
                      <div>
                        <Text strong>Rating:</Text> 
                        <Space style={{ marginLeft: '8px' }}>
                          <StarOutlined style={{ color: '#faad14' }} />
                          <Text>{selectedVolunteer.rating}</Text>
                        </Space>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card size="small" title="Performance Metrics">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic
                          title="Total Requests"
                          value={selectedVolunteer.totalRequests}
                          valueStyle={{ color: '#1890ff' }}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Current Requests"
                          value={selectedVolunteer.currentRequests}
                          valueStyle={{ color: '#fa8c16' }}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Response Time"
                          value={selectedVolunteer.responseTime}
                          valueStyle={{ color: '#52c41a' }}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card size="small" title="Skills & Certifications">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>Skills:</Text>
                        <div style={{ marginTop: '8px' }}>
                          {selectedVolunteer.skills.map(skill => (
                            <Tag key={skill} style={{ marginBottom: '4px' }}>{skill}</Tag>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Text strong>Languages:</Text>
                        <div style={{ marginTop: '8px' }}>
                          {selectedVolunteer.languages.map(lang => (
                            <Tag key={lang} color="blue" style={{ marginBottom: '4px' }}>{lang}</Tag>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Text strong>Certifications:</Text>
                        <div style={{ marginTop: '8px' }}>
                          {selectedVolunteer.certifications.map(cert => (
                            <Tag key={cert} color="green" style={{ marginBottom: '4px' }}>{cert}</Tag>
                          ))}
                        </div>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        {/* Settings Modal */}
        <Modal
          title="Emergency Portal Settings"
          open={settingsModalVisible}
          onCancel={() => setSettingsModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={settingsForm} layout="vertical">
            <Card title="System Settings" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <ExclamationCircleOutlined />
                    <Text>Emergency Mode</Text>
                  </Space>
                  <Switch 
                    checked={emergencyMode}
                    onChange={setEmergencyMode}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <BellOutlined />
                    <Text>Push Notifications</Text>
                  </Space>
                  <Switch 
                    checked={notificationsEnabled}
                    onChange={setNotificationsEnabled}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <UserAddOutlined />
                    <Text>Auto-assign Volunteers</Text>
                  </Space>
                  <Switch 
                    checked={autoAssignEnabled}
                    onChange={setAutoAssignEnabled}
                  />
                </div>
              </Space>
            </Card>

            <Card title="Response Settings" size="small" style={{ marginTop: '16px' }}>
              <Form.Item label="Default Response Time (minutes)">
                <InputNumber 
                  min={1} 
                  max={60} 
                  defaultValue={5} 
                  style={{ width: '100%' }} 
                />
              </Form.Item>
              <Form.Item label="Emergency Escalation Time (minutes)">
                <InputNumber 
                  min={1} 
                  max={30} 
                  defaultValue={10} 
                  style={{ width: '100%' }} 
                />
              </Form.Item>
            </Card>

            <Form.Item style={{ marginTop: '24px' }}>
              <Button type="primary" htmlType="submit" block>
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default AdminEmergencyPortal;


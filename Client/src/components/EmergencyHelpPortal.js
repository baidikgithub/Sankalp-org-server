import React, { useState, useEffect, useRef } from 'react';
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
  message
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
  ShareAltOutlined
} from '@ant-design/icons';
import io from 'socket.io-client';
import LocationTracking from './LocationTracking';
import RealTimeChat from './RealTimeChat';
import { getCurrentUser, getUserDisplayName } from '../utils/auth';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const EmergencyHelpPortal = () => {
  const [location, setLocation] = useState(null);
  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [chatDrawerVisible, setChatDrawerVisible] = useState(false);
  const [settingsDrawerVisible, setSettingsDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [helpForm] = Form.useForm();
  const [activeRequests, setActiveRequests] = useState([]);
  const [userRole, setUserRole] = useState('user');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Socket.IO and chat state
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isAdminOnline, setIsAdminOnline] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const socketRef = useRef(null);

  // Mock data for demonstration
  const mockRequests = [
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
      updates: [
        { text: 'Emergency reported', timestamp: '2 minutes ago', status: 'reported' },
        { text: 'Volunteer assigned', timestamp: '1 minute ago', status: 'assigned' }
      ],
      coordinates: { lat: 28.6139, lng: 77.2090 }
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
      updates: [
        { text: 'Request submitted', timestamp: '15 minutes ago', status: 'submitted' },
        { text: 'Volunteer assigned', timestamp: '10 minutes ago', status: 'assigned' },
        { text: 'Food supplies being arranged', timestamp: '5 minutes ago', status: 'in_progress' }
      ],
      coordinates: { lat: 28.6140, lng: 77.2091 }
    }
  ];

  useEffect(() => {
    setActiveRequests(mockRequests);
    const role = localStorage.getItem('userRole') || 'user';
    setUserRole(role);
    
    // Get user information from authentication
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserId(currentUser.id);
      setUserName(getUserDisplayName(currentUser));
    } else {
      // Fallback for non-authenticated users
      const fallbackUserId = `user_${Date.now()}`;
      const fallbackUserName = 'Anonymous User';
      setUserId(fallbackUserId);
      setUserName(fallbackUserName);
      localStorage.setItem('userId', fallbackUserId);
      localStorage.setItem('userName', fallbackUserName);
    }
    
    // Check for emergency mode in URL params
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('emergency') === 'true') {
      setEmergencyMode(true);
      setEmergencyModalVisible(true);
    }
  }, []);

  // Socket.IO initialization and chat functionality
  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001', {
      transports: ['websocket', 'polling'],
      autoConnect: true
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    // Connection events
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      
      // Join user room
      newSocket.emit('joinUserRoom', { 
        userId: userId, 
        userName: userName || 'Anonymous User'
      });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setIsAdminOnline(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    // Chat events
    newSocket.on('receiveMessage', (data) => {
      console.log('Received message:', data);
      setChatMessages(prev => [...prev, {
        id: data.messageId || Date.now(),
        text: data.message,
        sender: 'admin',
        senderId: data.senderId,
        senderName: data.senderName || 'Admin',
        timestamp: data.timestamp || new Date().toISOString(),
        type: 'text',
        status: 'delivered',
        isEmergency: data.isEmergency || false
      }]);
    });

    newSocket.on('adminOnline', (data) => {
      console.log('Admin is online:', data);
      setIsAdminOnline(true);
      setAdminId(data.adminId);
      setAdminInfo({
        id: data.adminId,
        name: data.adminName || 'Admin',
        status: 'online',
        lastSeen: 'now'
      });
    });

    newSocket.on('adminOffline', () => {
      console.log('Admin is offline');
      setIsAdminOnline(false);
      setAdminInfo(prev => prev ? { ...prev, status: 'offline', lastSeen: 'just now' } : null);
    });

    newSocket.on('messageStatus', (data) => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === data.messageId 
          ? { ...msg, status: data.status }
          : msg
      ));
    });

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [userId]);

  // Send message function
  const sendMessage = (messageText, isEmergency = false) => {
    if (!socket || !isConnected || !messageText.trim()) return;

    const messageData = {
      senderId: userId,
      receiverId: 'admin', // Always send to admin
      message: messageText,
      timestamp: new Date().toISOString(),
      isEmergency: isEmergency || emergencyMode,
      senderName: userName || 'Anonymous User',
      userEmail: (getCurrentUser()?.email) || localStorage.getItem('userEmail') || '',
      userPhone: localStorage.getItem('userPhone') || '',
      location: location || 'Unknown Location',
      priority: emergencyMode ? 'urgent' : 'medium'
    };

    // Add message to local state immediately
    const tempMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      senderId: userId,
      senderName: 'You',
      timestamp: messageData.timestamp,
      type: 'text',
      status: 'sending',
      isEmergency: isEmergency || emergencyMode
    };

    setChatMessages(prev => [...prev, tempMessage]);

    // Send to server
    socket.emit('sendMessage', messageData);

    // Update status to delivered after a short delay
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: 'delivered' }
          : msg
      ));
    }, 1000);
  };

  const handleLocationUpdate = (newLocation) => {
    setLocation(newLocation);
  };

  const handleEmergencySubmit = async (values) => {
    try {
      const emergencyData = {
        ...values,
        location: location,
        timestamp: new Date().toISOString(),
        status: 'urgent',
        priority: 'high'
      };
      
      console.log('Emergency Report:', emergencyData);
      
      // Here you would send to your backend API
      // await fetch('/api/emergency', { method: 'POST', body: JSON.stringify(emergencyData) });
      
      Modal.success({
        title: 'Emergency Reported Successfully',
        content: 'Your emergency has been reported and volunteers are being notified.',
      });
      
      setEmergencyModalVisible(false);
      form.resetFields();
      setEmergencyMode(true);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to report emergency. Please try again.',
      });
    }
  };

  const handleHelpSubmit = async (values) => {
    try {
      const helpData = {
        ...values,
        location: location,
        timestamp: new Date().toISOString(),
        status: 'pending',
        priority: 'medium'
      };
      
      console.log('Help Request:', helpData);
      
      // Here you would send to your backend API
      // await fetch('/api/help-request', { method: 'POST', body: JSON.stringify(helpData) });
      
      Modal.success({
        title: 'Help Request Submitted',
        content: 'Your request has been submitted and volunteers will respond soon.',
      });
      
      setHelpModalVisible(false);
      helpForm.resetFields();
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to submit help request. Please try again.',
      });
    }
  };

  const handleMessageSent = (message) => {
    console.log('Message sent:', message);
    // Send message through Socket.IO
    sendMessage(message.text, message.isEmergency);
  };

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

  return (
    <Layout style={{ background: '#f0f2f5', minHeight: '100vh', paddingTop: '0px' }}>
      <Content style={{ padding: '0px', maxWidth: '1900px', margin: '0 auto' }}>
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
                Emergency Help Portal
                {emergencyMode && (
                  <Badge 
                    status="error" 
                    text="EMERGENCY MODE" 
                    style={{ marginLeft: '16px' }}
                  />
                )}
              </Title>
              <Paragraph style={{ color: 'white', margin: '8px 0 0 0', fontSize: '16px' }}>
                Get immediate help or report emergencies with location tracking
              </Paragraph>
            </Col>
            <Col>
              <Space size="large">
                <Statistic
                  title="Active Requests"
                  value={activeRequests.filter(r => r.status !== 'resolved').length}
                  valueStyle={{ color: 'white' }}
                />
                <Statistic
                  title="Volunteers Online"
                  value={12}
                  valueStyle={{ color: 'white' }}
                />
                <Button 
                  type="default" 
                  icon={<SettingOutlined />}
                  onClick={() => setSettingsDrawerVisible(true)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
                />
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Location Tracking */}
        <LocationTracking 
          onLocationUpdate={handleLocationUpdate}
          emergencyMode={emergencyMode}
          showVolunteers={true}
        />

        {/* Quick Actions */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card 
              hoverable
              style={{ 
                textAlign: 'center', 
                background: emergencyMode ? '#ff7875' : '#ff4d4f', 
                color: 'white',
                transform: emergencyMode ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setEmergencyModalVisible(true)}
            >
              <ExclamationCircleOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <Title level={4} style={{ color: 'white', margin: 0 }}>SOS Emergency</Title>
              <Text style={{ color: 'white' }}>Report immediate emergency</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              hoverable
              style={{ textAlign: 'center', background: '#1890ff', color: 'white' }}
              onClick={() => setHelpModalVisible(true)}
            >
              <TeamOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <Title level={4} style={{ color: 'white', margin: 0 }}>Request Help</Title>
              <Text style={{ color: 'white' }}>Ask for assistance</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              hoverable
              style={{ textAlign: 'center', background: '#52c41a', color: 'white' }}
              onClick={() => setChatDrawerVisible(true)}
            >
              <MessageOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <Title level={4} style={{ color: 'white', margin: 0 }}>Live Chat</Title>
              <Text style={{ color: 'white' }}>Chat with volunteers</Text>
            </Card>
          </Col>
        </Row>

        {/* Active Requests */}
        <Card title="Active Requests" style={{ marginBottom: '24px' }}>
          <Row gutter={[16, 16]}>
            {activeRequests.map((request) => (
              <Col xs={24} lg={12} key={request.id}>
                <Card 
                  size="small" 
                  style={{ 
                    borderLeft: `4px solid ${getPriorityColor(request.priority)}`,
                    marginBottom: '8px'
                  }}
                >
                  <Row justify="space-between" align="top">
                    <Col flex="auto">
                      <Space>
                        {getTypeIcon(request.type)}
                        <div>
                          <Text strong>{request.title}</Text>
                          <br />
                          <Text type="secondary">{request.description}</Text>
                          <br />
                          <Space>
                            <EnvironmentOutlined />
                            <Text type="secondary">{request.location}</Text>
                          </Space>
                        </div>
                      </Space>
                    </Col>
                    <Col>
                      <Badge 
                        status={getStatusColor(request.status)} 
                        text={request.status.toUpperCase()}
                      />
                    </Col>
                  </Row>
                  <Divider style={{ margin: '12px 0' }} />
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <ClockCircleOutlined />
                        <Text type="secondary">{request.timestamp}</Text>
                      </Space>
                    </Col>
                    <Col>
                      {request.volunteer ? (
                        <Space>
                          <Avatar size="small" icon={<UserOutlined />} />
                          <Text type="secondary">{request.volunteer}</Text>
                        </Space>
                      ) : (
                        <Text type="secondary">No volunteer assigned</Text>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
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
              name="description"
              label="Emergency Description"
              rules={[{ required: true, message: 'Please describe the emergency' }]}
            >
              <TextArea rows={4} placeholder="Describe the emergency situation in detail..." />
            </Form.Item>
            
            <Form.Item
              name="contact"
              label="Contact Number"
              rules={[{ required: true, message: 'Please provide contact number' }]}
            >
              <Input placeholder="Your contact number" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" danger>
                <ExclamationCircleOutlined /> Report Emergency
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Help Request Modal */}
        <Modal
          title="Request Help"
          open={helpModalVisible}
          onCancel={() => setHelpModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={helpForm} onFinish={handleHelpSubmit} layout="vertical">
            <Form.Item
              name="category"
              label="Help Category"
              rules={[{ required: true, message: 'Please select help category' }]}
            >
              <Select placeholder="Select help category">
                <Option value="food">Food Assistance</Option>
                <Option value="education">Educational Support</Option>
                <Option value="medical">Medical Help</Option>
                <Option value="shelter">Shelter/Housing</Option>
                <Option value="transport">Transportation</Option>
                <Option value="financial">Financial Aid</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="title"
              label="Request Title"
              rules={[{ required: true, message: 'Please provide a title' }]}
            >
              <Input placeholder="Brief title for your request" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Detailed Description"
              rules={[{ required: true, message: 'Please describe your needs' }]}
            >
              <TextArea rows={4} placeholder="Describe what help you need..." />
            </Form.Item>
            
            <Form.Item
              name="urgency"
              label="Urgency Level"
              rules={[{ required: true, message: 'Please select urgency level' }]}
            >
              <Select placeholder="Select urgency level">
                <Option value="low">Low - Can wait a few days</Option>
                <Option value="medium">Medium - Needed within 24 hours</Option>
                <Option value="high">High - Needed immediately</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="contact"
              label="Contact Number"
              rules={[{ required: true, message: 'Please provide contact number' }]}
            >
              <Input placeholder="Your contact number" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                <TeamOutlined /> Submit Help Request
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Chat Drawer */}
        <Drawer
          title={
            <div>
              <MessageOutlined style={{ marginRight: '8px' }} />
              Live Chat with Admin
              {!isConnected && (
                <Badge 
                  status="error" 
                  text="Disconnected" 
                  style={{ marginLeft: '12px' }}
                />
              )}
              {isConnected && !isAdminOnline && (
                <Badge 
                  status="warning" 
                  text="Admin Offline" 
                  style={{ marginLeft: '12px' }}
                />
              )}
              {isConnected && isAdminOnline && (
                <Badge 
                  status="success" 
                  text="Admin Online" 
                  style={{ marginLeft: '12px' }}
                />
              )}
            </div>
          }
          placement="right"
          onClose={() => setChatDrawerVisible(false)}
          open={chatDrawerVisible}
          width={500}
        >
          {adminInfo && (
            <Card size="small" style={{ marginBottom: '16px' }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Space>
                    <Avatar 
                      size={40} 
                      icon={<UserOutlined />}
                      style={{ background: '#1890ff' }}
                    />
                    <div>
                      <Text strong>{adminInfo.name}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        Emergency Response Admin
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Badge 
                      status={adminInfo.status === 'online' ? 'success' : 'default'} 
                      text={adminInfo.status}
                    />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {adminInfo.lastSeen}
                    </Text>
                  </Space>
                </Col>
              </Row>
              
              {emergencyMode && (
                <div style={{ marginTop: '8px' }}>
                  <Badge 
                    color="red" 
                    text="EMERGENCY CHAT - HIGH PRIORITY"
                    style={{ fontSize: '12px' }}
                  />
                </div>
              )}
            </Card>
          )}

          <RealTimeChat 
            requestId={selectedRequest?.id}
            volunteerId={adminId}
            isEmergency={emergencyMode}
            onMessageSent={handleMessageSent}
            showVolunteerInfo={false}
            messages={chatMessages}
            isAdminChat={true}
            adminInfo={adminInfo}
            isConnected={isConnected}
            isAdminOnline={isAdminOnline}
          />
        </Drawer>

        {/* Settings Drawer */}
        <Drawer
          title="Settings"
          placement="right"
          onClose={() => setSettingsDrawerVisible(false)}
          open={settingsDrawerVisible}
          width={400}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card title="Notifications" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
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
                    <MessageOutlined />
                    <Text>SMS Alerts</Text>
                  </Space>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <PhoneOutlined />
                    <Text>Emergency Calls</Text>
                  </Space>
                  <Switch defaultChecked />
                </div>
              </Space>
            </Card>

            <Card title="Emergency Mode" size="small">
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
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  When enabled, all requests are treated as high priority and volunteers are immediately notified.
                </Text>
              </Space>
            </Card>

            <Card title="Privacy" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <ShareAltOutlined />
                    <Text>Share Location</Text>
                  </Space>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <UserOutlined />
                    <Text>Anonymous Mode</Text>
                  </Space>
                  <Switch />
                </div>
              </Space>
            </Card>
          </Space>
        </Drawer>
      </Content>
    </Layout>
  );
};

export default EmergencyHelpPortal;


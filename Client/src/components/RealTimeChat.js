import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Input, 
  List, 
  Avatar, 
  Space, 
  Badge, 
  Tooltip,
  Modal,
  Form,
  Select,
  Upload,
  Image,
  Divider,
  Row,
  Col,
  Tag,
  Spin
} from 'antd';
import { 
  SendOutlined, 
  PaperClipOutlined, 
  PhoneOutlined, 
  VideoCameraOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  CameraOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const RealTimeChat = ({ 
  requestId = null, 
  volunteerId = null, 
  isEmergency = false,
  onMessageSent = null,
  showVolunteerInfo = true,
  messages = null,
  isAdminChat = false,
  adminInfo = null,
  isConnected = true,
  isAdminOnline = false
}) => {
  const [localMessages, setLocalMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [form] = Form.useForm();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Mock data for demonstration
  const mockVolunteerInfo = {
    id: 'vol_001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Medical Emergency',
    status: 'online',
    avatar: null,
    rating: 4.8,
    totalHelped: 156,
    responseTime: '2 minutes'
  };

  const mockMessages = [
    {
      id: 1,
      text: 'Hello! I\'m Dr. Sarah Johnson, your assigned volunteer. How can I help you?',
      sender: 'volunteer',
      senderId: 'vol_001',
      senderName: 'Dr. Sarah Johnson',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'text',
      status: 'delivered',
      isEmergency: false
    },
    {
      id: 2,
      text: 'Hi Dr. Johnson, I need urgent medical help. I\'m experiencing severe chest pain.',
      sender: 'user',
      senderId: 'user_001',
      senderName: 'John Doe',
      timestamp: '2024-01-15T10:31:00Z',
      type: 'text',
      status: 'delivered',
      isEmergency: true
    },
    {
      id: 3,
      text: 'I understand this is urgent. Can you tell me more about the pain? Is it sharp or dull?',
      sender: 'volunteer',
      senderId: 'vol_001',
      senderName: 'Dr. Sarah Johnson',
      timestamp: '2024-01-15T10:31:30Z',
      type: 'text',
      status: 'delivered',
      isEmergency: false
    },
    {
      id: 4,
      text: 'It\'s a sharp, stabbing pain in the center of my chest. It started about 10 minutes ago.',
      sender: 'user',
      senderId: 'user_001',
      senderName: 'John Doe',
      timestamp: '2024-01-15T10:32:00Z',
      type: 'text',
      status: 'delivered',
      isEmergency: true
    },
    {
      id: 5,
      text: 'This sounds serious. I\'m alerting emergency services and arranging immediate medical assistance. Please stay calm and try to sit down.',
      sender: 'volunteer',
      senderId: 'vol_001',
      senderName: 'Dr. Sarah Johnson',
      timestamp: '2024-01-15T10:32:15Z',
      type: 'text',
      status: 'delivered',
      isEmergency: true
    }
  ];

  useEffect(() => {
    if (isAdminChat) {
      // Use messages from parent component for admin chat
      setLocalMessages(messages || []);
      setVolunteerInfo(adminInfo);
    } else {
      // Initialize chat with mock data for volunteer chat
      setLocalMessages(mockMessages);
      setVolunteerInfo(mockVolunteerInfo);
      
      // Simulate real-time updates for volunteer chat
      const interval = setInterval(() => {
        if (Math.random() > 0.95 && localMessages.length > 0) {
          const lastMessage = localMessages[localMessages.length - 1];
          if (lastMessage.sender === 'user') {
            const volunteerResponse = {
              id: Date.now(),
              text: 'I\'m here to help. Can you provide more details?',
              sender: 'volunteer',
              senderId: 'vol_001',
              senderName: 'Dr. Sarah Johnson',
              timestamp: new Date().toISOString(),
              type: 'text',
              status: 'delivered',
              isEmergency: false
            };
            setLocalMessages(prev => [...prev, volunteerResponse]);
          }
        }
      }, 10000);

      return () => clearInterval(interval);
    }
    
    // Scroll to bottom
    scrollToBottom();
  }, [messages, isAdminChat, adminInfo]);

  // Update local messages when messages prop changes (for admin chat)
  useEffect(() => {
    if (isAdminChat && messages) {
      setLocalMessages(messages);
    }
  }, [messages, isAdminChat]);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      senderId: 'user_001',
      senderName: 'You',
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sending',
      isEmergency: isEmergency
    };

    if (isAdminChat) {
      // For admin chat, notify parent component to handle Socket.IO
      if (onMessageSent) {
        onMessageSent(message);
      }
    } else {
      // For volunteer chat, handle locally
      setLocalMessages(prev => [...prev, message]);
      
      // Simulate message delivery
      setTimeout(() => {
        setLocalMessages(prev => 
          prev.map(msg => 
            msg.id === message.id 
              ? { ...msg, status: 'delivered' }
              : msg
          )
        );
      }, 1000);

      // Simulate typing indicator
      setTimeout(() => {
        setTypingUsers(['Dr. Sarah Johnson']);
      }, 2000);

      // Clear typing indicator
      setTimeout(() => {
        setTypingUsers([]);
      }, 5000);
    }

    setNewMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else {
      // Handle typing indicator
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleFileUpload = async (values) => {
    try {
      const fileMessage = {
        id: Date.now(),
        text: values.description || 'File shared',
        sender: 'user',
        senderId: 'user_001',
        senderName: 'You',
        timestamp: new Date().toISOString(),
        type: 'file',
        fileName: values.fileName,
        fileType: values.fileType,
        status: 'delivered',
        isEmergency: isEmergency
      };

      setLocalMessages(prev => [...prev, fileMessage]);
      setFileModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sending': return <ClockCircleOutlined style={{ color: '#999' }} />;
      case 'delivered': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'failed': return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default: return null;
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': return <CameraOutlined />;
      case 'document': return <FileTextOutlined />;
      default: return <PaperClipOutlined />;
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      {showVolunteerInfo && volunteerInfo && (
        <Card 
          size="small" 
          style={{ 
            marginBottom: '8px',
            background: isEmergency ? '#fff2f0' : '#f6ffed',
            border: isEmergency ? '1px solid #ffccc7' : '1px solid #b7eb8f'
          }}
        >
          <Row align="middle" justify="space-between">
            <Col>
              <Space>
                <Avatar 
                  size={40} 
                  icon={<UserOutlined />}
                  style={{ background: '#1890ff' }}
                />
                <div>
                  <Text strong>{volunteerInfo.name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {isAdminChat ? 'Emergency Response Admin' : volunteerInfo.specialization}
                  </Text>
                </div>
              </Space>
            </Col>
            <Col>
              <Space>
                <Badge 
                  status={isAdminChat ? (isAdminOnline ? 'success' : 'default') : (volunteerInfo.status === 'online' ? 'success' : 'default')} 
                  text={isAdminChat ? (isAdminOnline ? 'Online' : 'Offline') : volunteerInfo.status}
                />
                {!isAdminChat && (
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Avg. Response: {volunteerInfo.responseTime}
                  </Text>
                )}
                {isAdminChat && (
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </Text>
                )}
              </Space>
            </Col>
          </Row>
          
          {isEmergency && (
            <div style={{ marginTop: '8px' }}>
              <Tag color="red" icon={<ExclamationCircleOutlined />}>
                {isAdminChat ? 'EMERGENCY CHAT - HIGH PRIORITY' : 'EMERGENCY CHAT'}
              </Tag>
            </div>
          )}
        </Card>
      )}

      {/* Messages Area */}
      <Card 
        size="small" 
        style={{ 
          flex: 1, 
          marginBottom: '8px',
          overflow: 'hidden'
        }}
        bodyStyle={{ 
          height: '400px', 
          overflowY: 'auto', 
          padding: '12px' 
        }}
      >
        <List
          dataSource={localMessages}
          renderItem={(message) => (
            <List.Item style={{ padding: '4px 0', border: 'none' }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    background: message.sender === 'user' 
                      ? (message.isEmergency ? '#ff4d4f' : '#1890ff')
                      : '#f5f5f5',
                    color: message.sender === 'user' ? '#fff' : '#000',
                    position: 'relative'
                  }}
                >
                  {message.sender !== 'user' && (
                    <div style={{ marginBottom: '4px' }}>
                      <Text strong style={{ fontSize: '12px' }}>
                        {message.senderName}
                      </Text>
                    </div>
                  )}
                  
                  <div>
                    {message.type === 'file' ? (
                      <Space>
                        {getFileIcon(message.fileType)}
                        <Text>{message.fileName}</Text>
                      </Space>
                    ) : (
                      <Text>{message.text}</Text>
                    )}
                  </div>
                  
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '4px'
                    }}
                  >
                    <Text 
                      style={{ 
                        fontSize: '10px', 
                        opacity: 0.7,
                        color: message.sender === 'user' ? '#fff' : '#999'
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </Text>
                    {message.sender === 'user' && (
                      <span style={{ marginLeft: '4px' }}>
                        {getMessageStatusIcon(message.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
        
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div style={{ padding: '8px 12px' }}>
            <Space>
              <Spin size="small" />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {typingUsers.join(', ')} is typing...
              </Text>
            </Space>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </Card>

      {/* Message Input */}
      <Card size="small" style={{ marginBottom: '8px' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isAdminChat 
                ? (isEmergency ? "Describe your emergency to admin..." : "Type your message to admin...")
                : (isEmergency ? "Describe your emergency..." : "Type your message...")
            }
            style={{ flex: 1 }}
            prefix={<MessageOutlined style={{ color: '#999' }} />}
            disabled={isAdminChat && !isConnected}
            suffix={
              isAdminChat && !isConnected ? (
                <Text type="secondary" style={{ fontSize: '10px' }}>
                  Disconnected
                </Text>
              ) : null
            }
          />
          <Button 
            icon={<PaperClipOutlined />}
            onClick={() => setFileModalVisible(true)}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || (isAdminChat && !isConnected)}
          />
        </Space.Compact>
      </Card>

      {/* Quick Actions */}
      {isEmergency && (
        <Card size="small">
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Button 
                type="default" 
                size="small" 
                block
                icon={<PhoneOutlined />}
                href="tel:100"
              >
                Call 100
              </Button>
            </Col>
            <Col span={8}>
              <Button 
                type="default" 
                size="small" 
                block
                icon={<VideoCameraOutlined />}
              >
                Video Call
              </Button>
            </Col>
            <Col span={8}>
              <Button 
                type="default" 
                size="small" 
                block
                icon={<TeamOutlined />}
              >
                Get Help
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {/* File Upload Modal */}
      <Modal
        title="Share File"
        open={fileModalVisible}
        onCancel={() => setFileModalVisible(false)}
        footer={null}
        width={400}
      >
        <Form form={form} onFinish={handleFileUpload} layout="vertical">
          <Form.Item
            name="fileType"
            label="File Type"
            rules={[{ required: true, message: 'Please select file type' }]}
          >
            <Select placeholder="Select file type">
              <Option value="image">Image</Option>
              <Option value="document">Document</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="fileName"
            label="File Name"
            rules={[{ required: true, message: 'Please enter file name' }]}
          >
            <Input placeholder="Enter file name" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description (Optional)"
          >
            <TextArea 
              rows={3} 
              placeholder="Add a description..."
            />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              <PaperClipOutlined /> Share File
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RealTimeChat;



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
  Table,
  Tag,
  Tooltip,
  message,
  DatePicker,
  InputNumber,
  Radio,
  Checkbox,
  Empty,
  Skeleton
} from 'antd';
import { 
  MessageOutlined, 
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  ExportOutlined,
  SendOutlined as SendIcon,
  InboxOutlined as InboxIcon,
  OutboxOutlined as OutboxIcon,
  SendOutlined as SendIcon2,
  InboxOutlined as InboxIcon2,
  OutboxOutlined as OutboxIcon2,

  SyncOutlined as SyncIcon,
  ReloadOutlined as ReloadIcon
} from '@ant-design/icons';
import io from 'socket.io-client';
import { adminApi } from '../../utils/adminApi';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminMessages = () => {
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [adminId, setAdminId] = useState('admin_001');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatDrawerVisible, setChatDrawerVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Socket.IO initialization
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001', {
      transports: ['websocket', 'polling'],
      autoConnect: true
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    // Connection events
    newSocket.on('connect', () => {
      console.log('Admin connected to server');
      setIsConnected(true);
      
      // Join admin room
      newSocket.emit('joinAdminRoom', { adminId: adminId });
    });

    newSocket.on('disconnect', () => {
      console.log('Admin disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    // Message events
    newSocket.on('receiveMessage', (data) => {
      console.log('Received message:', data);
      const newMessage = {
        id: data.messageId || Date.now(),
        conversationId: data.conversationId,
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        timestamp: data.timestamp || new Date().toISOString(),
        type: 'text',
        status: 'delivered',
        isEmergency: data.isEmergency || false,
        senderName: data.senderName || 'User',
        receiverName: 'Admin'
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Add message to current user messages if this conversation is open
      if (selectedUser && selectedUser.userId === data.senderId) {
        setUserMessages(prev => [...prev, newMessage]);
      }
      
      // Refresh conversations list to get updated data from database
      loadConversations();
    });

    newSocket.on('messageStatus', (data) => {
      setMessages(prev => prev.map(msg => 
        msg.id === data.messageId 
          ? { ...msg, status: data.status }
          : msg
      ));
    });

    newSocket.on('userTyping', (data) => {
      if (data.userId === selectedUser?.userId) {
        setTypingUsers([data.userName]);
      }
    });

    newSocket.on('userStopTyping', (data) => {
      if (data.userId === selectedUser?.userId) {
        setTypingUsers([]);
      }
    });

    // Handle user online/offline events
    newSocket.on('userOnline', (data) => {
      console.log('User came online:', data);
      setConversations(prev => {
        const existingConv = prev.find(conv => conv.userId === data.userId);
        if (existingConv) {
          return prev.map(conv => 
            conv.userId === data.userId 
              ? { ...conv, status: 'online' }
              : conv
          );
        }
        return prev;
      });
    });

    newSocket.on('userOffline', (data) => {
      console.log('User went offline:', data);
      setConversations(prev => {
        const existingConv = prev.find(conv => conv.userId === data.userId);
        if (existingConv) {
          return prev.map(conv => 
            conv.userId === data.userId 
              ? { ...conv, status: 'offline' }
              : conv
          );
        }
        return prev;
      });
    });

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [adminId]);

  // Load conversations and messages
  useEffect(() => {
    loadConversations();
    loadMessages();
  }, []);

  // Load messages for selected user
  useEffect(() => {
    if (selectedUser) {
      loadUserMessages(selectedUser.userId);
    }
  }, [selectedUser]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await adminApi.messages.getConversations();
      if (response.data.success) {
        setConversations(response.data.data);
      } else {
        message.error('Failed to load conversations');
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      message.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      // Load all conversations first, then messages will be loaded per conversation
      await loadConversations();
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadUserMessages = async (userId) => {
    try {
      // Find the conversation for this user
      const conversation = conversations.find(conv => conv.userId === userId);
      if (!conversation) {
        console.error('Conversation not found for user:', userId);
        return;
      }

      const response = await adminApi.messages.getConversationMessages(conversation.id);
      if (response.data.success) {
        setUserMessages(response.data.data);
        // Mark messages as read
        await adminApi.messages.markMessagesAsRead(conversation.id);
      } else {
        message.error('Failed to load messages');
      }
    } catch (error) {
      console.error('Error loading user messages:', error);
      message.error('Failed to load messages');
    }
  };

  const sendMessage = (messageText) => {
    if (!socket || !isConnected || !messageText.trim() || !selectedUser) return;

    const messageData = {
      senderId: adminId,
      receiverId: selectedUser.userId,
      message: messageText,
      timestamp: new Date().toISOString(),
      isEmergency: selectedUser.isEmergency || false,
      conversationId: selectedUser.id,
      senderName: 'Admin',
      receiverName: selectedUser.userName
    };

    // Add message to local state immediately
    const tempMessage = {
      id: Date.now(),
      conversationId: selectedUser.id,
      senderId: adminId,
      receiverId: selectedUser.userId,
      message: messageText,
      timestamp: messageData.timestamp,
      type: 'text',
      status: 'sending',
      isEmergency: selectedUser.isEmergency || false,
      senderName: 'Admin',
      receiverName: selectedUser.userName
    };

    setMessages(prev => [...prev, tempMessage]);
    setUserMessages(prev => [...prev, tempMessage]);

    // Send to server
    socket.emit('sendMessage', messageData);

    // Update status to delivered after a short delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: 'delivered' }
          : msg
      ));
      setUserMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: 'delivered' }
          : msg
      ));
      
      // Refresh conversations list to update last message
      loadConversations();
    }, 1000);

    setNewMessage('');
  };

  const handleUserSelect = async (conversation) => {
    setSelectedUser(conversation);
    setChatDrawerVisible(true);
    
    // Load messages for this conversation
    await loadUserMessages(conversation.userId);
    
    // Mark messages as read
    setConversations(prev => prev.map(conv => 
      conv.userId === conversation.userId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(newMessage);
    } else {
      // Handle typing indicator
      setIsTyping(true);
      if (selectedUser) {
        socket.emit('adminTyping', { 
          adminId, 
          userId: selectedUser.userId,
          adminName: 'Admin'
        });
      }
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'blue';
      case 'pending': return 'orange';
      case 'resolved': return 'green';
      case 'closed': return 'gray';
      default: return 'default';
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

  const conversationColumns = [
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
      render: (name, record) => (
        <Space size="small">
          <Avatar 
            size={32} 
            icon={<UserOutlined />}
            style={{ background: record.isEmergency ? '#ff4d4f' : '#1890ff' }}
          />
          <div>
            <Text strong style={{ fontSize: '13px' }}>{name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '11px' }}>
              {record.userEmail}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: '10px' }}>
              {record.userPhone}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Last Message',
      dataIndex: 'lastMessage',
      key: 'lastMessage',
      ellipsis: true,
      render: (text, record) => (
        <div>
          <Text ellipsis style={{ maxWidth: '180px', fontSize: '12px' }}>
            {text}
          </Text>
          <br />
          <Space size="small">
            <ClockCircleOutlined style={{ fontSize: '9px' }} />
            <Text type="secondary" style={{ fontSize: '10px' }}>
              {formatTime(record.lastMessageTime)}
            </Text>
            {record.unreadCount > 0 && (
              <Badge count={record.unreadCount} size="small" />
            )}
          </Space>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status, record) => (
        <Space direction="vertical" size={2}>
          <Badge 
            status={getStatusColor(status)} 
            text={status ? status.toUpperCase() : 'N/A'}
            style={{ fontSize: '10px' }}
          />
          {record.isEmergency && (
            <Tag color="red" size="small" style={{ fontSize: '9px' }}>EMERGENCY</Tag>
          )}
        </Space>
      )
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
      ellipsis: true,
      render: (location) => (
        <Space size="small">
          <EnvironmentOutlined style={{ fontSize: '10px' }} />
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {location}
          </Text>
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Open Chat">
            <Button 
              type="primary" 
              size="small"
              icon={<MessageOutlined />}
              onClick={() => handleUserSelect(record)}
            />
          </Tooltip>
          <Tooltip title="View Details">
            <Button 
              type="default" 
              size="small"
              icon={<EyeOutlined />}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.userName.toLowerCase().includes(searchText.toLowerCase()) ||
                         conv.userEmail.toLowerCase().includes(searchText.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    const matchesType = filterType === 'all' || 
                       (filterType === 'emergency' && conv.isEmergency) ||
                       (filterType === 'normal' && !conv.isEmergency);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Layout style={{ 
      background: '#f0f2f5', 
      height: '100vh', 
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      <Content style={{ 
        padding: '0px',
        height: '100vh',
        overflow: 'hidden',
        margin: 0
      }}>
        {/* Filters and Search */}
        <Card style={{ marginBottom: '6px', marginTop: '0px', border: 'none' }} bodyStyle={{ padding: '8px' }}>
          <Row gutter={[4, 4]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input 
                placeholder="Search conversations..." 
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select 
                placeholder="Status" 
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: '100%' }}
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
                <Option value="resolved">Resolved</Option>
                <Option value="closed">Closed</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select 
                placeholder="Type" 
                value={filterType}
                onChange={setFilterType}
                style={{ width: '100%' }}
              >
                <Option value="all">All Types</Option>
                <Option value="emergency">Emergency</Option>
                <Option value="normal">Normal</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Button 
                icon={<ReloadOutlined />}
                onClick={loadConversations}
                loading={loading}
              >
                Refresh
              </Button>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Button icon={<ExportOutlined />}>
                Export
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Conversations Table */}
        <Card style={{ 
          marginBottom: '4px',
          height: 'calc(100vh - 120px)',
          overflow: 'hidden'
        }} bodyStyle={{ 
          padding: '8px',
          height: '100%',
          overflow: 'hidden'
        }}>
          <div style={{ height: '100%', overflow: 'auto' }}>
            <Table
              columns={conversationColumns}
              dataSource={filteredConversations}
              rowKey="id"
              loading={loading}
              size="small"
              pagination={{ pageSize: 10, size: 'small' }}
              scroll={{ y: 'calc(100vh - 200px)' }}
              onRow={(record) => ({
                onClick: () => handleUserSelect(record),
                style: { cursor: 'pointer' }
              })}
            />
          </div>
        </Card>

        {/* Chat Drawer */}
        <Drawer
          title={
            selectedUser ? (
              <div>
                <Space>
                  <Avatar 
                    size={40} 
                    icon={<UserOutlined />}
                    style={{ background: selectedUser.isEmergency ? '#ff4d4f' : '#1890ff' }}
                  />
                  <div>
                    <Text strong>{selectedUser.userName}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {selectedUser.userEmail}
                    </Text>
                  </div>
                </Space>
                {selectedUser.isEmergency && (
                  <Tag color="red" style={{ marginLeft: '12px' }}>
                    EMERGENCY
                  </Tag>
                )}
              </div>
            ) : 'Chat'
          }
          placement="right"
          onClose={() => setChatDrawerVisible(false)}
          open={chatDrawerVisible}
          width={600}
        >
          {selectedUser && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* User Info */}
              <Card size="small" style={{ marginBottom: '4px' }} bodyStyle={{ padding: '8px' }}>
                <Row gutter={[4, 2]}>
                  <Col span={12}>
                    <Text strong>Phone:</Text> <Text>{selectedUser.userPhone}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Status:</Text> 
                    <Badge 
                      status={getStatusColor(selectedUser.status)} 
                      text={selectedUser.status ? selectedUser.status.toUpperCase() : 'N/A'}
                      style={{ marginLeft: '8px' }}
                    />
                  </Col>
                  <Col span={24}>
                    <Text strong>Location:</Text> 
                    <Space>
                      <EnvironmentOutlined />
                      <Text>{selectedUser.location}</Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Text strong>Priority:</Text> 
                    <Tag color={getPriorityColor(selectedUser.priority)} style={{ marginLeft: '8px' }}>
                      {selectedUser.priority ? selectedUser.priority.toUpperCase() : 'N/A'}
                    </Tag>
                  </Col>
                </Row>
              </Card>

              {/* Messages Area */}
              <Card 
                size="small" 
                style={{ 
                  flex: 1, 
                  marginBottom: '4px',
                  overflow: 'hidden'
                }}
                bodyStyle={{ 
                  height: '400px', 
                  overflowY: 'auto', 
                  padding: '4px' 
                }}
              >
                <List
                  dataSource={userMessages}
                  renderItem={(message) => (
                    <List.Item style={{ padding: '1px 0', border: 'none' }}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: message.senderId === adminId ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div
                          style={{
                            maxWidth: '70%',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            background: message.senderId === adminId 
                              ? (message.isEmergency ? '#ff4d4f' : '#1890ff')
                              : '#f5f5f5',
                            color: message.senderId === adminId ? '#fff' : '#000',
                            position: 'relative'
                          }}
                        >
                          {message.senderId !== adminId && (
                            <div style={{ marginBottom: '1px' }}>
                              <Text strong style={{ fontSize: '11px' }}>
                                {message.senderName}
                              </Text>
                            </div>
                          )}
                          
                          <div>
                            <Text>{message.message}</Text>
                          </div>
                          
                          <div 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              marginTop: '1px'
                            }}
                          >
                            <Text 
                              style={{ 
                                fontSize: '10px', 
                                opacity: 0.7,
                                color: message.senderId === adminId ? '#fff' : '#999'
                              }}
                            >
                              {formatTime(message.timestamp)}
                            </Text>
                            {message.senderId === adminId && (
                              <span style={{ marginLeft: '4px' }}>
                                {message.status === 'sending' && <ClockCircleOutlined style={{ color: '#999' }} />}
                                {message.status === 'delivered' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
                                {message.status === 'failed' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
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
                  <div style={{ padding: '2px 4px' }}>
                    <Space size="small">
                      <Spin size="small" />
                      <Text type="secondary" style={{ fontSize: '11px' }}>
                        {typingUsers.join(', ')} is typing...
                      </Text>
                    </Space>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </Card>

              {/* Message Input */}
              <Card size="small" bodyStyle={{ padding: '8px' }}>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      selectedUser.isEmergency 
                        ? "Respond to emergency..." 
                        : "Type your message..."
                    }
                    style={{ flex: 1 }}
                    prefix={<MessageOutlined style={{ color: '#999' }} />}
                    disabled={!isConnected}
                  />
                  <Button 
                    type="primary" 
                    icon={<SendOutlined />}
                    onClick={() => sendMessage(newMessage)}
                    disabled={!newMessage.trim() || !isConnected}
                  />
                </Space.Compact>
              </Card>
            </div>
          )}
        </Drawer>
      </Content>
    </Layout>
  );
};

export default AdminMessages;


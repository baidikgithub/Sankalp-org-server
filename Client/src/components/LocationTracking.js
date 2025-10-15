import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Space, 
  Alert, 
  Spin,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Divider,
  Badge,
  Tooltip,
  Avatar,
  Tabs
} from 'antd';
import { 
  EnvironmentOutlined, 
  AimOutlined, 
  ReloadOutlined, 
  ShareAltOutlined,
  PhoneOutlined,
  MessageOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import MapView from './MapView';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const LocationTracking = ({ 
  onLocationUpdate, 
  emergencyMode = false, 
  showVolunteers = false,
  requestId = null 
}) => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingInterval, setTrackingInterval] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [form] = Form.useForm();
  const watchId = useRef(null);

  // Mock nearby volunteers for demonstration
  const mockVolunteers = [
    {
      id: 'vol_001',
      name: 'Dr. Sarah Johnson',
      distance: '0.5 km',
      status: 'available',
      specialization: 'Medical',
      lastSeen: '2 minutes ago',
      coordinates: { lat: 28.6140, lng: 77.2091 },
      phone: '+91-9876543210'
    },
    {
      id: 'vol_002',
      name: 'Community Helper',
      distance: '1.2 km',
      status: 'busy',
      specialization: 'General',
      lastSeen: '5 minutes ago',
      coordinates: { lat: 28.6145, lng: 77.2095 },
      phone: '+91-9876543211'
    },
    {
      id: 'vol_003',
      name: 'Social Worker',
      distance: '2.1 km',
      status: 'available',
      specialization: 'Social Work',
      lastSeen: '1 minute ago',
      coordinates: { lat: 28.6148, lng: 77.2100 },
      phone: '+91-9876543212'
    }
  ];

  useEffect(() => {
    // Get initial location
    getCurrentLocation();
    
    return () => {
      // Cleanup tracking when component unmounts
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  }, []);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString(),
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          speed: position.coords.speed
        };
        
        setLocation(newLocation);
        setIsLoadingLocation(false);
        
        // Add to history
        setLocationHistory(prev => [newLocation, ...prev.slice(0, 9)]);
        
        // Notify parent component
        if (onLocationUpdate) {
          onLocationUpdate(newLocation);
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setIsTracking(true);
    
    // Start watching position changes
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString(),
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          speed: position.coords.speed
        };
        
        setLocation(newLocation);
        
        // Add to history
        setLocationHistory(prev => [newLocation, ...prev.slice(0, 9)]);
        
        // Notify parent component
        if (onLocationUpdate) {
          onLocationUpdate(newLocation);
        }
      },
      (error) => {
        console.error('Location tracking error:', error);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000
      }
    );
  };

  const stopTracking = () => {
    setIsTracking(false);
    
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const shareLocation = async (values) => {
    try {
      const shareData = {
        ...values,
        location: location,
        timestamp: new Date().toISOString(),
        requestId: requestId
      };
      
      console.log('Sharing location:', shareData);
      
      // Here you would send to your backend API
      // await fetch('/api/share-location', { method: 'POST', body: JSON.stringify(shareData) });
      
      Modal.success({
        title: 'Location Shared',
        content: 'Your location has been shared with volunteers.',
      });
      
      setShareModalVisible(false);
      form.resetFields();
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to share location. Please try again.',
      });
    }
  };

  const formatCoordinates = (lat, lng) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const formatAccuracy = (accuracy) => {
    if (accuracy < 10) return 'Very High';
    if (accuracy < 50) return 'High';
    if (accuracy < 100) return 'Medium';
    return 'Low';
  };

  const getVolunteerStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  return (
    <div>
      {/* Location Status Card */}
      <Card 
        title={
          <Space>
            <EnvironmentOutlined style={{ color: location ? '#52c41a' : '#ff4d4f' }} />
            <Text strong>Location Tracking</Text>
            {emergencyMode && (
              <Badge status="error" text="EMERGENCY MODE" />
            )}
          </Space>
        }
        extra={
          <Space>
            <Button 
              type={isTracking ? 'default' : 'primary'}
              icon={isTracking ? <ClockCircleOutlined /> : <AimOutlined />}
              onClick={isTracking ? stopTracking : startTracking}
              loading={isLoadingLocation}
            >
              {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </Button>
            <Button 
              icon={<ReloadOutlined />}
              onClick={getCurrentLocation}
              loading={isLoadingLocation}
            >
              Refresh
            </Button>
          </Space>
        }
        style={{ marginBottom: '16px' }}
      >
        {/* Tabs for Details and Map View */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'details',
              label: (
                <Space>
                  <EnvironmentOutlined />
                  Details
                </Space>
              ),
              children: (
                <div>
                  {isLoadingLocation ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <Spin size="large" />
                      <Paragraph style={{ marginTop: '16px' }}>
                        Getting your location...
                      </Paragraph>
                    </div>
                  ) : location ? (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <div>
                            <Text strong>Current Location:</Text>
                            <br />
                            <Text code>{formatCoordinates(location.latitude, location.longitude)}</Text>
                          </div>
                          
                          <Row gutter={16}>
                            <Col span={12}>
                              <Text type="secondary">Accuracy: </Text>
                              <Text>{formatAccuracy(location.accuracy)} ({location.accuracy.toFixed(0)}m)</Text>
                            </Col>
                            <Col span={12}>
                              <Text type="secondary">Last Updated: </Text>
                              <Text>{new Date(location.timestamp).toLocaleTimeString()}</Text>
                            </Col>
                          </Row>

                          {location.speed && location.speed > 0 && (
                            <div>
                              <Text type="secondary">Speed: </Text>
                              <Text>{(location.speed * 3.6).toFixed(1)} km/h</Text>
                            </div>
                          )}

                          {location.heading && (
                            <div>
                              <Text type="secondary">Heading: </Text>
                              <Text>{location.heading.toFixed(0)}°</Text>
                            </div>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  ) : (
                    <Alert
                      message="Location Not Available"
                      description={locationError || "Click 'Get Location' to enable location tracking"}
                      type="warning"
                      showIcon
                    />
                  )}
                </div>
              )
            },
            {
              key: 'map',
              label: (
                <Space>
                  <GlobalOutlined />
                  Map View
                </Space>
              ),
              children: (
                <div>
                  {location ? (
                    <MapView
                      location={location}
                      volunteers={showVolunteers ? mockVolunteers : []}
                      emergencyMode={emergencyMode}
                      showVolunteers={showVolunteers}
                      height="400px"
                      onLocationClick={(loc) => console.log('Location clicked:', loc)}
                    />
                  ) : (
                    <Alert
                      message="No Location Data"
                      description="Please get your location first to view the map"
                      type="info"
                      showIcon
                    />
                  )}
                </div>
              )
            }
          ]}
        />
      </Card>

      {/* Emergency Actions */}
      {emergencyMode && location && (
        <Card title="Emergency Actions" style={{ marginBottom: '16px' }}>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Button 
                type="primary" 
                danger 
                block
                icon={<ExclamationCircleOutlined />}
                onClick={() => setShareModalVisible(true)}
              >
                Share Location
              </Button>
            </Col>
            <Col span={8}>
              <Button 
                type="default" 
                block
                icon={<PhoneOutlined />}
                href="tel:100"
              >
                Call Emergency
              </Button>
            </Col>
            <Col span={8}>
              <Button 
                type="default" 
                block
                icon={<MessageOutlined />}
                onClick={() => setShareModalVisible(true)}
              >
                Send SOS
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {/* Nearby Volunteers */}
      {showVolunteers && (
        <Card title="Nearby Volunteers" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {mockVolunteers.map((volunteer) => (
              <Card 
                key={volunteer.id} 
                size="small"
                style={{ 
                  borderLeft: `4px solid ${
                    volunteer.status === 'available' ? '#52c41a' : 
                    volunteer.status === 'busy' ? '#fa8c16' : '#d9d9d9'
                  }`
                }}
              >
                <Row justify="space-between" align="middle">
                  <Col flex="auto">
                    <Space>
                      <Avatar icon={<UserOutlined />} />
                      <div>
                        <Text strong>{volunteer.name}</Text>
                        <br />
                        <Text type="secondary">{volunteer.specialization}</Text>
                      </div>
                    </Space>
                  </Col>
                  <Col>
                    <Space direction="vertical" align="end">
                      <Badge 
                        status={getVolunteerStatusColor(volunteer.status)} 
                        text={volunteer.status.toUpperCase()}
                      />
                      <Text type="secondary">{volunteer.distance}</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {volunteer.lastSeen}
                      </Text>
                    </Space>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </Card>
      )}

      {/* Location History */}
      {locationHistory.length > 0 && (
        <Card title="Location History" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            {locationHistory.slice(0, 5).map((loc, index) => (
              <div key={index} style={{ 
                padding: '8px', 
                background: index === 0 ? '#f6ffed' : '#fafafa',
                borderRadius: '4px',
                border: index === 0 ? '1px solid #b7eb8f' : '1px solid #d9d9d9'
              }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text code>{formatCoordinates(loc.latitude, loc.longitude)}</Text>
                    {index === 0 && <Badge status="processing" text="Current" />}
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {new Date(loc.timestamp).toLocaleTimeString()}
                    </Text>
                  </Col>
                </Row>
              </div>
            ))}
          </Space>
        </Card>
      )}

      {/* Share Location Modal */}
      <Modal
        title="Share Location"
        open={shareModalVisible}
        onCancel={() => setShareModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form form={form} onFinish={shareLocation} layout="vertical">
          <Form.Item
            name="recipients"
            label="Share With"
            rules={[{ required: true, message: 'Please select recipients' }]}
          >
            <Select 
              mode="multiple" 
              placeholder="Select volunteers or emergency contacts"
            >
              <Option value="all_volunteers">All Volunteers</Option>
              <Option value="medical_team">Medical Team</Option>
              <Option value="emergency_services">Emergency Services</Option>
              <Option value="family">Family Contacts</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="message"
            label="Message (Optional)"
          >
            <TextArea 
              rows={3} 
              placeholder="Add a message with your location share..."
            />
          </Form.Item>
          
          <Form.Item
            name="duration"
            label="Share Duration"
            rules={[{ required: true, message: 'Please select duration' }]}
          >
            <Select placeholder="How long to share location">
              <Option value="30">30 minutes</Option>
              <Option value="60">1 hour</Option>
              <Option value="180">3 hours</Option>
              <Option value="480">8 hours</Option>
              <Option value="indefinite">Until I stop sharing</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              <ShareAltOutlined /> Share Location
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LocationTracking;

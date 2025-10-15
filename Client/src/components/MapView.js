import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Card, Button, Space, Typography, Badge, Tooltip, Row, Col } from 'antd';
import { 
  EnvironmentOutlined, 
  AimOutlined, 
  UserOutlined,
  PhoneOutlined,
  MessageOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  CompressOutlined
} from '@ant-design/icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const { Text } = Typography;

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons
const createCustomIcon = (color, iconType) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
      font-weight: bold;
    ">${iconType}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

const MapCenter = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  
  return null;
};

const MapView = ({ 
  location, 
  volunteers = [], 
  emergencyMode = false,
  onLocationClick,
  height = '400px',
  showControls = true,
  showVolunteers = true
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapCenter, setMapCenter] = useState([28.6140, 77.2091]); // Default to Delhi
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    if (location) {
      const newCenter = [location.latitude, location.longitude];
      setMapCenter(newCenter);
      setMapZoom(15);
    }
  }, [location]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getVolunteerIcon = (volunteer) => {
    const color = volunteer.status === 'available' ? '#52c41a' : 
                  volunteer.status === 'busy' ? '#fa8c16' : '#d9d9d9';
    return createCustomIcon(color, 'V');
  };

  const getLocationIcon = () => {
    return createCustomIcon(emergencyMode ? '#ff4d4f' : '#1890ff', '📍');
  };

  const formatDistance = (distance) => {
    return distance || 'Unknown';
  };

  const mapStyle = {
    height: isFullscreen ? '100vh' : height,
    width: '100%',
    borderRadius: isFullscreen ? '0' : '8px',
    zIndex: isFullscreen ? 9999 : 'auto',
    position: isFullscreen ? 'fixed' : 'relative',
    top: isFullscreen ? '0' : 'auto',
    left: isFullscreen ? '0' : 'auto'
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Map Controls */}
      {showControls && (
        <Card 
          size="small" 
          style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Space>
            <Tooltip title="Refresh Map">
              <Button 
                size="small" 
                icon={<ReloadOutlined />}
                onClick={() => window.location.reload()}
              />
            </Tooltip>
            <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
              <Button 
                size="small" 
                icon={isFullscreen ? <CompressOutlined /> : <FullscreenOutlined />}
                onClick={toggleFullscreen}
              />
            </Tooltip>
          </Space>
        </Card>
      )}

      {/* Map Container */}
      <div style={mapStyle}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={!isFullscreen}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Map Center Control */}
          <MapCenter center={mapCenter} zoom={mapZoom} />
          
          {/* Current Location Marker */}
          {location && (
            <>
              <Marker
                position={[location.latitude, location.longitude]}
                icon={getLocationIcon()}
                eventHandlers={{
                  click: () => onLocationClick && onLocationClick(location)
                }}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div>
                        <Text strong>
                          {emergencyMode ? '🚨 Emergency Location' : '📍 Your Location'}
                        </Text>
                      </div>
                      <div>
                        <Text type="secondary">Coordinates:</Text>
                        <br />
                        <Text code>
                          {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        </Text>
                      </div>
                      <div>
                        <Text type="secondary">Accuracy:</Text>
                        <br />
                        <Text>{location.accuracy.toFixed(0)}m</Text>
                      </div>
                      <div>
                        <Text type="secondary">Last Updated:</Text>
                        <br />
                        <Text>{new Date(location.timestamp).toLocaleString()}</Text>
                      </div>
                      {location.speed && location.speed > 0 && (
                        <div>
                          <Text type="secondary">Speed:</Text>
                          <br />
                          <Text>{(location.speed * 3.6).toFixed(1)} km/h</Text>
                        </div>
                      )}
                    </Space>
                  </div>
                </Popup>
              </Marker>
              
              {/* Accuracy Circle */}
              <Circle
                center={[location.latitude, location.longitude]}
                radius={location.accuracy}
                pathOptions={{
                  color: emergencyMode ? '#ff4d4f' : '#1890ff',
                  fillColor: emergencyMode ? '#ff4d4f' : '#1890ff',
                  fillOpacity: 0.1,
                  weight: 2
                }}
              />
            </>
          )}
          
          {/* Volunteer Markers */}
          {showVolunteers && volunteers.map((volunteer) => (
            <Marker
              key={volunteer.id}
              position={[volunteer.coordinates.lat, volunteer.coordinates.lng]}
              icon={getVolunteerIcon(volunteer)}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Text strong>{volunteer.name}</Text>
                        <br />
                        <Text type="secondary">{volunteer.specialization}</Text>
                      </Col>
                      <Col>
                        <Badge 
                          status={volunteer.status === 'available' ? 'success' : 
                                 volunteer.status === 'busy' ? 'warning' : 'default'} 
                          text={volunteer.status.toUpperCase()}
                        />
                      </Col>
                    </Row>
                    
                    <div>
                      <Text type="secondary">Distance:</Text>
                      <br />
                      <Text>{formatDistance(volunteer.distance)}</Text>
                    </div>
                    
                    <div>
                      <Text type="secondary">Last Seen:</Text>
                      <br />
                      <Text>{volunteer.lastSeen}</Text>
                    </div>
                    
                    <Space>
                      <Button 
                        size="small" 
                        icon={<PhoneOutlined />}
                        href={`tel:${volunteer.phone || '#'}`}
                        disabled={!volunteer.phone}
                      >
                        Call
                      </Button>
                      <Button 
                        size="small" 
                        icon={<MessageOutlined />}
                        disabled={volunteer.status !== 'available'}
                      >
                        Message
                      </Button>
                    </Space>
                  </Space>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Map Legend */}
      <Card 
        size="small" 
        style={{ 
          marginTop: '8px',
          background: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Space wrap>
          <Space>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: emergencyMode ? '#ff4d4f' : '#1890ff',
              border: '2px solid white',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }} />
            <Text type="secondary">
              {emergencyMode ? 'Emergency Location' : 'Your Location'}
            </Text>
          </Space>
          
          {showVolunteers && (
            <>
              <Space>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#52c41a',
                  border: '2px solid white',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }} />
                <Text type="secondary">Available Volunteer</Text>
              </Space>
              
              <Space>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#fa8c16',
                  border: '2px solid white',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }} />
                <Text type="secondary">Busy Volunteer</Text>
              </Space>
              
              <Space>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#d9d9d9',
                  border: '2px solid white',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }} />
                <Text type="secondary">Offline Volunteer</Text>
              </Space>
            </>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default MapView;








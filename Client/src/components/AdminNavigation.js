import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  DollarOutlined,
  SettingOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Sider, Content } = Layout; // ✅ Correct destructuring
const { Text } = Typography;

const AdminNavigation = ({ collapsed, onCollapse, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: '/admin', icon: <DashboardOutlined />, label: 'Dashboard', onClick: () => navigate('/admin') },
    { key: '/admin/emergency', icon: <SafetyCertificateOutlined />, label: 'Emergency Portal', onClick: () => navigate('/admin/emergency') },
    { key: '/admin/messages', icon: <MessageOutlined />, label: 'Messages', onClick: () => navigate('/admin/messages') },
    { key: '/admin/volunteers', icon: <TeamOutlined />, label: 'Volunteers', onClick: () => navigate('/admin/volunteers') },
    { key: '/admin/donations', icon: <DollarOutlined />, label: 'Donations', onClick: () => navigate('/admin/donations') },
    { key: '/admin/users', icon: <SettingOutlined />, label: 'Users', onClick: () => navigate('/admin/users') },
    { key: '/admin/contact', icon: <MessageOutlined />, label: 'Contacts', onClick: () => navigate('/admin/contact') },
  ];


  const handleBackToSite = () => navigate('/');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#ffffff',
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #f0f0f0',
        }}
        width={250}
        collapsedWidth={60}
      >
        {/* Toggle Button */}
        <div style={{ padding: '10px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onCollapse}
            style={{ color: '#666', fontSize: '18px', background: 'transparent' }}
          />
        </div>

        {/* Logo */}
        <motion.div
          style={{
            height: '64px',
            margin: '0 16px 16px',
            background: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0' : '0 16px',
            transition: 'all 0.3s',
            border: '1px solid #e9ecef',
          }}
          whileHover={{ background: '#e9ecef' }}
        >
          <img src="/logo.png" alt="Sankalp Youth" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          {!collapsed && (
            <Text style={{ color: '#333', marginLeft: '12px', fontWeight: 600, fontSize: '16px' }}>Sankalp Youth</Text>
          )}
        </motion.div>

        {/* Nav Menu */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ background: 'transparent', border: 'none', flex: 1 }}
        />

        {/* Back to Site Button at bottom */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={handleBackToSite}
            style={{
              color: '#666',
              width: '100%',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e9ecef',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#e9ecef')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f8f9fa')}
          >
            {!collapsed && <span style={{ marginLeft: '8px' }}>Back to Site</span>}
          </Button>
        </div>
      </Sider>

      {/* Main Content */}
      <Content
        style={{
          marginLeft: collapsed ? 60 : 250,
          transition: 'margin-left 0.2s',
          minHeight: '100vh',
          background: '#f5f6fa',
          overflowY: 'auto',
          padding: 0,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AdminNavigation;

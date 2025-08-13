import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Row, Col, Card, Statistic, List, Avatar, Typography } from 'antd';
import {
  UsergroupAddOutlined,
  ProjectOutlined,
  FundOutlined,
  TeamOutlined,
  CalendarOutlined,
  HourglassOutlined,
  UserAddOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [stats] = useState([
    { title: "Total Members", value: 15420, icon: <UsergroupAddOutlined style={{ color: '#007BFF' }} /> },
    { title: "Active Projects", value: 45, icon: <ProjectOutlined style={{ color: '#764ba2' }} /> },
    { title: "Total Donations", value: 1250000, icon: <FundOutlined style={{ color: '#28A745' }} />, formatter: val => `₹${(val / 100000).toFixed(1)}L`, color: '#28A745' },
    { title: "Active Volunteers", value: 890, icon: <TeamOutlined style={{ color: '#17A2B8' }} /> },
    { title: "Events This Month", value: 12, icon: <CalendarOutlined style={{ color: '#FFC107' }} /> },
    { title: "Pending Requests", value: 23, icon: <HourglassOutlined style={{ color: '#DC3545' }} /> }
  ]);

  const [recentActivities] = useState([
    { id: 1, type: 'member', action: 'New member registered', user: 'Rahul Kumar', time: '2 hours ago', icon: <UserAddOutlined /> },
    { id: 2, type: 'donation', action: 'Donation received', user: 'Priya Sharma', time: '4 hours ago', icon: <FundOutlined /> },
    { id: 3, type: 'event', action: 'Event created', user: 'Admin', time: '1 day ago', icon: <CalendarOutlined /> },
    { id: 4, type: 'project', action: 'Project status updated', user: 'Team Lead', time: '2 days ago', icon: <ProjectOutlined /> }
  ]);

  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div style={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>

      {/* Statistics Cards - 3 per row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginTop: 3, marginBottom: 32 }}
      >
        <Row gutter={[24, 24]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 12,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
                    transition: '0.3s'
                  }}
                >
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ color: stat.color || '#333', fontSize: 20 }}
                    formatter={stat.formatter}
                  />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Recent Activities */}
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              title={<span style={{ fontWeight: 600 }}>Recent Activities</span>}
              bordered={false}
              style={{
                borderRadius: 12,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.08)'
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={recentActivities}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            background:
                              item.type === 'member' ? '#007bff' :
                              item.type === 'donation' ? '#28a745' :
                              item.type === 'event' ? '#ffc107' :
                              item.type === 'project' ? '#dc3545' : '#6C757D',
                            color: item.type === 'event' ? '#333' : '#fff'
                          }}
                        >
                          {item.icon}
                        </Avatar>
                      }
                      title={<Text strong>{item.action}</Text>}
                      description={
                        <Text>
                          {item.user} &nbsp;•&nbsp;
                          <Text type="secondary">{item.time}</Text>
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

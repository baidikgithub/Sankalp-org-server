import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined, CheckCircleOutlined, HeartOutlined, CalendarOutlined } from '@ant-design/icons';

const MemberStats = ({ members = [], compact = true }) => {
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;
  const volunteers = members.filter(m => m.role === 'Volunteer').length;
  const now = new Date();
  const newThisMonth = members.filter(m => {
    const joinDate = new Date(m.joinDate);
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;

  const statsData = [
    { title: "Total Members", value: totalMembers, icon: <UserOutlined style={{ fontSize: compact ? 16 : 20, color: '#1890ff' }} />, color: '#1890ff' },
    { title: "Active Members", value: activeMembers, icon: <CheckCircleOutlined style={{ fontSize: compact ? 16 : 20, color: '#52c41a' }} />, color: '#52c41a' },
    { title: "Volunteers", value: volunteers, icon: <HeartOutlined style={{ fontSize: compact ? 16 : 20, color: '#fa8c16' }} />, color: '#fa8c16' },
    { title: "New This Month", value: newThisMonth, icon: <CalendarOutlined style={{ fontSize: compact ? 16 : 20, color: '#722ed1' }} />, color: '#722ed1' }
  ];

  return (
    <Row gutter={[12, 12]}>
      {statsData.map((stat, idx) => (
        <Col xs={12} sm={12} md={6} key={idx}>
          <Card
            style={{ borderRadius: 6 }}
            bodyStyle={{ padding: compact ? 8 : 20 }}
            hoverable
          >
            <Statistic
              title={<div style={{ fontSize: compact ? 12 : 14, color: '#888' }}>{stat.title}</div>}
              value={stat.value}
              prefix={stat.icon}
              valueStyle={{ color: stat.color, fontSize: compact ? 18 : 24 }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MemberStats;

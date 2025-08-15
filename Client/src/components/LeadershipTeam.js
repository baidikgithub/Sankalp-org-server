// components/about/LeadershipTeam.jsx
import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const LeadershipTeam = ({ leadership, sectionVariants }) => (
  <motion.section
    variants={sectionVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    style={{ padding: '80px 20px', background: '#fafafa' }}
  >
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={40} align="middle" style={{ marginBottom: 50 }}>
        <Col xs={24} md={12}>
          <Title level={2}>Our Leadership Team</Title>
          <Paragraph>
            Led by experienced professionals committed to social change and sustainable development.
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        {leadership.map((leader, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card style={{ textAlign: 'center', borderRadius: 12 }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#1890ff',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  margin: '0 auto 16px'
                }}>
                  {leader.initials}
                </div>
                <Title level={4}>{leader.name}</Title>
                <Paragraph style={{ color: '#1890ff' }}>{leader.role}</Paragraph>
                <Paragraph>{leader.experience}</Paragraph>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  </motion.section>
);

export default LeadershipTeam;

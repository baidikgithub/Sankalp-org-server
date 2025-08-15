// components/about/ImpactStats.jsx
import React from 'react';
import { Row, Col, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const ImpactStats = ({ organizationStats }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ padding: '80px 20px', background: '#fafafa' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Title style={{ textAlign: 'center', marginBottom: 50, color: '#1890ff' }}>
          Our Impact at a Glance
        </Title>

        <Row gutter={[24, 24]} justify="center">
          {organizationStats.map((stat, i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: '#fff',
                  padding: '30px 20px',
                  borderRadius: 12,
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  cursor: 'default'
                }}
              >
                <div style={{ fontSize: 40, color: '#1890ff', marginBottom: 15 }}>
                  {stat.icon}
                </div>
                <Title level={3} style={{ color: '#333', marginBottom: 5 }}>
                  {stat.number}
                </Title>
                <Paragraph style={{ color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>
                  {stat.label}
                </Paragraph>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.section>
  );
};

export default ImpactStats;

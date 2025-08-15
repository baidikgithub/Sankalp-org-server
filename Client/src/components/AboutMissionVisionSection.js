// components/about/MissionVisionSection.jsx
import React from 'react';
import { Row, Col, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const MissionVisionSection = ({ missionVision, sectionVariants }) => {
  return (
    <>
      {missionVision.map((item, index) => (
        <motion.section
          key={index}
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            padding: '80px 20px',
            background: index % 2 === 0 ? '#fff' : '#fafafa'
          }}
        >
          <Row
            gutter={[40, 40]}
            align="middle"
            style={{ maxWidth: 1200, margin: '0 auto', flexDirection: index % 2 ? 'row-reverse' : 'row' }}
          >
            <Col xs={24} md={12}>
              <Title level={2} style={{ color: '#1890ff' }}>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
              <ul>
                {item.points.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>{point}</li>
                ))}
              </ul>
            </Col>

            <Col xs={24} md={12}>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                }}
              />
            </Col>
          </Row>
        </motion.section>
      ))}
    </>
  );
};

export default MissionVisionSection;

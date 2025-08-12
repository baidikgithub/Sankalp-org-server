// components/ProgrammesSection.jsx
import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ProgrammesSection = ({ programmes }) => {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.div variants={fadeInUp}>
        <Title level={2} style={{ textAlign: "center" }}>Our Programmes</Title>
      </motion.div>
      <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
        {programmes.map((programme, idx) => (
          <Col xs={24} sm={12} md={8} key={idx}>
            <motion.div variants={fadeInUp} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <Card
                hoverable
                bordered={false}
                style={{ borderTop: `4px solid ${programme.color}` }}
              >
                <div style={{ fontSize: 40, color: programme.color }}>
                  {programme.icon}
                </div>
                <Title level={3} style={{ color: programme.color }}>{programme.title}</Title>
                <Paragraph strong>{programme.subtitle}</Paragraph>
                <Paragraph>{programme.description}</Paragraph>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.section>
  );
};

export default ProgrammesSection;

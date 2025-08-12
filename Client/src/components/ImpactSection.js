// components/ImpactSection.jsx
import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ImpactSection = ({ impactMetrics }) => {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.div variants={fadeInUp}>
        <Title level={2} style={{ textAlign: "center" }}>OUR IMPACT</Title>
      </motion.div>
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: 40 }}>
        {impactMetrics.map((metric, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <Card hoverable bordered={false} style={{ textAlign: "center" }}>
                <Title level={3}>
                  {metric.number}
                  <span style={{ color: "#28a745" }}>{metric.suffix}</span>
                </Title>
                <Paragraph>{metric.label}</Paragraph>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.section>
  );
};

export default ImpactSection;

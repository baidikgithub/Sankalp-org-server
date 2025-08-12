import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const BenefitsSection = ({ benefits }) => {
  return (
    <div>
      <Title level={2} style={{ textAlign: "center" }}>Membership Benefits</Title>
      <Row gutter={[20, 20]} justify="center">
        {benefits.map((benefit, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: 10 }}>{benefit.icon}</div>
                <Title level={4}>{benefit.title}</Title>
                <Paragraph>{benefit.description}</Paragraph>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BenefitsSection;

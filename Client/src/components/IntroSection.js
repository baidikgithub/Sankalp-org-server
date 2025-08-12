import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const IntroSection = ({ variants, heroImage }) => (
  <motion.section
    variants={variants}
    initial="hidden"
    animate="show"
    style={{
      background: "#fafafa",
      padding: "80px 20px",
      borderBottom: "1px solid #f0f0f0",
    }}
  >
    <Row gutter={[40, 40]} align="middle" style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Text */}
      <Col xs={24} md={14}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title level={1} style={{ color: "#000", marginBottom: 20 }}>
            About Us
          </Title>
          <Paragraph style={{ fontSize: "1.1rem", color: "#555", marginBottom: 20 }}>
            Sankalp Youth Organisation is a non-profit committed to empowering communities
            across India. Since our inception in 2018, we have worked relentlessly to create
            sustainable solutions that address pressing social issues.
          </Paragraph>
          <Paragraph style={{ color: "#777", marginBottom: 30 }}>
            Our work spans education, healthcare, livelihood, and environmental sustainability —
            impacting millions of lives through grassroots action, advocacy, and collaboration.
          </Paragraph>
          <Button type="primary" size="large" href="#focus">
            Learn More About Our Mission
          </Button>
        </motion.div>
      </Col>

      {/* Image */}
      <Col xs={24} md={10}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={heroImage}
            alt="About our journey"
            style={{
              width: "100%",
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              objectFit: "cover",
            }}
          />
        </motion.div>
      </Col>
    </Row>
  </motion.section>
);

export default IntroSection;

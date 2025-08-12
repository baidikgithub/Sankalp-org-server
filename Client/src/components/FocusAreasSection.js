import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const FocusAreasSection = ({ data }) => (
  <motion.section
    id="focus"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    style={{ padding: "80px 20px", background: "#fff" }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Our Core Focus Areas
      </Title>
      <Paragraph style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
        We work across multiple sectors to create comprehensive and sustainable impact.
      </Paragraph>
      <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
        {data.map((area, idx) => (
          <Col xs={24} sm={12} md={8} key={idx}>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Card
                title={
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 24 }}>{area.icon}</span> {area.area}
                  </span>
                }
                bordered
                style={{ borderRadius: 12 }}
              >
                <Paragraph>{area.description}</Paragraph>
                <ul>
                  {area.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                <div
                  style={{
                    background: "#52c41a",
                    color: "#fff",
                    padding: "10px",
                    textAlign: "center",
                    borderRadius: 8,
                    marginTop: 12,
                  }}
                >
                  {area.impact}
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  </motion.section>
);

export default FocusAreasSection;

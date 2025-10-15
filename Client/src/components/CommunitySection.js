import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Typography, Card } from "antd";

const { Title, Paragraph } = Typography;

const CommunitySection = ({ communityImage }) => (
  <motion.section
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    style={{ padding: "80px 20px", background: "#fff" }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Row gutter={40} align="middle">
        <Col xs={24} md={12}>
          <Title level={2}>Building Stronger Communities</Title>
          <Paragraph>
            Our approach is community-centered, evidence-based, and sustainable. We partner with like-minded
            institutions to implement high-impact programmes that enable access, enhance quality, and drive long-term change.
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card variant="bordered" style={{ borderLeft: "4px solid #1890ff" }}>
                Community Participation
              </Card>
            </Col>
            <Col span={24}>
              <Card variant="bordered" style={{ borderLeft: "4px solid #1890ff" }}>
                Evidence-Based Approach
              </Card>
            </Col>
            <Col span={24}>
              <Card variant="bordered" style={{ borderLeft: "4px solid #1890ff" }}>
                Sustainable Solutions
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <img src={communityImage} alt="Community" style={{ width: "100%", borderRadius: 12 }} />
        </Col>
      </Row>
    </div>
  </motion.section>
);

export default CommunitySection;

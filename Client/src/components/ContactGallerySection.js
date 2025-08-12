import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const ContactGallerySection = ({ gallery }) => (
  <>
    <motion.div style={{ textAlign: "center" }}>
      <Title level={2}>Our Work in Action</Title>
      <Paragraph>See the impact of our community initiatives</Paragraph>
    </motion.div>
    <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
      {gallery.map((g, i) => (
        <Col xs={24} sm={12} md={8} key={i}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card hoverable cover={<img src={g.img} alt={g.title} style={{ height: 200, objectFit: "cover" }} />}>
              <Card.Meta title={g.title} description={g.desc} />
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </>
);

export default ContactGallerySection;

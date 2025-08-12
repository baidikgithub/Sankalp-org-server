import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const GallerySection = ({ items }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Title level={2} style={{ textAlign: "center" }}>Our Volunteer Community</Title>
      <Paragraph style={{ textAlign: "center" }}>
        See how our volunteers are making a difference across communities
      </Paragraph>
      <Row gutter={[20, 20]} justify="center">
        {items.map((item, i) => (
          <Col xs={24} sm={12} md={6} key={i}>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Card
                hoverable
                cover={<img src={item.img} alt={item.title} style={{ height: 200, objectFit: "cover" }} />}
              >
                <Card.Meta title={item.title} description={item.desc} />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

export default GallerySection;

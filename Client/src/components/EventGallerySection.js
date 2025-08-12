import React from "react";
import { Row, Col, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function GallerySection({ images, titles, descriptions }) {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} style={{ textAlign: "center" }}>
        <Title level={2}>Event Highlights Gallery</Title>
        <Paragraph type="secondary">Visual stories from our impactful events</Paragraph>
      </motion.div>
      <Row gutter={[20, 20]} style={{ marginTop: 30 }}>
        {images.map((img, idx) => (
          <Col xs={24} sm={12} md={8} key={idx}>
            <motion.div
              variants={itemVariants}
              style={{
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
              }}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.img
                src={img}
                alt={`Event ${idx + 1}`}
                style={{
                  height: 200,
                  objectFit: "cover",
                  width: "100%",
                  display: "block",
                }}
                variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px",
                  color: "white",
                  background: "linear-gradient(0deg, rgba(0,0,0,0.75), transparent)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: "100%",
                }}
                variants={{
                  rest: { opacity: 0, y: "100%" },
                  hover: { opacity: 1, y: "0%" },
                }}
                transition={{ duration: 0.3 }}
              >
                <Title level={4} style={{ margin: 0, fontSize: "1.2rem", color: "#fff" }}>
                  {titles[idx]}
                </Title>
                <Paragraph
                  style={{ color: "rgba(255, 255, 255, 0.8)", marginTop: 4 }}
                >
                  {descriptions[idx]}
                </Paragraph>
              </motion.div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.section>
  );
}

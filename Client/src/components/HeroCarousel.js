import React from "react";
import { Carousel, Row, Col, Typography, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const HeroCarousel = ({ heroImages }) => {
  return (
    <section style={{ position: "relative", height: "calc(100vh - 64px)" }}>
      {/* Carousel with only images */}
      <Carousel autoplay autoplaySpeed={2000} effect="fade">
        {heroImages.map((img, idx) => (
          <div key={idx}>
            <div
              style={{
                height: "calc(100vh - 64px)",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* Overlay content remains static on top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      <Row justify="center" style={{ position: "absolute", zIndex: 2, top: 0, left: 0, right: 0, bottom: 0 }}>
        <Col xs={24} lg={16} style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title style={{ color: "#fff", textAlign: "center", marginBottom: 24 }}>
              Sankalp Youth Organisation
            </Title>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Paragraph style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
              Founded in 2018, Sankalp Youth Organisation is a youth-led NGO dedicated to education, health, environment, and sustainable development. We strive to empower communities and inspire change through impactful initiatives.
            </Paragraph>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Row justify="center" style={{ marginTop: 32 }}>
              <Space size="large">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="primary" size="large">
                    <Link to="/join">Join Our Mission</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="large" ghost style={{ color: "#fff", borderColor: "#fff" }}>
                    <Link to="/about" style={{ color: "#fff" }}>Learn More</Link>
                  </Button>
                </motion.div>
              </Space>
            </Row>
          </motion.div>
        </Col>
      </Row>
    </section>
  );
};
export default HeroCarousel;

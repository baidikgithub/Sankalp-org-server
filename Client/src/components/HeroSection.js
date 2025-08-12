import React from "react";
import { motion } from "framer-motion";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const HeroSection = ({ image, title, subtitle }) => (
  <div
    style={{
      backgroundImage: `url(${image})`,
      minHeight: "50vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      display: "flex",
      alignItems: "center",
      color: "white",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1
      }}
    />
    <div style={{ position: "relative", width: "100%", padding: "60px 0", textAlign: "center", zIndex: 2 }}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Title style={{ color: "white" }}>{title}</Title>
        <Paragraph style={{ color: "white", fontSize: "16px" }}>{subtitle}</Paragraph>
      </motion.div>
    </div>
  </div>
);

export default HeroSection;

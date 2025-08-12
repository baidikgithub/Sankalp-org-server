import React from "react";
import { motion } from "framer-motion";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const BannerSection = ({ background, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "relative",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2, padding: "30px", borderRadius: "8px" }}>
        <Title style={{ color: "white" }}>{title}</Title>
        <Paragraph style={{ color: "white", fontSize: "18px" }}>
          {subtitle}
        </Paragraph>
      </div>
    </motion.div>
  );
};

export default BannerSection;

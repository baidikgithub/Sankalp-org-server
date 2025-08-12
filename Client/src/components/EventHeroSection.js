import React from "react";
import { motion } from "framer-motion";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function HeroSection({ backgroundImage, title, subtitle }) {
  return (
    <section
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(3px)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: "center", color: "#fff", zIndex: 1 }}
      >
        <Title style={{ color: "#fff", fontSize: "2.8rem" }}>{title}</Title>
        <Paragraph style={{ color: "#f0f0f0", fontSize: 18 }}>{subtitle}</Paragraph>
      </motion.div>
    </section>
  );
}

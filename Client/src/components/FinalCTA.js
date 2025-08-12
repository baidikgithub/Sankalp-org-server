// components/FinalCTA.jsx
import React from "react";
import { Button, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const FinalCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ width: "100%", background: "#fff", padding: "60px 20px", textAlign: "center" }}
    >
      <Title level={2}>Ready to Make a Difference?</Title>
      <Paragraph style={{ fontSize: 18, marginBottom: 32 }}>
        Join us in creating lasting change and building a better tomorrow for all.
      </Paragraph>
      <Space size="large">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="primary" size="large">
            <Link to="/join">Become a Volunteer</Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="large">
            <Link to="/payment">Support Our Cause</Link>
          </Button>
        </motion.div>
      </Space>
    </motion.section>
  );
};

export default FinalCTA;

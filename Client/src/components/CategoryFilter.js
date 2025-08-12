import React from "react";
import { Button, Space } from "antd";
import { motion } from "framer-motion";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ textAlign: "center", marginBottom: 30 }}
    >
      <Space wrap size="middle">
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <Button
              type={selectedCategory === cat.id ? "primary" : "default"}
              onClick={() => onSelect(cat.id)}
              style={{ borderRadius: 20, padding: "6px 16px" }}
            >
              {cat.icon} {cat.label}
            </Button>
          </motion.div>
        ))}
      </Space>
    </motion.div>
  );
}

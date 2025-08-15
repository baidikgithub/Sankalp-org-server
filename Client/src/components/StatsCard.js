import React from "react";
import { Card, Statistic } from "antd";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon, color, formatter, variants }) => {
  return (
    <motion.div variants={variants} whileHover={{ scale: 1.05 }}>
      <Card
        hoverable
        style={{
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          transition: "0.3s",
        }}
      >
        <Statistic
          title={title}
          value={value}
          prefix={icon}
          valueStyle={{ color: color || "#333", fontSize: 20 }}
          formatter={formatter}
        />
      </Card>
    </motion.div>
  );
};

export default StatsCard;

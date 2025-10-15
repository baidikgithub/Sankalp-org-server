import React from "react";
import { Card, List, Avatar, Typography } from "antd";
import { motion } from "framer-motion";

const { Text } = Typography;

const RecentActivitiesList = ({ activities }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        title={<span style={{ fontWeight: 600 }}>Recent Activities</span>}
        variant="borderless"
        style={{
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={activities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      background:
                        item.type === "member"
                          ? "#007bff"
                          : item.type === "donation"
                          ? "#28a745"
                          : item.type === "event"
                          ? "#ffc107"
                          : item.type === "project"
                          ? "#dc3545"
                          : "#6C757D",
                      color: item.type === "event" ? "#333" : "#fff",
                    }}
                  >
                    {item.icon}
                  </Avatar>
                }
                title={<Text strong>{item.action}</Text>}
                description={
                  <Text>
                    {item.user} &nbsp;•&nbsp;
                    <Text type="secondary">{item.time}</Text>
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </motion.div>
  );
};

export default RecentActivitiesList;

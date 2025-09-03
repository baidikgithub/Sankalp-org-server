import React, { useState } from "react";
import { motion } from "framer-motion";
import { Row, Col } from "antd";
import {
  UsergroupAddOutlined,
  ProjectOutlined,
  FundOutlined,
  TeamOutlined,
  CalendarOutlined,
  HourglassOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

// Import Reusable Components
import StatsCard from "../../components/StatsCard";
import RecentActivitiesList from "../../components/RecentActivitiesList";

const Dashboard = () => {
  // Stats data (Main Logic lives here)
  const [stats] = useState([
    {
      title: "Total Members",
      value: 15420,
      icon: <UsergroupAddOutlined style={{ color: "#007BFF" }} />,
    },
    {
      title: "Active Projects",
      value: 45,
      icon: <ProjectOutlined style={{ color: "#764ba2" }} />,
    },
    {
      title: "Total Donations",
      value: 1250000,
      icon: <FundOutlined style={{ color: "#28A745" }} />,
      formatter: (val) => `₹${(val / 100000).toFixed(1)}L`,
      color: "#28A745",
    },
    {
      title: "Active Volunteers",
      value: 890,
      icon: <TeamOutlined style={{ color: "#17A2B8" }} />,
    },
    {
      title: "Events This Month",
      value: 12,
      icon: <CalendarOutlined style={{ color: "#FFC107" }} />,
    },
  ]);

  // Recent Activities data
  const [recentActivities] = useState([
    {
      id: 1,
      type: "member",
      action: "New member registered",
      user: "Rahul Kumar",
      time: "2 hours ago",
      icon: <UserAddOutlined />,
    },
    {
      id: 2,
      type: "donation",
      action: "Donation received",
      user: "Priya Sharma",
      time: "4 hours ago",
      icon: <FundOutlined />,
    },
    {
      id: 3,
      type: "event",
      action: "Event created",
      user: "Admin",
      time: "1 day ago",
      icon: <CalendarOutlined />,
    },
    {
      id: 4,
      type: "project",
      action: "Project status updated",
      user: "Team Lead",
      time: "2 days ago",
      icon: <ProjectOutlined />,
    },
  ]);

  // Animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  return (
    <div style={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginTop: 3, marginBottom: 32 }}
      >
        <Row gutter={[24, 24]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <StatsCard {...stat} variants={itemVariants} />
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Recent Activities */}
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <RecentActivitiesList activities={recentActivities} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

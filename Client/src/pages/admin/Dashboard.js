import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [stats, setStats] = useState(null);

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/dashboard/stats");
        setStats(res.data);
      } catch (e) {}
    };
    const fetchActivities = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/dashboard/activities");
        setRecentActivities(res.data || []);
      } catch (e) {}
    };
    fetchStats();
    fetchActivities();
  }, []);

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
          {[
            {
              title: "Total Members",
              value: stats?.totalMembers ?? 0,
              icon: <UsergroupAddOutlined style={{ color: "#007BFF" }} />,
            },
            {
              title: "Active Projects",
              value: stats?.activeProjects ?? 0,
              icon: <ProjectOutlined style={{ color: "#764ba2" }} />,
            },
            {
              title: "Total Donations",
              value: stats?.totalDonations ?? 0,
              icon: <FundOutlined style={{ color: "#28A745" }} />,
              formatter: (val) => `₹${(val / 100000).toFixed(1)}L`,
              color: "#28A745",
            },
            {
              title: "Active Volunteers",
              value: stats?.activeVolunteers ?? 0,
              icon: <TeamOutlined style={{ color: "#17A2B8" }} />,
            },
            {
              title: "Events This Month",
              value: stats?.eventsThisMonth ?? 0,
              icon: <CalendarOutlined style={{ color: "#FFC107" }} />,
            },
          ].map((stat, index) => (
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

import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import StatCard from "../../components/StatCard";
import UserTable from "../../components/UserTable";
import axios from "axios";


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/users");
        const usersData = response.data;
        setUsers(usersData);
        const totalUsers = usersData.length;
        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
        const newToday = usersData.filter(user => user.createdAt?.split("T")[0] === today).length;
        setStats({ totalUsers, newToday });
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "0px", margin: "0px", marginTop: "0px", marginBottom: "0px" }}>
      {/* Stats Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 10 }}>
        <Col xs={24} sm={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              prefix={<TeamOutlined style={{ color: "#1890ff" }} />}
              bgColor="#f0f5ff"
            />
          </motion.div>
        </Col>
        <Col xs={24} sm={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StatCard
              title="New Today"
              value={stats.newToday}
              prefix={<UserOutlined style={{ color: "#faad14" }} />}
              bgColor="#fffbe6"
            />
          </motion.div>
        </Col>
        {/* Add more StatCard components as needed */}
      </Row>

      {/* Users Table */}
      <UserTable users={users} />
    </div>
  );
};

export default AdminUsers;

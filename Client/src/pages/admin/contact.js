import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import {
  FormOutlined,
  MessageOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import StatCard from "../../components/StatCard";
import ContactTable from "../../components/ContactTable";
import MessageModal from "../../components/MessageModal";



const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleView = (record) => {
    setSelectedMessage(record);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMessage(null);
  };

  useEffect(() => {
  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/contact");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data);

      // Calculate stats
      const totalMessages = data.length;
      const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
      const todaysMessages = data.filter(
        (msg) => msg.createdAt?.split("T")[0] === today
      ).length;

      setStats({ totalMessages, todaysMessages});
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchContacts();
}, []);

  return (
    <div style={{ padding: 0 }}>
      {/* Stats Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 10 }}>
        <Col xs={24} sm={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <StatCard
              title="Total Messages"
              value={stats.totalMessages}
              prefix={<FormOutlined style={{ color: "#1890ff" }} />}
              bgColor="#f0f5ff"
            />
          </motion.div>
        </Col>
        <Col xs={24} sm={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StatCard
              title="Today's Messages"
              value={stats.todaysMessages}
              prefix={<MessageOutlined style={{ color: "#faad14" }} />}
              bgColor="#fffbe6"
            />
          </motion.div>
        </Col>
      </Row>

      {/* Contact Table */}
      <ContactTable contacts={contacts} onView={handleView} />

      {/* Message Modal */}
      <MessageModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        message={selectedMessage}
      />
    </div>
  );
};

export default AdminContact;

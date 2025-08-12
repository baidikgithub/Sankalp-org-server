import React from "react";
import { motion } from "framer-motion";
import { Space, Avatar, Typography } from "antd";

const { Text } = Typography;

const ContactInfoList = ({ contactInfo }) => (
  <Space direction="vertical" style={{ width: "100%" }}>
    {contactInfo.map((info, idx) => (
      <motion.div key={idx} whileHover={{ scale: 1.02 }}>
        <Space>
          <Avatar style={{ background: "linear-gradient(135deg,#007BFF,#0056b3)" }} icon={info.icon} />
          <div>
            <Text strong>{info.title}</Text>
            <br />
            {info.link ? <a href={info.link}>{info.value}</a> : <Text>{info.value}</Text>}
          </div>
        </Space>
      </motion.div>
    ))}
  </Space>
);

export default ContactInfoList;

import React from "react";
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const ContactTable = ({ contacts, onView }) => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => onView(record)}
        />
      ),
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={contacts}
      rowKey={(record) => record.email + record.createdAt}
      pagination={false}
    />
  );
};

export default ContactTable;

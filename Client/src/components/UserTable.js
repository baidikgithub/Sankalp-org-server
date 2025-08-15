import React from "react";
import { Table } from "antd";
import WhatsAppButton from "./WhatsAppButton";

const UserTable = ({ users }) => {
  const columns = [
    { title: <span style={{fontSize: "12px"}}>Registration Time</span>, 
    dataIndex: "registrationTime", 
    key: "registrationTime",
    render: (text) => <span style={{ fontSize: "12px" }}>{text}</span> },
    { title: <span style={{fontSize: "12px"}}>Name</span>, dataIndex: "name", key: "name", render: (text) => <span style={{ fontSize: "12px" }}>{text}</span> },
    { title: <span style={{fontSize: "12px"}}>Email</span>, dataIndex: "email", key: "email", render: (text) => <span style={{ fontSize: "12px" }}>{text}</span> },
    // {
    //   title: <span style={{fontSize: "12px"}}>Actions</span>,
    //   key: "action",
    //   render: (_, record) => <WhatsAppButton phone={record.phone} />,
    // },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={users}
      rowKey="_id"
      pagination={false}
    />
  );
};

export default UserTable;

import React from 'react';
import { Table, Tag, Button, Space, Tooltip } from 'antd';
import { EditOutlined, UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';

const MemberTable = ({ members, onStatusChange, onEdit, size = 'small' }) => {
  const columns = [
   { title: <span style={{ fontSize: "12px" }}>Name</span>, dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
   { title: <span style={{ fontSize: "12px" }}>Email</span>, dataIndex: 'email', sorter: (a, b) => a.email.localeCompare(b.email) },
   { title: <span style={{ fontSize: "12px" }}>Phone</span>, dataIndex: 'phone' },
   { title: <span style={{ fontSize: "12px" }}>Age</span>, dataIndex: 'age', sorter: (a, b) => a.age - b.age },
   { title: <span style={{ fontSize: "12px" }}>Occupation</span>, dataIndex: 'occupation' },
    { title: <span style={{ fontSize: "12px" }}>Role</span>, dataIndex: 'role', render: role => <Tag color={role === 'Admin' ? 'blue' : role === 'Member' ? 'green' : 'orange'}>{role.toUpperCase()}</Tag> },
    { title: <span style={{ fontSize: "12px" }}>Location</span>, dataIndex: 'location' },
    { title: <span style={{ fontSize: "12px" }}>Join Date</span>, dataIndex: 'joinDate', render: d => new Date(d).toLocaleDateString() },
    { title: <span style={{ fontSize: "12px" }}>Status</span>, dataIndex: 'status', render: s => <Tag color={s === 'active' ? 'success' : 'error'}>{s.toUpperCase()}</Tag> },
    {
      title: <span style={{ fontSize: "12px" }}>Actions</span>,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit"><Button size="small" icon={<EditOutlined />} onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title={record.status === 'active' ? 'Deactivate' : 'Activate'}>
            <Button
              size="small"
              type={record.status === 'active' ? 'default' : 'primary'}
              danger={record.status === 'active'}
              icon={record.status === 'active' ? <UserDeleteOutlined /> : <UserAddOutlined />}
              onClick={() => onStatusChange(record.id, record.status === 'active' ? 'inactive' : 'active')}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return <Table size={size} columns={columns} dataSource={members} rowKey="id" />;
};

export default MemberTable;
  
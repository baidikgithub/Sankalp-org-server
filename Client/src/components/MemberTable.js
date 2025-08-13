import React from 'react';
import { Table, Tag, Button, Space, Tooltip } from 'antd';
import { EditOutlined, UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';

const MemberTable = ({ members, onStatusChange, onEdit, size = 'small' }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Email', dataIndex: 'email', sorter: (a, b) => a.email.localeCompare(b.email) },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Role', dataIndex: 'role', render: role => <Tag color={role === 'Admin' ? 'blue' : role === 'Member' ? 'green' : 'orange'}>{role.toUpperCase()}</Tag> },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Join Date', dataIndex: 'joinDate', render: d => new Date(d).toLocaleDateString() },
    { title: 'Status', dataIndex: 'status', render: s => <Tag color={s === 'active' ? 'success' : 'error'}>{s.toUpperCase()}</Tag> },
    {
      title: 'Actions',
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
  
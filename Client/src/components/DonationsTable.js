import React from 'react';
import { Table, Button, Space, Tooltip, Typography } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

const DonationsTable = ({ data, columns }) => (
  <Table
    columns={columns}
    dataSource={data}
    rowKey="id"
    size="small"
    style={{ border: "none" }}
  />
);

export default DonationsTable;

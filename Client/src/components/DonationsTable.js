import React from 'react';
import { Table } from 'antd';

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

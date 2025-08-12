import React from 'react';
import { Row, Col, Input, Select, Button, Space } from 'antd';
import { SearchOutlined, UserAddOutlined, ClearOutlined } from '@ant-design/icons';

const MemberFilters = ({
  searchTerm, onSearchChange, statusFilter, onStatusFilterChange, roleFilter, onRoleFilterChange, onAddMember, onClearFilters, compact = true
}) => {
  const handleClearFilters = () => {
    onSearchChange('');
    onStatusFilterChange('all');
    onRoleFilterChange('all');
    if (onClearFilters) onClearFilters();
  };
  const hasFilters = searchTerm || statusFilter !== 'all' || roleFilter !== 'all';

  return (
    <div style={{ background: 'white', padding: compact ? 8 : 20, borderRadius: 6, marginBottom: compact ? 12 : 20 }}>
      <Row gutter={[8, 8]} align="middle">
        <Col xs={24} sm={12} md={8}>
          <Input
            size={compact ? 'small' : 'large'}
            placeholder="Search members..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
          />
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Select size={compact ? 'small' : 'large'} value={statusFilter} onChange={onStatusFilterChange} style={{ width: '100%' }}>
            <Select.Option value="all">All Status</Select.Option>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Select size={compact ? 'small' : 'large'} value={roleFilter} onChange={onRoleFilterChange} style={{ width: '100%' }}>
            <Select.Option value="all">All Roles</Select.Option>
            <Select.Option value="Member">Member</Select.Option>
            <Select.Option value="Volunteer">Volunteer</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>
        </Col>

        <Col xs={24} sm={24} md={8} style={{ textAlign: 'right' }}>
          <Space size={compact ? 4 : 8}>
            {hasFilters && (
              <Button size={compact ? 'small' : 'large'} onClick={handleClearFilters} icon={<ClearOutlined />}>
                Clear
              </Button>
            )}
            <Button
              type="primary"
              size={compact ? 'small' : 'large'}
              icon={<UserAddOutlined />}
              onClick={onAddMember}
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
            >
              Add
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default MemberFilters;

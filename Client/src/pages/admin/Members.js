import React, { useState } from 'react';
import { message, Space, Typography, Card } from 'antd';
import { motion } from 'framer-motion';
import MemberTable from '../../components/MemberTable';
import AddMemberForm from '../../components/AddMemberForm';
import MemberFilters from '../../components/MemberFilters';
import MemberStats from '../../components/MemberStats';

const { Title } = Typography;

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const Members = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Rahul Kumar', email: 'rahul.kumar@email.com', phone: '+91 98765 43210', joinDate: '2023-01-15', status: 'active', role: 'Volunteer', location: 'Mumbai, Maharashtra' },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 87654 32109', joinDate: '2023-02-20', status: 'active', role: 'Member', location: 'Delhi, NCR' },
    { id: 3, name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 76543 21098', joinDate: '2023-03-10', status: 'inactive', role: 'Volunteer', location: 'Bangalore, Karnataka' },
    { id: 4, name: 'Neha Singh', email: 'neha.singh@email.com', phone: '+91 65432 10987', joinDate: '2023-04-05', status: 'active', role: 'Member', location: 'Chennai, Tamil Nadu' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleAddMember = async (values) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newMember = { id: Math.max(...members.map(m => m.id), 0) + 1, ...values, joinDate: new Date().toISOString().split('T')[0], status: 'active' };
      setMembers(prev => [...prev, newMember]);
      setShowAddForm(false);
      message.success('Member added successfully!');
    } catch {
      message.error('Failed to add member.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = async (values) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMembers(prev => prev.map(member => member.id === editingMember.id ? { ...member, ...values } : member));
      setEditingMember(null);
      message.success('Member updated successfully!');
    } catch {
      message.error('Failed to update member.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (memberId, newStatus) => {
    setMembers(prev => prev.map(member => member.id === memberId ? { ...member, status: newStatus } : member));
    message.success(`Member ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
    setEditingMember(null);
  };

  return (
    <div style={{  padding: '0 0px 0px', marginTop: 0 }}>
      
      <Space direction="vertical" size={12} style={{ width: '100%', marginTop: 0 }}>
        
        {/* Stats */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card style={{ borderRadius: 0, marginBottom: 0 }} bodyStyle={{ padding: 12 }}>
            <MemberStats members={members} compact />
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card style={{ borderRadius: 6, marginBottom: 0 }} bodyStyle={{ padding: 12 }}>
            <MemberFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
              onAddMember={() => setShowAddForm(true)}
              compact
            />
          </Card>
        </motion.div>

        {/* Table */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card style={{ borderRadius: 6, overflow: 'hidden', marginBottom: 0 }} bodyStyle={{ padding: 0 }}>
            <MemberTable
              members={filteredMembers}
              onStatusChange={handleStatusChange}
              onEdit={setEditingMember}
              size="small"
            />
          </Card>
        </motion.div>

      </Space>

      {/* Add Member Modal */}
      <AddMemberForm
        visible={showAddForm}
        onCancel={handleFormCancel}
        onSubmit={handleAddMember}
        loading={loading}
        title="Add New Member"
        compact
      />

      {/* Edit Member Modal */}
      <AddMemberForm
        visible={!!editingMember}
        onCancel={handleFormCancel}
        onSubmit={handleEditMember}
        loading={loading}
        initialValues={editingMember}
        title="Edit Member"
        compact
      />
    </div>
  );
};

export default Members;

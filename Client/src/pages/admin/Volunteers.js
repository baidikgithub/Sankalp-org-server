import React, { useState, useEffect } from 'react';
import { message, Space, Card } from 'antd';
import { motion } from 'framer-motion';
import MemberTable from '../../components/MemberTable';
import AddVolunteerForm from '../../components/AddVolunteerForm';
import MemberFilters from '../../components/MemberFilters';
import MemberStats from '../../components/MemberStats';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      console.log("Fetching members...");
      const res = await axios.get('http://localhost:5001/api/volunteers');
      setMembers(res.data);
    } catch (err) {
      message.error("Failed to fetch members.");
    }
  };
  const handleSubmit = async (values) => {
    try {
      console.log("Form Submitted:", values);

      const response = await axios.post("http://localhost:5001/api/volunteers", values);

      console.log("Success:", response.data);
      alert("Volunteer registered successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch =
      (member?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (member?.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (member?.phone || "").includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const interestOptions = [
    "Teaching",
    "Healthcare",
    "Animal Care",
    "Environment",
    "Fundraising",
    "Event Management",
    "Technical Support",
  ];

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
    <div style={{ padding: '0 0px 0px', marginTop: 0 }}>

      <Space direction="vertical" size={12} style={{ width: '100%', marginTop: 0, border: 'none' }}>

        {/* Stats */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card style={{ borderRadius: 0, marginBottom: 0, border: 'none' }} bodyStyle={{ padding: 12 }}>
            <MemberStats members={members} compact />
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
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
        </motion.div>

        {/* Table */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <MemberTable
            members={filteredMembers}
            onStatusChange={handleStatusChange}
            onEdit={setEditingMember}
            size="small"
          />
        </motion.div>

      </Space>

      {/* Add Member Modal */}
      {/* Add Member Modal */}
      <AddVolunteerForm
        visible={showAddForm}
        onCancel={() => setShowAddForm(false)}
        onFinish={handleSubmit}
        loading={loading}
        interestOptions={interestOptions}
      />

      {/* Edit Member Modal */}
      <AddVolunteerForm
        visible={!!editingMember}
        onCancel={handleFormCancel}
        onFinish={handleEditMember}   // ✅ FIXED
        loading={loading}
        interestOptions={interestOptions}
        initialValues={editingMember} // ✅ FIXED
      />

    </div>
  );
};

export default Members;

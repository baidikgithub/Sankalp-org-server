import api from './api';

// Emergency API functions
export const emergencyApi = {
  // Get all emergency requests
  getAllEmergencies: (params = {}) => {
    return api.get('/admin/emergencies', { params });
  },

  // Get emergency by ID
  getEmergencyById: (id) => {
    return api.get(`/admin/emergencies/${id}`);
  },

  // Get emergency statistics
  getEmergencyStats: () => {
    return api.get('/admin/emergencies/stats');
  },

  // Update emergency status
  updateEmergencyStatus: (id, data) => {
    return api.put(`/admin/emergencies/${id}/status`, data);
  },

  // Assign volunteer to emergency
  assignVolunteer: (id, data) => {
    return api.put(`/admin/emergencies/${id}/assign`, data);
  },

  // Create new emergency
  createEmergency: (data) => {
    return api.post('/admin/emergencies', data);
  }
};

// Messages API functions
export const messageApi = {
  // Get all conversations
  getConversations: (params = {}) => {
    return api.get('/admin/messages/conversations', { params });
  },

  // Get messages for a conversation
  getConversationMessages: (conversationId, params = {}) => {
    return api.get(`/admin/messages/conversations/${conversationId}/messages`, { params });
  },

  // Mark messages as read
  markMessagesAsRead: (conversationId) => {
    return api.put(`/admin/messages/conversations/${conversationId}/read`);
  },

  // Get message statistics
  getMessageStats: () => {
    return api.get('/admin/messages/stats');
  },

  // Delete conversation
  deleteConversation: (conversationId) => {
    return api.delete(`/admin/messages/conversations/${conversationId}`);
  }
};

// Combined admin API
export const adminApi = {
  emergency: emergencyApi,
  messages: messageApi
};

export default adminApi;


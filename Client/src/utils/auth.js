// Utility functions for authentication and user management

// Decode JWT token to get user information
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Get user information from localStorage token
export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const decoded = decodeToken(token);
    if (!decoded) return null;
    
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name || 'User'
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const isLoggedInFlag = localStorage.getItem('isLoggedIn');
  return !!(token && isLoggedInFlag === 'true');
};

// Get user display name
export const getUserDisplayName = (user) => {
  if (!user) return 'Anonymous User';
  return user.name || user.email || 'User';
};


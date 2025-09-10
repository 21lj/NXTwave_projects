import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleBasedRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return <Navigate to="/student/dashboard" />;
  }
};

export default RoleBasedRedirect;

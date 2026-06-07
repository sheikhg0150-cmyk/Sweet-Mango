import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="loading">Loading...</div>;
  
  if (!isAuthenticated) return <Navigate to="/login" />;

  // If a role is required and the user doesn't have it, redirect to home
  if (role && user?.role !== role && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/storage';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default AdminRoute;

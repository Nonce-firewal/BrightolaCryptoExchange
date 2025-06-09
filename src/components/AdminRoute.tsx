import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Redirect to admin login if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login\" replace />;
  }

  // Redirect to admin dashboard if trying to access landing page while logged in as admin
  if (location.pathname === '/') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
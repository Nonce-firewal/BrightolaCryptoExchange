import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated or if admin trying to access user routes
  if (!isAuthenticated || isAdmin) {
    return <Navigate to="/login\" replace />;
  }

  // Redirect to dashboard if trying to access landing page while logged in
  if (location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
import React from 'react';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isLoggedIn();
  
  if (!isAuthenticated) {
    return window.location.href = '/login';
  }

  return children;
};

export default ProtectedRoute;

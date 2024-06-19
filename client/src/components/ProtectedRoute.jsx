import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (!isAdmin) {
    return <Navigate to="/home" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;

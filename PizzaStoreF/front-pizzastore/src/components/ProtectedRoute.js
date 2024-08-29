import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'; // Ensure this path is correct

const ProtectedRoute = ({ element: Element, adminOnly = false, ...rest }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (adminOnly && role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;

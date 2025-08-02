// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If a user is logged in, render the child component (the protected page)
  return children;
}

export default ProtectedRoute;
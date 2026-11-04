import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // If not logged in, redirect to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected component
  return children;
}
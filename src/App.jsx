import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Helper component to redirect root "/" based on login state
function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/students' : '/login'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path automatically based on auth state */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
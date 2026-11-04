import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get the auth token from our custom hook
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  //Handle Logout action
  const handleLogout = () => {
    // Clears state and localStorage token
    logout();
    // Redirects user to login page
    navigate('/login');
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch data with Authorization header containing JWT token
        const response = await fetch('http://localhost:3000/api/students', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch students');
        }

        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Stop showing loading indicator once request finishes
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  // Loading State
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading students...</div>;
  }

  // Error State
  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
      <h2>Student Directory</h2>

      <div style={{ margin: '30px 0' }}>
        {students.length === 0 ? (
          <p style={{ color: '#666' }}>No students found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {students.map((student) => (
              <li
                key={student._id || student.id}
                style={{
                  padding: '12px',
                  borderBottom: '1px solid #ddd',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <strong>{student.name}</strong>
                <span style={{ color: '#666' }}>{student.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        Logout
      </button>
    </div>
  );
}
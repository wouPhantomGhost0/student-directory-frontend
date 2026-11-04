import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  // 1. Controlled inputs state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for handling error messages
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on submit

    try {
      // Send login request to backend
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // 2. Pass user and token to AuthContext
      login(data.user, data.token);

      // 3. Redirect to /students on success
      navigate('/students');
    } catch (err) {
      // 4. Display error message on failure
      setError(err.message);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      {/* Show error message if login fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}
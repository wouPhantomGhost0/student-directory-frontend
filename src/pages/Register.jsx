import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  // 1. Controlled inputs state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error messages
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // 2. Send POST request to the register endpoint
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // 3. Show error message (e.g., 409 Conflict if email exists)
        throw new Error(data.message || 'Registration failed');
      }

      // 4. Redirect to /login on success
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>

      {/* Show error message if registration fails */}
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
          Register Account
        </button>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', background: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#2c1810' }}>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#ff8c00', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '5px', textAlign: 'center' }}>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Demo Credentials:</p>
        <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>Email: admin@mangostore.com</p>
        <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>Password: admin123</p>
      </div>
    </div>
  );
};

export default Login;
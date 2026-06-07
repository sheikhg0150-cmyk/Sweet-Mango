import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }
    const success = await register(name, email, password);
    if (success) {
      toast.success('Welcome aboard!');
      navigate('/');
    } else {
      toast.error('Signup failed');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '2rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#ff8c00' }}>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

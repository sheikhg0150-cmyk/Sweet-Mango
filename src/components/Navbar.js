import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ color: '#ff8c00', fontSize: '1.5rem', textDecoration: 'none' }}>🥭 Sweet Mangoes</Link>
        
        <button onClick={toggleMenu} className="menu-toggle">
          ☰
        </button>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Mangoes</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
          {user ? (
            <>
              <Link to="/admin" style={{ background: '#ff8c00', color: '#2c1810', padding: '8px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>Admin</Link>
              <button onClick={logout} style={{ background: '#f44336', color: 'white', padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ background: '#ff8c00', color: '#2c1810', padding: '8px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
          )}
          <a href="https://wa.me/923001234567" style={{ background: '#25D366', color: 'white', padding: '8px 20px', borderRadius: '50px', textDecoration: 'none' }}>📱 WhatsApp</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
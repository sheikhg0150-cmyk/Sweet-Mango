import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { toggleTheme, theme } = useContext(ThemeContext);

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
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            🛒 Cart {cartCount > 0 && <span style={{ background: '#f44336', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem', marginLeft: '5px' }}>{cartCount}</span>}
          </Link>
          <Link to="/rider" style={{ color: 'white', textDecoration: 'none' }}>Rider</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
          {user ? (
            <>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>My Account</Link>
              <Link to="/admin" style={{ background: '#ff8c00', color: '#2c1810', padding: '8px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>Admin</Link>
              <button onClick={logout} style={{ background: '#f44336', color: 'white', padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ background: '#ff8c00', color: '#2c1810', padding: '8px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
              <Link to="/signup" style={{ background: '#ff8c00', color: '#2c1810', padding: '8px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', marginLeft: '8px' }}>Sign Up</Link>
            </>
          )}
          <a href="https://wa.me/923285306913" style={{ background: '#25D366', color: 'white', padding: '8px 20px', borderRadius: '50px', textDecoration: 'none' }}>📱 WhatsApp</a>
          <button onClick={toggleTheme} style={{ background: theme === 'light' ? '#2c1810' : '#ff8c00', color: theme === 'light' ? 'white' : '#2c1810', padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer', marginLeft: '8px' }}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
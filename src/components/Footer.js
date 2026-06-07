import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#2c1810', color: 'white', padding: '3rem 2rem 1rem', marginTop: '4rem' }}>
      <div className="container grid-3" style={{ gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ color: '#ff8c00', marginBottom: '1rem' }}>🥭 Sweet Mangoes</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            Delivering farm-fresh, export-quality premium mangoes directly from Multan and Sindh to your doorstep in Rawalpindi & Islamabad.
          </p>
        </div>
        
        <div>
          <h3 style={{ color: '#ff8c00', marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/products" style={{ color: '#ccc', textDecoration: 'none' }}>Shop Mangoes</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: '#ff8c00', marginBottom: '1rem' }}>Customer Service</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/terms" style={{ color: '#ccc', textDecoration: 'none' }}>Terms & Conditions</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/privacy" style={{ color: '#ccc', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/refund" style={{ color: '#ccc', textDecoration: 'none' }}>Refund & Return Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', borderTop: '1px solid #444', paddingTop: '1.5rem', color: '#888' }}>
        <p>&copy; {new Date().getFullYear()} Sweet Mangoes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

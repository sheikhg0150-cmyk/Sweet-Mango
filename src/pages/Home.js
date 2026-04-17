import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="hero" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1553279768-865429fa0078)'
      }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sweet Mangoes</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Farm-Fresh Mangoes From Punjab Orchards</p>
          <Link to="/products" className="btn-primary" style={{ textDecoration: 'none' }}>Order Now →</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <div>🎯</div>
          <h3>24-Hour Delivery</h3>
          <p>Next-day delivery in major cities</p>
        </div>
        <div className="feature-card">
          <div>📹</div>
          <h3>Farm Verified</h3>
          <p>Video proof from orchards</p>
        </div>
        <div className="feature-card">
          <div>🔄</div>
          <h3>Zero Damage</h3>
          <p>100% replacement guarantee</p>
        </div>
        <div className="feature-card">
          <div>🌳</div>
          <h3>Tree Ripened</h3>
          <p>No chemicals, naturally sweet</p>
        </div>
      </div>
      
      <div style={{ background: 'linear-gradient(135deg, #ff4444, #ff8c00)', color: 'white', textAlign: 'center', padding: '20px' }}>
        <span style={{ background: 'white', color: '#ff4444', padding: '5px 15px', borderRadius: '20px' }}>🔥 SEASON LIVE 2026</span>
        <p style={{ marginTop: '10px' }}>Chaunsa & Sindhri now available • Free delivery on orders above 5kg</p>
      </div>
    </div>
  );
};

export default Home;
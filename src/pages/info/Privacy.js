import React from 'react';

const Privacy = () => {
  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff8c00', textAlign: 'center', marginBottom: '2rem' }}>Privacy Policy</h1>
      <div style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', lineHeight: '1.8' }}>
        <h2>1. Information We Collect</h2>
        <p>When you place an order, we collect your name, phone number, delivery address, and email address to fulfill your order and provide updates.</p>
        
        <h2>2. How We Use Your Information</h2>
        <p>Your information is used strictly for delivery purposes, customer support, and, if you opt-in, promotional offers regarding new mango seasons.</p>
        
        <h2>3. Data Protection</h2>
        <p>We implement security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
      </div>
    </div>
  );
};

export default Privacy;

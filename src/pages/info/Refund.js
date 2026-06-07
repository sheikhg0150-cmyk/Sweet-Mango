import React from 'react';

const Refund = () => {
  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff8c00', textAlign: 'center', marginBottom: '2rem' }}>Refund & Return Policy</h1>
      <div style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', lineHeight: '1.8' }}>
        <h2>1. Quality Guarantee</h2>
        <p>We pride ourselves on providing premium, export-quality mangoes. If you receive mangoes that are spoiled or damaged during transit, please contact us within 24 hours of delivery.</p>
        
        <h2>2. How to Request a Refund</h2>
        <p>Take clear photos of the damaged items and send them to our WhatsApp support number. Our team will review your claim and process a replacement crate or a full/partial refund based on the issue.</p>
        
        <h2>3. Non-Returnable Items</h2>
        <p>Because mangoes are perishable goods, we do not accept returns simply for a change of mind after the delivery has been completed and accepted.</p>
      </div>
    </div>
  );
};

export default Refund;

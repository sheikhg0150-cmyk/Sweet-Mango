import React from 'react';

const Terms = () => {
  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff8c00', textAlign: 'center', marginBottom: '2rem' }}>Terms & Conditions</h1>
      <div style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', lineHeight: '1.8' }}>
        <h2>1. Introduction</h2>
        <p>By using the Sweet Mangoes website, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>
        
        <h2>2. Delivery</h2>
        <p>We currently only deliver to Rawalpindi and Islamabad. Deliveries are typically made within 24-48 hours. Sweet Mangoes is not liable for delays caused by unforeseen circumstances.</p>
        
        <h2>3. Pricing & Payments</h2>
        <p>All prices are in Pakistani Rupees (PKR). We offer Cash on Delivery (COD) and various online payment methods. Prices are subject to change without prior notice.</p>
        
        <h2>4. Product Availability</h2>
        <p>Mangoes are a seasonal product. Availability and sizes depend on the harvest. In case an ordered product goes out of stock, we will notify you and offer a replacement or refund.</p>
      </div>
    </div>
  );
};

export default Terms;

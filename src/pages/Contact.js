import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will contact you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '15px' }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows="5" style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <button type="submit" style={{ background: '#ff8c00', color: 'white', padding: '15px', width: '100%', border: 'none', borderRadius: '10px' }}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
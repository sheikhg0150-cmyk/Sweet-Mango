import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const savedNumber = localStorage.getItem('adminWhatsApp');
    if (savedNumber) {
      setWhatsappNumber(savedNumber);
    } else {
      setWhatsappNumber('923001234567');
    }
  }, []);

  const handleSave = () => {
    if (!whatsappNumber || whatsappNumber.length < 10) {
      toast.error('Please enter a valid WhatsApp number');
      return;
    }
    
    localStorage.setItem('adminWhatsApp', whatsappNumber);
    toast.success('WhatsApp number saved successfully!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1rem' }}>📱 Admin Settings</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Set WhatsApp number for customer support. This number will be shown to customers after order placement.
        </p>
        
        <div className="form-group">
          <label>WhatsApp Number (without +)</label>
          <input 
            type="tel" 
            value={whatsappNumber} 
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="e.g., 923001234567"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            Format: Country code + number (e.g., 923001234567 for Pakistan)
          </small>
        </div>
        
        <button onClick={handleSave} className="btn-primary" style={{ marginTop: '1rem' }}>
          💾 Save Settings
        </button>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '10px' }}>
          <h4>Current Settings:</h4>
          <p>📞 Customer Support WhatsApp: <strong>{whatsappNumber}</strong></p>
          <p>🔗 Preview Link: <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">Click to test</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

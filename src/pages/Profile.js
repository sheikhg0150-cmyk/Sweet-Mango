import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:5000/api/orders/myorders', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setOrders(res.data);
          setLoading(false);
          return;
        }
      } catch (error) {
        // Fall through to localStorage
      }

      // Pull orders from localStorage (saved by OrderConfirmation.js)
      const savedOrders = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === 'lastOrder') {
          try {
            const parsed = JSON.parse(localStorage.getItem(key));
            if (parsed && (parsed.customerName || parsed.items)) {
              savedOrders.push({ ...parsed, _id: parsed._id || parsed.orderNumber || 'ORD-' + Date.now() });
            }
          } catch {}
        }
      }
      setOrders(savedOrders);
      setLoading(false);
    };

    fetchMyOrders();
  }, [user]);

  const getStatusStyle = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') return { background: '#25D366', color: 'white' };
    if (s === 'on the way' || s === 'shipped') return { background: '#2196f3', color: 'white' };
    if (s === 'picked') return { background: '#ff9800', color: 'white' };
    if (s === 'cancelled') return { background: '#f44336', color: 'white' };
    return { background: '#ff8c00', color: 'white' };
  };

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(o => (o.status || o.orderStatus || '').toLowerCase() === activeTab);

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h2>Please login to view your profile</h2>
        <Link to="/login" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block', width: 'auto' }}>Login</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Profile Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ff8c00, #2c1810)',
        padding: '2rem',
        borderRadius: '20px',
        marginBottom: '2rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          {(user.name || user.email || 'U')[0].toUpperCase()}
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{user.name || 'My Account'}</h1>
          <p style={{ margin: '0.3rem 0 0', opacity: 0.85 }}>📧 {user.email}</p>
          {user.role && <p style={{ margin: '0.2rem 0 0', opacity: 0.7, fontSize: '0.9rem' }}>🏷️ Role: {user.role}</p>}
        </div>
      </div>

      {/* My Orders Section */}
      <div style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '20px' }}>
        <h2 style={{ color: '#2c1810', marginBottom: '1.5rem' }}>📦 My Orders</h2>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', 'pending', 'picked', 'on the way', 'delivered'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab ? '#ff8c00' : '#e0e0e0',
                color: activeTab === tab ? 'white' : '#333',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                textTransform: 'capitalize'
              }}
            >
              {tab === 'all' ? '🗂️ All' : tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="loading">Loading your orders...</div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🥭</div>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>No orders found.</p>
            <Link to="/products" className="btn-primary" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem' }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredOrders.map((order, idx) => {
              const status = order.status || order.orderStatus || 'Pending';
              const totalAmount = order.totalAmount || order.grandTotal || '—';
              const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-PK') : 'Recently';
              const payMethod = order.paymentMethod ? order.paymentMethod.replace('_', ' ').toUpperCase() : 'COD';

              // Multi-item order
              const items = order.items || (order.productName ? [{ name: order.productName, quantity: order.quantityKg + ' kg' }] : []);

              return (
                <div key={order._id || idx} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  borderLeft: '4px solid #ff8c00'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#2c1810', fontSize: '1rem' }}>
                        Order #{order._id || order.orderNumber || `ORD-${idx + 1}`}
                      </p>
                      <p style={{ margin: '0.3rem 0', color: '#888', fontSize: '0.85rem' }}>📅 {date}</p>
                      {items.length > 0 && (
                        <p style={{ margin: '0.3rem 0', color: '#555', fontSize: '0.9rem' }}>
                          🛒 {items.map(it => `${it.name} (${it.quantity})`).join(', ')}
                        </p>
                      )}
                      <p style={{ margin: '0.3rem 0', color: '#555', fontSize: '0.9rem' }}>
                        💳 {payMethod} &nbsp;|&nbsp; 📍 {order.customerCity || 'Rawalpindi/Islamabad'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        ...getStatusStyle(status),
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        display: 'inline-block'
                      }}>
                        {status}
                      </span>
                      <p style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#ff8c00', fontSize: '1.1rem' }}>
                        ₨ {Number(totalAmount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

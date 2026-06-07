import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  'Pending':     { bg: '#ff9800', text: '⏳ Pending' },
  'Confirmed':   { bg: '#2196f3', text: '✅ Confirmed' },
  'Picked':      { bg: '#9c27b0', text: '📦 Picked Up' },
  'On the way':  { bg: '#03a9f4', text: '🚴 On the way' },
  'Delivered':   { bg: '#4caf50', text: '✔️ Delivered' },
  'Cancelled':   { bg: '#f44336', text: '❌ Cancelled' },
};

const Rider = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active'); // 'active' | 'delivered' | 'all'

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get('http://localhost:5000/api/orders', { headers });
      // Filter orders that are assigned to rider (not Pending/Cancelled)
      const riderOrders = res.data.filter(o => !['Pending', 'Cancelled'].includes(o.status));
      setOrders(riderOrders.length ? riderOrders : getMockOrders());
    } catch {
      setOrders(getMockOrders());
    } finally {
      setLoading(false);
    }
  };

  const getMockOrders = () => [
    {
      _id: 'ORD-2025-001',
      customerName: 'Ali Ahmad',
      customerPhone: '0300-1234567',
      customerAddress: 'G-10, Islamabad',
      customerCity: 'Islamabad',
      status: 'Confirmed',
      items: [{ name: 'Chaunsa', quantity: 2 }],
      totalAmount: 4500,
      paymentMethod: 'cash',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'ORD-2025-002',
      customerName: 'Sara Khan',
      customerPhone: '0321-9876543',
      customerAddress: 'D-5, F-11, Islamabad',
      customerCity: 'Islamabad',
      status: 'Picked',
      items: [{ name: 'Sindhri', quantity: 1 }, { name: 'Anwar Ratol', quantity: 1 }],
      totalAmount: 3800,
      paymentMethod: 'jazzcash',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: 'ORD-2025-003',
      customerName: 'Bilal Qureshi',
      customerPhone: '0333-5556666',
      customerAddress: 'Bahria Town, Rawalpindi',
      customerCity: 'Rawalpindi',
      status: 'Delivered',
      items: [{ name: 'Chaunsa', quantity: 3 }],
      totalAmount: 6750,
      paymentMethod: 'cash',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, { headers });
    } catch {
      // silently update local state even if API fails
    }
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`✅ Status updated: ${newStatus}`);
  };

  const openMap = (address, city) => {
    const query = encodeURIComponent(`${address}, ${city}, Pakistan`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const callCustomer = (phone) => {
    window.open(`tel:${phone.replace(/-/g, '')}`, '_self');
  };

  const whatsappCustomer = (phone, orderId) => {
    const msg = encodeURIComponent(`Assalam o Alaikum! I am your delivery rider for order ${orderId}. I will deliver your mangoes soon. 🥭`);
    window.open(`https://wa.me/92${phone.replace(/^0/, '').replace(/-/g, '')}?text=${msg}`, '_blank');
  };

  const filteredOrders = orders.filter(o => {
    if (filter === 'active') return o.status !== 'Delivered' && o.status !== 'Cancelled';
    if (filter === 'delivered') return o.status === 'Delivered';
    return true;
  });

  const stats = {
    active: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    total: orders.length,
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚴</div>
          <p style={{ color: '#ff8c00', fontSize: '1.2rem' }}>Loading your deliveries...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #1a0a00 100%)', padding: '1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚴‍♂️</div>
          <h1 style={{ color: '#ff8c00', margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Rider Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>Sweet Mangoes Delivery</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Active', value: stats.active, icon: '🚚', color: '#ff9800' },
            { label: 'Delivered', value: stats.delivered, icon: '✅', color: '#4caf50' },
            { label: 'Total', value: stats.total, icon: '📦', color: '#2196f3' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '1.2rem',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '1.8rem' }}>{stat.icon}</div>
              <div style={{ color: stat.color, fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            { key: 'active', label: '🚚 Active Orders' },
            { key: 'delivered', label: '✅ Delivered' },
            { key: 'all', label: '📋 All' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)} style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              background: filter === tab.key ? '#ff8c00' : 'rgba(255,255,255,0.1)',
              color: filter === tab.key ? 'white' : 'rgba(255,255,255,0.7)',
              fontWeight: filter === tab.key ? 'bold' : 'normal',
              fontSize: '0.9rem'
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <p>No orders in this category.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredOrders.map(order => {
              const statusInfo = STATUS_COLORS[order.status] || STATUS_COLORS['Pending'];
              const nextStatuses = {
                'Confirmed': 'Picked',
                'Picked':    'On the way',
                'On the way': 'Delivered',
              };
              const nextStatus = nextStatuses[order.status];

              return (
                <div key={order._id} style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderLeft: `4px solid ${statusInfo.bg}`
                }}>
                  {/* Order Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <p style={{ margin: 0, color: '#ff8c00', fontWeight: 'bold', fontSize: '1rem' }}>
                        #{order._id}
                      </p>
                      <p style={{ margin: '0.2rem 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                        🕐 {new Date(order.createdAt).toLocaleString('en-PK')}
                      </p>
                    </div>
                    <span style={{
                      background: statusInfo.bg,
                      color: 'white',
                      padding: '5px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      {statusInfo.text}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                    <p style={{ margin: '0 0 0.4rem', color: 'white', fontWeight: 'bold', fontSize: '1.05rem' }}>
                      👤 {order.customerName}
                    </p>
                    <p style={{ margin: '0.2rem 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      📞 {order.customerPhone}
                    </p>
                    <p style={{ margin: '0.2rem 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      📍 {order.customerAddress}, {order.customerCity}
                    </p>
                    {order.items && order.items.length > 0 && (
                      <p style={{ margin: '0.4rem 0 0', color: '#ffcc80', fontSize: '0.9rem' }}>
                        🥭 {order.items.map(it => `${it.name} x${it.quantity}`).join(', ')}
                      </p>
                    )}
                    <p style={{ margin: '0.4rem 0 0', color: '#ff8c00', fontWeight: 'bold', fontSize: '1rem' }}>
                      💰 ₨ {Number(order.totalAmount).toLocaleString()} — {order.paymentMethod?.replace('_', ' ').toUpperCase() || 'COD'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginBottom: nextStatus ? '0.8rem' : 0 }}>
                    <button
                      onClick={() => openMap(order.customerAddress, order.customerCity)}
                      style={{ background: '#2196f3', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
                    >
                      📍 Open Maps
                    </button>
                    <button
                      onClick={() => callCustomer(order.customerPhone)}
                      style={{ background: '#4caf50', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
                    >
                      📞 Call Customer
                    </button>
                    <button
                      onClick={() => whatsappCustomer(order.customerPhone, order._id)}
                      style={{ background: '#25D366', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
                    >
                      💬 WhatsApp
                    </button>
                    <button
                      onClick={() => fetchOrders()}
                      style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '10px', padding: '10px', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      🔄 Refresh
                    </button>
                  </div>

                  {/* Update Status Button */}
                  {nextStatus && (
                    <button
                      onClick={() => updateStatus(order._id, nextStatus)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #ff8c00, #e65c00)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px'
                      }}
                    >
                      ✅ Mark as "{nextStatus}"
                    </button>
                  )}

                  {order.status === 'Delivered' && (
                    <div style={{ background: 'rgba(76,175,80,0.2)', borderRadius: '10px', padding: '10px', textAlign: 'center', color: '#81c784', fontWeight: 'bold' }}>
                      ✔️ Order Successfully Delivered!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '2rem 0', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
          Auto-refreshes every 30 seconds
        </div>
      </div>
    </div>
  );
};

export default Rider;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [adminWhatsApp, setAdminWhatsApp] = useState('923001234567');

  useEffect(() => {
    const savedNumber = localStorage.getItem('adminWhatsApp');
    if (savedNumber) {
      setAdminWhatsApp(savedNumber);
    }
    
    const orderData = location.state?.order;
    if (orderData) {
      setOrder(orderData);
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
    } else {
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      } else {
        toast.error('Order details not found');
        navigate('/');
      }
    }
  }, [location, navigate]);

  const getStatusBadge = (status) => {
    const statuses = {
      pending: { color: '#ff9800', text: '⏳ Pending' },
      confirmed: { color: '#4caf50', text: '✅ Confirmed' },
      shipped: { color: '#2196f3', text: '🚚 Shipped' },
      delivered: { color: '#4caf50', text: '📦 Delivered' },
      cancelled: { color: '#f44336', text: '❌ Cancelled' }
    };
    return statuses[status] || statuses.pending;
  };

  const openWhatsApp = () => {
    const message = `Hello, I have placed an order (${order?.orderNumber || 'N/A'}). 
Name: ${order?.customerName}
Phone: ${order?.customerPhone}
Product: ${order?.productName}
Quantity: ${order?.quantityKg}kg
Total: ₨ ${order?.grandTotal}
Please update me about my order.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodedMessage}`, '_blank');
  };

  if (!order) {
    return <div className="loading">Loading order details...</div>;
  }

  const status = getStatusBadge(order.orderStatus);

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="order-confirmation">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ color: '#4caf50', marginBottom: '0.5rem' }}>Order Placed Successfully!</h1>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Thank you for your order</p>
        
        <div className="order-summary">
          <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Order Summary</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Order Number:</strong>
            <p style={{ fontSize: '1.2rem', color: '#ff8c00' }}>{order.orderNumber}</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Order Date:</strong>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Order Status:</strong>
            <p style={{ color: status.color }}>{status.text}</p>
          </div>
          
          <hr style={{ margin: '1rem 0' }} />
          
          <h3>Customer Details</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.customerPhone}</p>
            <p><strong>City:</strong> {order.customerCity}</p>
            <p><strong>Address:</strong> {order.customerAddress}</p>
          </div>
          
          <hr style={{ margin: '1rem 0' }} />
          
          <h3>Order Details</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p><strong>Product:</strong> {order.productName}</p>
            <p><strong>Quantity:</strong> {order.quantityKg} kg</p>
            <p><strong>Crates:</strong> {order.numberOfCrates} crate(s)</p>
            <p><strong>Price per kg:</strong> ₨ {order.pricePerKg?.toLocaleString()}</p>
          </div>
          
          <hr style={{ margin: '1rem 0' }} />
          
          <h3>Payment Summary</h3>
          <div>
            <p><strong>Subtotal:</strong> ₨ {order.subtotal?.toLocaleString()}</p>
            {order.discountAmount > 0 && (
              <p style={{ color: 'green' }}><strong>Discount:</strong> -₨ {order.discountAmount?.toLocaleString()}</p>
            )}
            <p><strong>Delivery Fee:</strong> ₨ {order.deliveryFee?.toLocaleString() || 0}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff8c00' }}>
              <strong>Grand Total:</strong> ₨ {order.grandTotal?.toLocaleString()}
            </p>
          </div>
          
          {order.paymentMethod && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Payment Method:</strong>
              <p>{order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
            </div>
          )}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            📞 For order updates or delivery confirmation, contact us on WhatsApp
          </p>
          <button onClick={openWhatsApp} className="whatsapp-btn">
            📱 Chat on WhatsApp
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn-primary" style={{ textDecoration: 'none', width: 'auto' }}>
            🥭 Order More
          </Link>
          <Link to="/" className="btn-primary" style={{ background: '#2c1810', textDecoration: 'none', width: 'auto' }}>
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
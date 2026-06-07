import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, 
        { orderStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      confirmed: '#4caf50',
      shipped: '#2196f3',
      delivered: '#9e9e9e',
      cancelled: '#f44336'
    };
    return colors[status] || '#666';
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading orders...</div>;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <h1>Order Management</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '10px', overflow: 'hidden' }}>
          <thead style={{ background: '#2c1810', color: 'white' }}>
            <tr>
              <th style={{ padding: '12px' }}>Order #</th>
              <th style={{ padding: '12px' }}>Customer</th>
              <th style={{ padding: '12px' }}>Product</th>
              <th style={{ padding: '12px' }}>Quantity</th>
              <th style={{ padding: '12px' }}>Total</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>{order.orderNumber || order._id.slice(-6)}</td>
                <td style={{ padding: '12px' }}>
                  {order.customerName}<br/>
                  <small>{order.customerPhone}</small>
                </td>
                <td style={{ padding: '12px' }}>{order.productName}</td>
                <td style={{ padding: '12px' }}>{order.quantityKg} kg</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>₨ {order.grandTotal?.toLocaleString() || order.totalAmount?.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ background: getStatusColor(order.orderStatus), color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    {order.orderStatus}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.orderStatus} style={{ padding: '5px', borderRadius: '5px' }}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

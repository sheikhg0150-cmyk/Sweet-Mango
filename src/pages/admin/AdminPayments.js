import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/reports/payments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaymentData(res.data.summary);
      setPendingOrders(res.data.pendingOrders);
    } catch (error) {
      toast.error('Failed to load payment data');
    } finally {
      setLoading(false);
    }
  };

  const recordPayment = async (orderId) => {
    if (!paymentAmount || paymentAmount <= 0) {
      toast.error('Enter valid amount');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/payment`,
        { paidAmount: parseFloat(paymentAmount), notes: 'Payment recorded' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Payment recorded');
      setSelectedOrder(null);
      setPaymentAmount('');
      fetchPaymentData();
    } catch (error) {
      toast.error('Failed to record payment');
    }
  };

  if (loading) return <div>Loading payment data...</div>;

  return (
    <div className="admin-payments">
      <h1>Payment Management</h1>
      
      <div className="payment-summary">
        <div className="summary-card">
          <h3>Total Pending</h3>
          <p>₨ {paymentData?.pendingAmount?.toLocaleString() || 0}</p>
          <small>{paymentData?.totalPending || 0} orders</small>
        </div>
        <div className="summary-card">
          <h3>Partial Payments</h3>
          <p>₨ {paymentData?.partialAmount?.toLocaleString() || 0}</p>
          <small>{paymentData?.totalPartial || 0} orders</small>
        </div>
        <div className="summary-card success">
          <h3>Completed Payments</h3>
          <p>₨ {paymentData?.completedAmount?.toLocaleString() || 0}</p>
          <small>{paymentData?.totalCompleted || 0} orders</small>
        </div>
      </div>
      
      <div className="payment-methods-breakdown">
        <h2>Payment Methods Breakdown</h2>
        <div className="methods-grid">
          {paymentData && Object.entries(paymentData.byMethod).map(([method, data]) => (
            <div key={method} className="method-card">
              <h4>{method.replace('_', ' ').toUpperCase()}</h4>
              <p>₨ {data.amount.toLocaleString()}</p>
              <small>{data.count} orders</small>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pending-payments">
        <h2>Pending & Partial Payments</h2>
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total Amount</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map(order => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td>{order.customerPhone}</td>
                <td>₨ {order.grandTotal.toLocaleString()}</td>
                <td>₨ {(order.paymentDetails?.paidAmount || 0).toLocaleString()}</td>
                <td>₨ {(order.paymentDetails?.remainingAmount || order.grandTotal).toLocaleString()}</td>
                <td>
                  <span className={`status-${order.paymentStatus}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <button onClick={() => setSelectedOrder(order)} className="btn-small">
                    Record Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Payment Modal */}
      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h2>Record Payment</h2>
            <p>Order: {selectedOrder.orderNumber}</p>
            <p>Customer: {selectedOrder.customerName}</p>
            <p>Total Amount: ₨ {selectedOrder.grandTotal.toLocaleString()}</p>
            <p>Paid: ₨ {(selectedOrder.paymentDetails?.paidAmount || 0).toLocaleString()}</p>
            <p>Remaining: ₨ {(selectedOrder.paymentDetails?.remainingAmount || selectedOrder.grandTotal).toLocaleString()}</p>
            
            <input 
              type="number" 
              placeholder="Payment Amount" 
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              max={selectedOrder.paymentDetails?.remainingAmount || selectedOrder.grandTotal}
            />
            
            <div className="modal-actions">
              <button onClick={() => recordPayment(selectedOrder._id)} className="btn-primary">
                Record Payment
              </button>
              <button onClick={() => setSelectedOrder(null)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;

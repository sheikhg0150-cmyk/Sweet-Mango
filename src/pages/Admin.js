import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Dashboard</h1>
      <div className="admin-stats">
        <Link to="/admin/orders" className="stat-card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '3rem' }}>📦</div>
          <h3>Orders</h3>
          <p>Manage customer orders</p>
        </Link>
        <Link to="/admin/inventory" className="stat-card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '3rem' }}>🥭</div>
          <h3>Inventory</h3>
          <p>Manage products & stock</p>
        </Link>
        <Link to="/admin/reports" className="stat-card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '3rem' }}>📊</div>
          <h3>Reports</h3>
          <p>View sales reports</p>
        </Link>
        <Link to="/admin/payments" className="stat-card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '3rem' }}>💰</div>
          <h3>Payments</h3>
          <p>Track payments</p>
        </Link>
        <Link to="/admin/users" className="stat-card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '3rem' }}>👥</div>
          <h3>Users</h3>
          <p>Manage staff</p>
        </Link>
        <Link to="/admin/settings" className="stat-card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '3rem' }}>⚙️</div>
          <h3>Settings</h3>
          <p>Configure WhatsApp</p>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
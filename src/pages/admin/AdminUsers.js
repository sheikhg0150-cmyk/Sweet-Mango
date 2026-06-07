import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1>User Management</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '10px' }}>
          <thead style={{ background: '#2c1810', color: 'white' }}>
            <tr>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Role</th>
              <th style={{ padding: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>{user.name}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>{user.role}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ color: user.isActive ? 'green' : 'red' }}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

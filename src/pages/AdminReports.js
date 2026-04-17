import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminReports = () => {
  const [dailyReport, setDailyReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [reportType, setReportType] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reportType === 'daily') {
      fetchDailyReport();
    } else {
      fetchMonthlyReport();
    }
  }, [reportType, selectedDate, selectedMonth, selectedYear]);

  const fetchDailyReport = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/reports/daily?date=${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDailyReport(res.data);
    } catch (error) {
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyReport = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/reports/monthly?year=${selectedYear}&month=${selectedMonth}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMonthlyReport(res.data);
    } catch (error) {
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#ff8c00', '#4caf50', '#2196f3', '#9c27b0', '#f44336'];

  if (loading) return <div>Loading reports...</div>;

  return (
    <div className="admin-reports">
      <h1>Sales Reports</h1>
      
      <div className="report-tabs">
        <button className={reportType === 'daily' ? 'active' : ''} onClick={() => setReportType('daily')}>Daily Report</button>
        <button className={reportType === 'monthly' ? 'active' : ''} onClick={() => setReportType('monthly')}>Monthly Report</button>
      </div>
      
      {reportType === 'daily' && dailyReport && (
        <div className="daily-report">
          <div className="report-filters">
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p>₨ {dailyReport.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{dailyReport.totalOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Average Order Value</h3>
              <p>₨ {dailyReport.avgOrderValue.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="charts-container">
            <div className="chart">
              <h3>Top Products</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyReport.topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#ff8c00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart">
              <h3>Payment Methods</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(dailyReport.paymentBreakdown).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(dailyReport.paymentBreakdown).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="recent-orders">
            <h3>Recent Orders</h3>
            <table>
              <thead>
                <tr><th>Order #</th><th>Customer</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {dailyReport.orders.map(order => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>₨ {order.grandTotal.toLocaleString()}</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {reportType === 'monthly' && monthlyReport && (
        <div className="monthly-report">
          <div className="report-filters">
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                <option key={m} value={m}>{new Date(2000, m-1, 1).toLocaleString('default', { month: 'long' })}</option>
              ))}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
              {[2023, 2024, 2025, 2026].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Monthly Revenue</h3>
              <p>₨ {monthlyReport.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{monthlyReport.totalOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Average Order Value</h3>
              <p>₨ {monthlyReport.averageOrderValue.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="chart">
            <h3>Daily Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={Object.entries(monthlyReport.dailyBreakdown).map(([day, data]) => ({ day, revenue: data.revenue }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#ff8c00" name="Revenue (₨)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="top-products">
            <h3>Top Performing Products</h3>
            <table>
              <thead>
                <tr><th>Product</th><th>Quantity Sold</th><th>Revenue</th><th>Orders</th></tr>
              </thead>
              <tbody>
                {monthlyReport.topProducts.map(product => (
                  <tr key={product.productName}>
                    <td>{product.productName}</td>
                    <td>{product.quantity} kg</td>
                    <td>₨ {product.revenue.toLocaleString()}</td>
                    <td>{product.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
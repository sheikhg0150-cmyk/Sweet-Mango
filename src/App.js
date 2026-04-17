import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Order from './pages/Order';
import OrderConfirmation from './pages/OrderConfirmation';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminOrders from './pages/AdminOrders';
import AdminInventory from './pages/AdminInventory';
import AdminReports from './pages/AdminReports';
import AdminPayments from './pages/AdminPayments';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order/:productId" element={<Order />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path="/admin/orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
            <Route path="/admin/inventory" element={<PrivateRoute><AdminInventory /></PrivateRoute>} />
            <Route path="/admin/reports" element={<PrivateRoute><AdminReports /></PrivateRoute>} />
            <Route path="/admin/payments" element={<PrivateRoute><AdminPayments /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
            <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
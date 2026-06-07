import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/shop/Products';
import ProductDetail from './pages/shop/ProductDetail';
import Order from './pages/shop/Order';
import OrderConfirmation from './pages/shop/OrderConfirmation';
import Contact from './pages/info/Contact';
import Admin from './pages/admin/Admin';
import AdminOrders from './pages/admin/AdminOrders';
import AdminInventory from './pages/admin/AdminInventory';
import AdminReports from './pages/admin/AdminReports';
import AdminPayments from './pages/admin/AdminPayments';
import AdminUsers from './pages/admin/AdminUsers';
import Rider from './pages/Rider';
import AdminSettings from './pages/admin/AdminSettings';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import PrivateRoute from './components/PrivateRoute';
import Cart from './pages/shop/Cart';
import Profile from './pages/Profile';
import AboutUs from './pages/info/AboutUs';
import Terms from './pages/info/Terms';
import Privacy from './pages/info/Privacy';
import Refund from './pages/info/Refund';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order/checkout" element={<Order />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/rider" element={<PrivateRoute role="rider"><Rider /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path="/admin/orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
            <Route path="/admin/inventory" element={<PrivateRoute><AdminInventory /></PrivateRoute>} />
            <Route path="/admin/reports" element={<PrivateRoute><AdminReports /></PrivateRoute>} />
            <Route path="/admin/payments" element={<PrivateRoute><AdminPayments /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
            <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
          </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
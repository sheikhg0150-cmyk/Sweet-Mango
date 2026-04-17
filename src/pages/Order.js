import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Order = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerCity: 'Lahore',
    customerAddress: '',
    quantityKg: location.state?.defaultQuantity || 5,
    paymentMethod: 'cash'
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        const products = {
          '1': { _id: '1', name: 'Chaunsa', pricePerKg: 450, stock: 500, discountCrates: 5, discountPercentage: 10, crateWeight: 5, farmOrigin: 'Multan' },
          '2': { _id: '2', name: 'Sindhri', pricePerKg: 380, stock: 250, discountCrates: 5, discountPercentage: 10, crateWeight: 5, farmOrigin: 'Mirpur Khas' },
          '3': { _id: '3', name: 'Anwar Ratol', pricePerKg: 550, stock: 200, discountCrates: 3, discountPercentage: 8, crateWeight: 4, farmOrigin: 'Multan' }
        };
        setProduct(products[productId] || products['1']);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);

  const calculateTotals = () => {
    if (!product) return { numberOfCrates: 0, subtotal: 0, discountAmount: 0, totalAmount: 0, deliveryFee: 0, grandTotal: 0 };
    
    const crateWeight = product.crateWeight || 5;
    const numberOfCrates = Math.ceil(formData.quantityKg / crateWeight);
    const subtotal = product.pricePerKg * formData.quantityKg;
    
    let discountAmount = 0;
    if (numberOfCrates >= (product.discountCrates || 5)) {
      discountAmount = (subtotal * (product.discountPercentage || 10)) / 100;
    }
    
    const totalAmount = subtotal - discountAmount;
    const deliveryFee = formData.quantityKg > 5 ? 0 : 150;
    const grandTotal = totalAmount + deliveryFee;
    
    return { numberOfCrates, subtotal, discountAmount, totalAmount, deliveryFee, grandTotal };
  };

  const totals = calculateTotals();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product || product.stock < formData.quantityKg) {
      toast.error(`Only ${product?.stock || 0}kg available!`);
      return;
    }
    
    const orderData = {
      productId: product._id,
      productName: product.name,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      customerCity: formData.customerCity,
      customerAddress: formData.customerAddress,
      quantityKg: formData.quantityKg,
      pricePerKg: product.pricePerKg,
      subtotal: totals.subtotal,
      discountAmount: totals.discountAmount,
      totalAmount: totals.totalAmount,
      deliveryFee: totals.deliveryFee,
      grandTotal: totals.grandTotal,
      numberOfCrates: totals.numberOfCrates,
      paymentMethod: formData.paymentMethod
    };
    
    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      
      toast.success(`Order placed! Total: ₨ ${totals.grandTotal}`);
      
      navigate('/order-confirmation', { state: { order: response.data.order } });
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.error || 'Order failed. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product || product.stock <= 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Product Unavailable</h1>
        <p>This mango variety is currently out of stock.</p>
        <button onClick={() => navigate('/products')} className="btn-primary" style={{ width: 'auto', marginTop: '20px' }}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Order {product.name} Mangoes</h2>
        
        <div style={{ background: '#fff8e7', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
          <h3>Product Details</h3>
          <p>📍 Origin: {product.farmOrigin || 'Punjab Orchards'}</p>
          <p>💰 Price: ₨ {product.pricePerKg}/kg</p>
          <p>📦 {product.crateWeight || 5}kg per crate</p>
          <p>🎁 {product.discountCrates || 5}+ crates get {product.discountPercentage || 10}% discount</p>
          <p>✅ Available stock: {product.stock}kg</p>
        </div>
        
        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <input type="text" name="customerName" placeholder="Full Name *" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="tel" name="customerPhone" placeholder="Phone Number *" onChange={handleChange} required />
          </div>
        </div>
        
        <div className="form-group">
          <input type="email" name="customerEmail" placeholder="Email (optional)" onChange={handleChange} />
        </div>
        
        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <select name="customerCity" onChange={handleChange} required>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Islamabad</option>
              <option>Multan</option>
              <option>Rawalpindi</option>
            </select>
          </div>
          <div className="form-group">
            <select name="paymentMethod" onChange={handleChange}>
              <option value="cash">Cash on Delivery</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="easypaisa">EasyPaisa</option>
              <option value="jazzcash">JazzCash</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <textarea name="customerAddress" placeholder="Complete Delivery Address *" onChange={handleChange} required rows="3" />
        </div>
        
        <div className="form-group">
          <label>Quantity (kg)</label>
          <input type="number" name="quantityKg" min="1" max={product.stock} value={formData.quantityKg} onChange={handleChange} required />
        </div>
        
        <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '10px', margin: '1rem 0' }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Quantity:</span>
            <span>{formData.quantityKg} kg ({totals.numberOfCrates} crates)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Subtotal:</span>
            <span>₨ {totals.subtotal.toLocaleString()}</span>
          </div>
          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'green' }}>
              <span>Discount:</span>
              <span>- ₨ {totals.discountAmount.toLocaleString()}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Delivery Fee:</span>
            <span>₨ {totals.deliveryFee.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #ddd', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Grand Total:</span>
            <span style={{ color: '#ff8c00' }}>₨ {totals.grandTotal.toLocaleString()}</span>
          </div>
        </div>
        
        <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', fontWeight: 'bold' }}>
          Place Order - ₨ {totals.grandTotal.toLocaleString()}
        </button>
      </form>
    </div>
  );
};

export default Order;
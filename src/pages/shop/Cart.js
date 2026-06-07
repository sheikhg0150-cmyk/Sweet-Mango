import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any premium mangoes yet.</p>
        <Link to="/products" className="btn-primary" style={{ marginTop: '1rem' }}>Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#ff8c00' }}>Your Shopping Cart</h1>
      
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const unitPrice = item.pricePerKg * (item.crateWeight || 1);
              return (
                <tr key={item._id}>
                  <td>
                    <strong>{item.name}</strong><br/>
                    <small>({item.crateWeight}kg Crate - {item.quality})</small>
                  </td>
                  <td>₨ {unitPrice}</td>
                  <td>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      style={{ width: '60px', padding: '5px' }}
                    />
                  </td>
                  <td>₨ {unitPrice * item.quantity}</td>
                  <td>
                    <button className="btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'right', marginTop: '2rem' }}>
        <h3>Total: ₨ {cartTotal}</h3>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/order/checkout')} 
          style={{ marginTop: '1rem' }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

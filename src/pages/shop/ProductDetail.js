import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(5);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        // Fallback data agar backend nahi chal raha
        const products = {
          '1': { _id: '1', name: 'Chaunsa', pricePerKg: 450, farmOrigin: 'Multan', stock: 500, isAvailable: true, crateWeight: 5, discountCrates: 5, discountPercentage: 10 },
          '2': { _id: '2', name: 'Sindhri', pricePerKg: 380, farmOrigin: 'Mirpur Khas', stock: 250, isAvailable: true, crateWeight: 5, discountCrates: 5, discountPercentage: 10 },
          '3': { _id: '3', name: 'Anwar Ratol', pricePerKg: 550, farmOrigin: 'Multan', stock: 200, isAvailable: true, crateWeight: 4, discountCrates: 3, discountPercentage: 8 }
        };
        setProduct(products[id] || products['1']);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const subtotal = product.pricePerKg * quantity;
  const crateCount = Math.ceil(quantity / (product.crateWeight || 5));
  const discount = crateCount >= (product.discountCrates || 5) ? (product.discountPercentage || 10) : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div style={{maxWidth:'1200px', margin:'0 auto', padding:'2rem'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem'}}>
        <div style={{background:'#fff8e7', borderRadius:'20px', padding:'2rem', textAlign:'center'}}>
          <div style={{fontSize:'10rem'}}>🥭</div>
        </div>
        <div>
          <h1 style={{color:'#2c1810'}}>{product.name}</h1>
          <p>📍 {product.farmOrigin}</p>
          <p style={{fontSize:'2rem', color:'#ff8c00', fontWeight:'bold'}}>₨ {product.pricePerKg}/kg</p>
          <p>✅ Stock: {product.stock}kg available</p>
          <p>📦 {product.crateWeight}kg per crate</p>
          <p>🎁 {product.discountCrates}+ crates = {product.discountPercentage}% off</p>
          
          <input type="number" min="1" max={product.stock} value={quantity} 
            onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{width:'100%', padding:'10px', margin:'10px 0'}} />
          
          <p>Subtotal: ₨ {subtotal}</p>
          {discount > 0 && <p style={{color:'green'}}>Discount: -₨ {discountAmount}</p>}
          <h3>Total: ₨ {total}</h3>
          
          <button onClick={() => {
              addToCart(product, quantity);
              navigate('/cart');
            }}
            style={{width:'100%', background:'#ff8c00', color:'white', padding:'15px', border:'none', borderRadius:'50px', fontSize:'1.1rem', cursor:'pointer', marginTop: '1rem'}}>
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div style={{ marginTop: '4rem', background: '#fff', padding: '2rem', borderRadius: '15px' }}>
        <h2>Customer Reviews & Ratings</h2>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <p>⭐⭐⭐⭐⭐</p>
              <p><strong>Ahmad R.</strong> <span style={{ color: '#888', fontSize: '0.9rem' }}>- June 1, 2025</span></p>
              <p>"Absolutely delicious! The best Chaunsa I've had this season. Arrived perfectly fresh in Islamabad."</p>
            </div>
            <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <p>⭐⭐⭐⭐</p>
              <p><strong>Sara T.</strong> <span style={{ color: '#888', fontSize: '0.9rem' }}>- May 28, 2025</span></p>
              <p>"Great quality mangoes, but delivery took an extra day. Still, highly recommended!"</p>
            </div>
          </div>
          <div style={{ flex: 1, background: '#f9f9f9', padding: '1.5rem', borderRadius: '10px' }}>
            <h3>Leave a Review</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Review submitted!'); }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Rating</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                  <option>5 Stars - Excellent</option>
                  <option>4 Stars - Good</option>
                  <option>3 Stars - Average</option>
                  <option>2 Stars - Poor</option>
                  <option>1 Star - Terrible</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Your Review</label>
                <textarea rows="4" style={{ width: '100%', padding: '10px', borderRadius: '5px' }} placeholder="Tell us what you think..." required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

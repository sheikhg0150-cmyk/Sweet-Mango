import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(5);

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
          
          <button onClick={() => navigate(`/order/${product._id}`, {state:{defaultQuantity:quantity}})}
            style={{width:'100%', background:'#ff8c00', color:'white', padding:'15px', border:'none', borderRadius:'50px', fontSize:'1.1rem', cursor:'pointer'}}>
            Order Now → ₨ {total}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
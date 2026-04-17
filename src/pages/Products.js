import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      setProducts([
        { _id: '1', name: 'Chaunsa', pricePerKg: 450, farmOrigin: 'Multan', stock: 500, isAvailable: true, discountCrates: 5, discountPercentage: 10, crateWeight: 5 },
        { _id: '2', name: 'Sindhri', pricePerKg: 380, farmOrigin: 'Mirpur Khas', stock: 250, isAvailable: true, discountCrates: 5, discountPercentage: 10, crateWeight: 5 },
        { _id: '3', name: 'Anwar Ratol', pricePerKg: 550, farmOrigin: 'Multan', stock: 200, isAvailable: true, discountCrates: 3, discountPercentage: 8, crateWeight: 4 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading mangoes...</div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Premium Mangoes</h1>
      <div className="grid-3">
        {products.map(p => (
          <div key={p._id} className="product-card">
            <div style={{ fontSize: '4rem' }}>🥭</div>
            <h3>{p.name}</h3>
            <p>📍 {p.farmOrigin}</p>
            <div className="price">₨ {p.pricePerKg}/kg</div>
            <p style={{ fontSize: '0.85rem', color: p.stock > 0 ? 'green' : 'red' }}>
              {p.stock > 0 ? `✅ ${p.stock}kg available` : '❌ Out of stock'}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>
              🎁 {p.discountCrates}+ crates = {p.discountPercentage}% off
            </p>
            <Link 
              to={`/order/${p._id}`} 
              style={{ 
                background: p.stock > 0 ? '#ff8c00' : '#ccc', 
                color: 'white', 
                padding: '10px 30px', 
                borderRadius: '25px', 
                textDecoration: 'none', 
                display: 'inline-block',
                marginTop: '1rem',
                pointerEvents: p.stock > 0 ? 'auto' : 'none'
              }}
            >
              {p.stock > 0 ? 'Order Now' : 'Out of Stock'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
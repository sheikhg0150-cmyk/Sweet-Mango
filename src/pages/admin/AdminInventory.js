import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [editingStock, setEditingStock] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', nameUrdu: '', pricePerKg: '', farmOrigin: '', stock: 0,
    discountCrates: 5, discountPercentage: 10, crateWeight: 5,
    season: 'summer', description: ''
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/reports/inventory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.allProducts);
      setStats(res.data.summary);
    } catch (error) {
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (productId, newStock) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/products/${productId}/stock`, 
        { stock: newStock, changeType: 'adjustment', notes: 'Manual update' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Stock updated');
      fetchInventory();
      setEditingStock(null);
    } catch (error) {
      toast.error('Failed to update stock');
    }
  };

  // const getSeasonStatusBadge = (status) => {
  //   const badges = {
  //     active: { bg: '#4caf50', text: 'Active' },
  //     'ending-soon': { bg: '#ff9800', text: 'Ending Soon' },
  //     upcoming: { bg: '#2196f3', text: 'Upcoming' },
  //     ended: { bg: '#9e9e9e', text: 'Ended' }
  //   };
  //   const badge = badges[status] || { bg: '#666', text: status };
  //   return <span style={{ background: badge.bg, padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{badge.text}</span>;
  // };

  if (loading) return <div>Loading inventory...</div>;

  return (
    <div className="admin-inventory">
      <div className="admin-header">
        <h1>Inventory Management</h1>
        <button onClick={() => setShowAddProduct(true)} className="btn-primary">+ Add New Product</button>
      </div>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stock</h3>
          <p>{stats.totalStock} kg</p>
        </div>
        <div className="stat-card warning">
          <h3>Low Stock Alert</h3>
          <p>{stats.lowStockCount} products</p>
        </div>
        <div className="stat-card danger">
          <h3>Out of Stock</h3>
          <p>{stats.outOfStockCount} products</p>
        </div>
      </div>
      
      {/* Season Status Sections */}
      <div className="inventory-sections">
        <div className="inventory-section">
          <h2>🌟 In Season (Active)</h2>
          <div className="products-grid">
            {products.filter(p => p.seasonStatus === 'active').map(p => (
              <InventoryCard key={p._id} product={p} editingStock={editingStock} setEditingStock={setEditingStock} updateStock={updateStock} />
            ))}
          </div>
        </div>
        
        <div className="inventory-section warning-bg">
          <h2>⚠️ Ending Soon</h2>
          <div className="products-grid">
            {products.filter(p => p.seasonStatus === 'ending-soon').map(p => (
              <InventoryCard key={p._id} product={p} editingStock={editingStock} setEditingStock={setEditingStock} updateStock={updateStock} />
            ))}
          </div>
        </div>
        
        <div className="inventory-section">
          <h2>📅 Upcoming Season</h2>
          <div className="products-grid">
            {products.filter(p => p.seasonStatus === 'upcoming').map(p => (
              <InventoryCard key={p._id} product={p} editingStock={editingStock} setEditingStock={setEditingStock} updateStock={updateStock} />
            ))}
          </div>
        </div>
        
        <div className="inventory-section gray-bg">
          <h2>❌ Season Ended</h2>
          <div className="products-grid">
            {products.filter(p => p.seasonStatus === 'ended').map(p => (
              <InventoryCard key={p._id} product={p} editingStock={editingStock} setEditingStock={setEditingStock} updateStock={updateStock} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Product</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = localStorage.getItem('token');
                await axios.post('http://localhost:5000/api/products', newProduct, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Product added');
                setShowAddProduct(false);
                fetchInventory();
              } catch (error) {
                toast.error('Failed to add product');
              }
            }}>
              <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
              <input type="text" placeholder="Name (Urdu)" value={newProduct.nameUrdu} onChange={e => setNewProduct({...newProduct, nameUrdu: e.target.value})} />
              <input type="number" placeholder="Price per kg" value={newProduct.pricePerKg} onChange={e => setNewProduct({...newProduct, pricePerKg: parseFloat(e.target.value)})} required />
              <input type="text" placeholder="Farm Origin" value={newProduct.farmOrigin} onChange={e => setNewProduct({...newProduct, farmOrigin: e.target.value})} required />
              <input type="number" placeholder="Initial Stock (kg)" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseFloat(e.target.value)})} />
              <input type="number" placeholder="Crate Weight (kg)" value={newProduct.crateWeight} onChange={e => setNewProduct({...newProduct, crateWeight: parseFloat(e.target.value)})} />
              <input type="number" placeholder="Discount Crates" value={newProduct.discountCrates} onChange={e => setNewProduct({...newProduct, discountCrates: parseInt(e.target.value)})} />
              <input type="number" placeholder="Discount Percentage" value={newProduct.discountPercentage} onChange={e => setNewProduct({...newProduct, discountPercentage: parseFloat(e.target.value)})} />
              <select value={newProduct.season} onChange={e => setNewProduct({...newProduct, season: e.target.value})}>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
                <option value="year-round">Year Round</option>
              </select>
              <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} rows="3" />
              <button type="submit">Add Product</button>
              <button type="button" onClick={() => setShowAddProduct(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InventoryCard = ({ product, editingStock, setEditingStock, updateStock }) => {
  const [tempStock, setTempStock] = useState(product.stock);
  
  return (
    <div className={`product-card ${product.stock === 0 ? 'out-of-stock-card' : ''}`}>
      <h3>{product.name}</h3>
      <p>📍 {product.farmOrigin}</p>
      <p>💰 ₨ {product.pricePerKg.toLocaleString()}/kg</p>
      <p>📦 {product.crateWeight}kg/crate | 🎁 {product.discountCrates}+ crates = {product.discountPercentage}% off</p>
      
      <div className="stock-info">
        {editingStock === product._id ? (
          <div className="stock-edit">
            <input 
              type="number" 
              value={tempStock} 
              onChange={(e) => setTempStock(parseInt(e.target.value))}
              autoFocus
            />
            <button onClick={() => updateStock(product._id, tempStock)}>Save</button>
            <button onClick={() => setEditingStock(null)}>Cancel</button>
          </div>
        ) : (
          <div className="stock-display">
            <span className={product.stock > 0 ? 'stock-positive' : 'stock-zero'}>
              Stock: {product.stock} kg
            </span>
            <button onClick={() => setEditingStock(product._id)} className="edit-stock-btn">✏️ Edit</button>
          </div>
        )}
      </div>
      
      <div className="product-status">
        <div>Status: {product.isAvailable ? '✅ Available' : '❌ Unavailable'}</div>
        <div>Season: {product.season}</div>
      </div>
    </div>
  );
};

export default AdminInventory;

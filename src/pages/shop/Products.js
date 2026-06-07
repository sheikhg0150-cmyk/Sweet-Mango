import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

// All Pakistani Mango Varieties available at Chanab Mangoes
const PAKISTAN_MANGOES = [
  {
    _id: '1',
    name: 'Chaunsa (White)',
    urduName: 'چونسہ سفید',
    quality: 'Premium',
    pricePerKg: 450,
    farmOrigin: 'Multan',
    stock: 600,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 10,
    crateWeight: 5,
    season: 'July – September',
    taste: 'Sweet, Aromatic',
    description: 'King of mangoes! Creamy, fiberless, intensely sweet with a royal fragrance.',
    emoji: '🥭',
    badge: '👑 King',
  },
  {
    _id: '2',
    name: 'Chaunsa (Black / Kala)',
    urduName: 'چونسہ کالا',
    quality: 'Premium',
    pricePerKg: 500,
    farmOrigin: 'Multan',
    stock: 300,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 10,
    crateWeight: 5,
    season: 'July – August',
    taste: 'Extra Sweet, Rich',
    description: 'Rare dark-skinned Chaunsa with extra sugar content and intense aroma.',
    emoji: '🥭',
    badge: '🔥 Rare',
  },
  {
    _id: '3',
    name: 'Sindhri',
    urduName: 'سندھری',
    quality: 'Premium',
    pricePerKg: 380,
    farmOrigin: 'Mirpur Khas, Sindh',
    stock: 400,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 10,
    crateWeight: 5,
    season: 'May – June',
    taste: 'Mildly Sweet, Juicy',
    description: 'Sindh\'s pride — large oval shape, thin skin, low fibre, melting texture.',
    emoji: '🥭',
    badge: '🏆 Best Seller',
  },
  {
    _id: '4',
    name: 'Anwar Ratol',
    urduName: 'انور رٹول',
    quality: 'Superb',
    pricePerKg: 600,
    farmOrigin: 'Rahim Yar Khan',
    stock: 200,
    isAvailable: true,
    discountCrates: 3,
    discountPercentage: 8,
    crateWeight: 4,
    season: 'June – July',
    taste: 'Honey Sweet, Fragrant',
    description: 'Small size, big taste! Honey-sweet with a distinctive strong aroma — a true delicacy.',
    emoji: '🥭',
    badge: '🍯 Honey',
  },
  {
    _id: '5',
    name: 'Dusehri',
    urduName: 'دوسہری',
    quality: 'A-Grade',
    pricePerKg: 320,
    farmOrigin: 'Multan',
    stock: 350,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 8,
    crateWeight: 5,
    season: 'June – July',
    taste: 'Sweet, Fibreless',
    description: 'Slender and golden, Dusehri is loved for its fibre-free pulp and sweet citrusy taste.',
    emoji: '🥭',
    badge: '⭐ Popular',
  },
  {
    _id: '6',
    name: 'Langra',
    urduName: 'لنگڑا',
    quality: 'Premium',
    pricePerKg: 360,
    farmOrigin: 'Bahawalpur',
    stock: 280,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 10,
    crateWeight: 5,
    season: 'July – August',
    taste: 'Tangy-Sweet, Spicy',
    description: 'Green-skinned even when ripe, Langra has a unique spicy-sweet taste and rich flavour.',
    emoji: '🥭',
    badge: '🌿 Unique',
  },
  {
    _id: '7',
    name: 'Fajri',
    urduName: 'فجری',
    quality: 'A-Grade',
    pricePerKg: 290,
    farmOrigin: 'Multan',
    stock: 450,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 8,
    crateWeight: 5,
    season: 'August – September',
    taste: 'Sweet, Light',
    description: 'The late-season variety — large, sweet and perfect for those who want mangoes in August.',
    emoji: '🥭',
    badge: '🌙 Late Season',
  },
  {
    _id: '8',
    name: 'Saroli',
    urduName: 'سارولی',
    quality: 'A-Grade',
    pricePerKg: 270,
    farmOrigin: 'Sindh',
    stock: 200,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 8,
    crateWeight: 5,
    season: 'June – July',
    taste: 'Sweet, Soft',
    description: 'Medium-sized with smooth texture, popular in Sindh for its consistent sweetness.',
    emoji: '🥭',
    badge: '🌊 Sindhi',
  },
  {
    _id: '9',
    name: 'Gulab Khas',
    urduName: 'گلاب خاص',
    quality: 'Superb',
    pricePerKg: 520,
    farmOrigin: 'Multan',
    stock: 150,
    isAvailable: true,
    discountCrates: 3,
    discountPercentage: 8,
    crateWeight: 4,
    season: 'June – July',
    taste: 'Rose-Scented, Sweet',
    description: 'The "rose special" — a rare gem with a delicate rose-like fragrance and sweet taste.',
    emoji: '🥭',
    badge: '🌹 Exotic',
  },
  {
    _id: '10',
    name: 'Samar Bahisht (S.B. Chaunsa)',
    urduName: 'سمر بہشت',
    quality: 'Premium',
    pricePerKg: 480,
    farmOrigin: 'Multan',
    stock: 250,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 10,
    crateWeight: 5,
    season: 'July – August',
    taste: 'Extremely Sweet, Creamy',
    description: '"Heaven of Summer" — a premium Chaunsa hybrid with exceptional sweetness and aroma.',
    emoji: '🥭',
    badge: '☁️ Heaven',
  },
  {
    _id: '11',
    name: 'Malda',
    urduName: 'مالدہ',
    quality: 'A-Grade',
    pricePerKg: 300,
    farmOrigin: 'Hyderabad, Sindh',
    stock: 180,
    isAvailable: true,
    discountCrates: 5,
    discountPercentage: 8,
    crateWeight: 5,
    season: 'May – June',
    taste: 'Tangy Sweet, Juicy',
    description: 'An early-season variety from Hyderabad, juicy and slightly tangy — great for shakes.',
    emoji: '🥭',
    badge: '🌅 Early',
  },
  {
    _id: '12',
    name: 'Lal Badshah',
    urduName: 'لال بادشاہ',
    quality: 'Premium',
    pricePerKg: 420,
    farmOrigin: 'Bahawalpur',
    stock: 120,
    isAvailable: true,
    discountCrates: 3,
    discountPercentage: 8,
    crateWeight: 4,
    season: 'July – August',
    taste: 'Sweet, Rich Colour',
    description: '"Red King" — a striking red-blush mango with very sweet taste and good shelf life.',
    emoji: '🥭',
    badge: '❤️ Red King',
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data.length > 0 ? res.data : PAKISTAN_MANGOES);
    } catch (error) {
      setProducts(PAKISTAN_MANGOES);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');

  if (loading) return <div className="loading">🥭 Loading mangoes...</div>;

  let filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.urduName && p.urduName.includes(searchTerm))
  );

  if (filterCity) {
    filteredProducts = filteredProducts.filter(p =>
      p.farmOrigin && p.farmOrigin.toLowerCase().includes(filterCity.toLowerCase())
    );
  }

  if (sortByPrice === 'low-high') {
    filteredProducts.sort((a, b) => a.pricePerKg - b.pricePerKg);
  } else if (sortByPrice === 'high-low') {
    filteredProducts.sort((a, b) => b.pricePerKg - a.pricePerKg);
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div>
      {/* ── Hero Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #ff8c00 0%, #ff4444 50%, #2c1810 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '3rem 1rem 2rem',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🥭</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          All Varieties of Pakistani Mangoes
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.92, marginBottom: '0.25rem' }}>
          Directly from <strong>Chanab Mangoes</strong> Orchards — 12 Premium Varieties Available
        </p>
        <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
          Season 2026 Live • Farm Fresh • Next-Day Delivery
        </p>
      </div>

      {/* ── Address Banner ── */}
      <div style={{
        background: '#2c1810',
        color: 'white',
        padding: '1.2rem 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🏢</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Chanab Mangoes — Main Office</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              Near Chanab River, Trimmu Head, Jhang Road, Chiniot, Punjab, Pakistan
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🌿</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Farm / Orchard Address</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              Chanab Mango Orchard, Mailsi Road, Multan, Punjab, Pakistan
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>📞</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Contact</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              +92 3285306913 &nbsp;|&nbsp; chanabmangoes@gmail.com
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>💬</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>WhatsApp Order</div>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.85rem',
                color: '#25D366',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem' }}>

        {/* ── Search and Filters ── */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          background: 'rgba(255,255,255,0.6)',
          padding: '1.2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(6px)',
        }}>
          <input
            type="text"
            placeholder="🔍  Search mango variety (e.g. Chaunsa, Sindhri)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1.5px solid #ff8c00',
              fontSize: '0.95rem',
            }}
          />
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #ddd', fontSize: '0.95rem' }}
          >
            <option value="">🗺️  All Origins</option>
            <option value="Multan">Multan</option>
            <option value="Mirpur Khas">Mirpur Khas</option>
            <option value="Bahawalpur">Bahawalpur</option>
            <option value="Sindh">Sindh</option>
            <option value="Rahim Yar Khan">Rahim Yar Khan</option>
          </select>
          <select
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #ddd', fontSize: '0.95rem' }}
          >
            <option value="">💰  Sort by Price</option>
            <option value="low-high">Lowest to Highest</option>
            <option value="high-low">Highest to Lowest</option>
          </select>
        </div>

        {/* ── Count ── */}
        <p style={{ marginBottom: '1.5rem', color: '#666', fontWeight: 500 }}>
          🥭 Showing <strong>{filteredProducts.length}</strong> varieties
        </p>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
            <div style={{ fontSize: '3rem' }}>😔</div>
            <p>No mangoes found matching your search.</p>
          </div>
        ) : (
          <div className="grid-3">
            {filteredProducts.map(p => (
              <div
                key={p._id}
                className="product-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1.5px solid #ffe6b3',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
              >
                {/* Badge */}
                {p.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'linear-gradient(135deg, #ff8c00, #ff4444)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.5px',
                  }}>
                    {p.badge}
                  </div>
                )}

                <Link to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* Emoji */}
                  <div style={{
                    fontSize: '4.5rem',
                    background: 'linear-gradient(135deg, #fff8e7, #ffe6b3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem',
                  }}>
                    {p.emoji || '🥭'}
                  </div>

                  {/* Name */}
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: '#2c1810' }}>
                    {p.name}
                  </h3>
                  {p.urduName && (
                    <p style={{ fontSize: '0.95rem', color: '#ff8c00', marginBottom: '0.4rem', fontFamily: 'serif' }}>
                      {p.urduName}
                    </p>
                  )}

                  {/* Quality */}
                  <span style={{
                    display: 'inline-block',
                    background: p.quality === 'Superb' ? '#2c1810' : p.quality === 'Premium' ? '#ff8c00' : '#888',
                    color: 'white',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 10px',
                    borderRadius: '20px',
                    marginBottom: '0.6rem',
                    letterSpacing: '0.5px',
                  }}>
                    {p.quality}
                  </span>

                  {/* Origin & Season */}
                  <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.2rem' }}>
                    📍 {p.farmOrigin}
                  </p>
                  {p.season && (
                    <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.3rem' }}>
                      🗓️ Season: {p.season}
                    </p>
                  )}
                  {p.taste && (
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                      😋 {p.taste}
                    </p>
                  )}

                  {/* Description */}
                  {p.description && (
                    <p style={{
                      fontSize: '0.78rem',
                      color: '#777',
                      marginBottom: '0.5rem',
                      lineHeight: '1.45',
                    }}>
                      {p.description}
                    </p>
                  )}

                  {/* Price */}
                  <div className="price" style={{ fontSize: '1.6rem', margin: '0.5rem 0' }}>
                    ₨ {p.pricePerKg}<span style={{ fontSize: '0.9rem', fontWeight: 400 }}>/kg</span>
                  </div>

                  {/* Stock */}
                  <p style={{ fontSize: '0.82rem', color: p.stock > 0 ? 'green' : 'red', marginBottom: '0.3rem' }}>
                    {p.stock > 0 ? `✅ ${p.stock}kg available` : '❌ Out of stock'}
                  </p>

                  {/* Discount */}
                  <p style={{ fontSize: '0.78rem', color: '#888' }}>
                    🎁 {p.discountCrates}+ crates = {p.discountPercentage}% off
                  </p>
                </Link>

                {/* Add to Cart */}
                <button
                  onClick={(e) => handleAddToCart(e, p)}
                  className="btn-primary"
                  disabled={p.stock <= 0}
                  style={{
                    background: addedId === p._id
                      ? '#25D366'
                      : p.stock > 0 ? '#ff8c00' : '#ccc',
                    marginTop: '1rem',
                    width: '100%',
                    transition: 'background 0.3s',
                    pointerEvents: p.stock > 0 ? 'auto' : 'none',
                  }}
                >
                  {addedId === p._id
                    ? '✅ Added!'
                    : p.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Address Section ── */}
        <div style={{
          marginTop: '4rem',
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '2px solid #ffe6b3',
        }}>
          <h2 style={{ textAlign: 'center', color: '#2c1810', marginBottom: '0.5rem', fontSize: '1.8rem' }}>
            📍 Chanab Mangoes — Find Us
          </h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Visit us at any of our locations or order online
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>

            {/* Office */}
            <div style={{
              background: 'linear-gradient(135deg, #fff8e7, #ffe6b3)',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1.5px solid #ff8c00',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
              <h3 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>Main Office</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                Near Chanab River, Trimmu Head<br />
                Jhang Road, Chiniot<br />
                Punjab — 35400, Pakistan
              </p>
            </div>

            {/* Farm */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fff4, #d4edda)',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1.5px solid #28a745',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌳</div>
              <h3 style={{ color: '#155724', marginBottom: '0.5rem' }}>Mango Orchard / Farm</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                Chanab Mango Orchard<br />
                Mailsi Road, Multan<br />
                Punjab — 60000, Pakistan
              </p>
            </div>

            {/* Contact */}
            <div style={{
              background: 'linear-gradient(135deg, #fff0f0, #ffd6d6)',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1.5px solid #ff4444',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</div>
              <h3 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>Contact Us</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                📱 +92 328 5306913<br />
                📧 chanabmangoes@gmail.com<br />
                ⏰ Mon–Sat: 8 AM – 8 PM
              </p>
            </div>

            {/* WhatsApp */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fff4, #c3e6cb)',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1.5px solid #25D366',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
              <h3 style={{ color: '#155724', marginBottom: '0.5rem' }}>Order via WhatsApp</h3>
              <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1rem', lineHeight: '1.5' }}>
                Send your order directly on WhatsApp — fastest response guaranteed!
              </p>
              <a
                href="https://wa.me/923285306913?text=Hello%20Chanab%20Mangoes!%20I%20want%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
              >
                💬 WhatsApp Now
              </a>
            </div>
          </div>

          {/* Google Maps link */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a
              href="https://maps.google.com/?q=chanab+mangoes+orchard+multan"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#2c1810',
                color: 'white',
                padding: '10px 28px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;

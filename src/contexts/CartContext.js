import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        toast.success(`Updated ${product.name} quantity in cart!`);
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item._id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const cartTotal = cartItems.reduce((total, item) => {
    // If there's a crate logic, calculate based on crateWeight, else standard price calculation
    const price = item.pricePerKg * (item.crateWeight || 1);
    return total + (price * item.quantity);
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount: cartItems.length
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

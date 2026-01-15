import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null); // Shopify cart object
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load cart ID from localStorage
  const getCartId = () => {
    return localStorage.getItem('shopify_cart_id');
  };

  const setCartId = (cartId) => {
    if (cartId) {
      localStorage.setItem('shopify_cart_id', cartId);
    } else {
      localStorage.removeItem('shopify_cart_id');
    }
  };

  // Fetch existing cart or create new one
  useEffect(() => {
    const cartId = getCartId();
    if (cartId) {
      fetchCart(cartId);
    }
  }, []);

const fetchCart = async (cartId) => {
  if (!cartId) return;
  
  try {
    setIsLoading(true);
    // Encode the cart ID to handle special characters
    const encodedCartId = encodeURIComponent(cartId);
    const response = await api.get(`/cart/${encodedCartId}`);
    setCart(response.data);
  } catch (error) {
    console.error('Error fetching cart:', error);
    // Cart might be expired, clear it
    setCartId(null);
    setCart(null);
  } finally {
    setIsLoading(false);
  }
};

  // Update the ensureCart function (around line 35)
const ensureCart = async () => {
  let cartId = getCartId();
  
  // Check if cart ID exists and is valid
  if (cartId && cartId.startsWith('gid://shopify/Cart/')) {
    try {
      // Try to fetch existing cart
      const response = await api.get(`/cart/${encodeURIComponent(cartId)}`);
      setCart(response.data);
      return cartId;
    } catch (error) {
      console.log('Existing cart not found, creating new one');
      // Cart expired or invalid, clear it
      setCartId(null);
      cartId = null;
    }
  }
  
  // Create new cart if no valid cart exists
  if (!cartId) {
    try {
      const response = await api.post('/cart/create', { lines: [] });
      cartId = response.data.id;
      
      if (!cartId) {
        throw new Error('No cart ID returned from API');
      }
      
      setCartId(cartId);
      setCart(response.data);
      return cartId;
    } catch (error) {
      console.error('Error creating cart:', error);
      toast.error('Failed to initialize cart');
      return null;
    }
  }
  
  return cartId;
};

  const addToCart = async (variantId, quantity = 1) => {
    try {
      setIsLoading(true);
      const cartId = await ensureCart();
      
      if (!cartId) {
        toast.error('Failed to add item to cart');
        return;
      }

      const response = await api.post('/cart/add', {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }]
      });
      
      setCart(response.data);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (lineId, quantity) => {
    const cartId = getCartId();
    if (!cartId) return;

    try {
      setIsLoading(true);
      // This endpoint needs to be added to backend
      const response = await api.post('/cart/update', {
        cartId,
        lines: [{ id: lineId, quantity }]
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId) => {
    const cartId = getCartId();
    if (!cartId) return;

    try {
      setIsLoading(true);
      // This endpoint needs to be added to backend
      const response = await api.post('/cart/remove', {
        cartId,
        lineIds: [lineId]
      });
      setCart(response.data);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCartId(null);
    setCart(null);
  };

  const getCartTotal = () => {
    if (!cart || !cart.cost) return 0;
    return parseFloat(cart.cost.totalAmount.amount);
  };

  const getCartCount = () => {
    if (!cart || !cart.lines) return 0;
    return cart.lines.edges.reduce((count, edge) => count + edge.node.quantity, 0);
  };

  const getCheckoutUrl = () => {
    return cart?.checkoutUrl || null;
  };

  const value = {
    cart,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    getCheckoutUrl,
    fetchCart: () => fetchCart(getCartId()),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

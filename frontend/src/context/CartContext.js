import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Guest cart helpers for localStorage
const GUEST_CART_KEY = 'fitgearzzz_guest_cart';

const getGuestCart = () => {
  try {
    const cart = localStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error loading guest cart:', error);
    return [];
  }
};

const saveGuestCart = (items) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving guest cart:', error);
  }
};

const clearGuestCart = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error('Error clearing guest cart:', error);
  }
};

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

  // Fetch existing cart on mount
  useEffect(() => {
    const cartId = getCartId();
    if (cartId) {
      fetchCart(cartId);
    }
  }, []);

  const fetchCart = async (cartId) => {
    const idToUse = cartId || getCartId();
    if (!idToUse) return;

    try {
      setIsLoading(true);
      const encodedCartId = encodeURIComponent(idToUse);
      const response = await api.get(`/cart/${encodedCartId}`);
      setCart(response.data);
            // Handle guest users - load from localStorage
      if (!user) {
        const guestCart = getGuestCart();
        
        // For guest carts, we store minimal data and display without product details
        // In a full implementation, you'd fetch product details from Shopify
        const cartItems = guestCart.map(item => ({
          ...item,
          id: item.variantId,
          // Product details would be fetched from Shopify API here
        }));
        
        setCart(cartItems);
        setIsLoading(false);
        return;
      }
      
      // Logged-in user - continue with existing logic
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Cart might be expired, clear it
      setCartId(null);
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

    // Merge guest cart with user cart on login
  const mergeGuestCart = async () => {
    const guestCart = getGuestCart();
    
    if (guestCart.length === 0) return;
    
    try {
      // Add all guest cart items to user's cart
      for (const item of guestCart) {
        await addToCart(item.variantId, item.quantity);
      }
      
      // Clear guest cart after merging
      clearGuestCart();
      
      toast.success('Your cart items have been saved!');
    } catch (error) {
      console.error('Error merging guest cart:', error);
    }
  };

  // Ensure there is a valid cart and keep local state in sync
  const ensureCart = async () => {
    let cartId = getCartId();

    if (cartId && cartId.startsWith('gid://shopify/Cart/')) {
      try {
        const response = await api.get(`/cart/${encodeURIComponent(cartId)}`);
        setCart(response.data);
        return cartId;
      } catch (error) {
        console.log('Existing cart not found, creating new one');
        setCartId(null);
        cartId = null;
      }
    }

    if (!cartId) {
      try {
        const response = await api.post('/cart/create', { lines: [] });
        const newCart = response.data;
        cartId = newCart?.id;

        if (!cartId) {
          throw new Error('No cart ID returned from API');
        }

        setCartId(cartId);
        setCart(newCart);
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
        // Handle guest users - use localStorage
    if (!user) {
      const guestCart = getGuestCart();
      const existingItem = guestCart.find(item => item.variantId === variantId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        guestCart.push({ variantId, quantity, addedAt: Date.now() });
      }
      
      saveGuestCart(guestCart);
      
      // Show success message
      toast.success('Added to cart!');
      
      // Reload cart to update UI
      await fetchCart();
      return;
    }
    
    // Logged-in user - continue with existing logic
    setIsLoading(true);
    console.log('🛒 Adding to cart:', { variantId, quantity });

    const cartId = await ensureCart();
    console.log('🛒 Cart ID:', cartId);

    if (!cartId) {
      toast.error('Failed to add item to cart');
      return;
    }

    const response = await api.post('/cart/add', {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    });

    const updatedCart = response.data;
    console.log('🛒 Cart response:', updatedCart);

    if (!updatedCart || !updatedCart.id) {
      throw new Error('Cart update failed');
    }

    setCart(updatedCart);
    setCartId(updatedCart.id);
    await fetchCart(updatedCart.id);

    toast.success('Added to cart!');
  } catch (error) {
    console.error('❌ Error adding to cart:', error);

    const message =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      error.message ||
      'Failed to add to cart';

    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};

  const updateCartItem = async (lineId, quantity) => {
    const cartId = getCartId();
    if (!cartId) return;

    try {
      setIsLoading(true);
      const response = await api.post('/cart/update', {
        cartId,
        lines: [{ id: lineId, quantity }],
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
      const response = await api.post('/cart/remove', {
        cartId,
        lineIds: [lineId],
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
    return cart.lines.edges.reduce(
      (count, edge) => count + edge.node.quantity,
      0
    );
  };

  const getCheckoutUrl = () => {
    return cart?.checkoutUrl || null;
  };

  const value = {
    cart,
    cartItems: cart?.lines?.edges || [],
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    getCheckoutUrl,
    fetchCart: () => fetchCart(getCartId()),,
    mergeGuestCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

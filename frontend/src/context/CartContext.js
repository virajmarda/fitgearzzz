// src/context/CartContext.js
// Pure localStorage cart — zero Shopify dependency.
// Exposes: cartItems, addToCart, removeFromCart, updateQuantity,
//          clearCart, getCartCount, getCartTotal, isInCart

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CART_KEY = 'fitgearzzz_cart';

const readCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeCart = (items) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readCart());

  // Persist on every change
  useEffect(() => {
    writeCart(cartItems);
  }, [cartItems]);

  // ---------- mutations ----------

  const addToCart = useCallback((product, variant = null, quantity = 1) => {
    const variantId = variant?.id || product.variants?.[0]?.id || product.id;
    const variantTitle = variant?.title || '';
    const price =
      variant?.price?.amount ??
      variant?.price ??
      product.variants?.[0]?.price?.amount ??
      product.priceRange?.minVariantPrice?.amount ??
      0;
    const image =
      variant?.image?.url ??
      product.images?.[0]?.url ??
      product.featuredImage?.url ??
      null;

    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.variantId === variantId && i.productId === product.id
      );
      if (existing) {
        toast.success(`${product.title} quantity updated`);
        return prev.map((i) =>
          i.variantId === variantId && i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      toast.success(`${product.title} added to cart`);
      return [
        ...prev,
        {
          id: `${product.id}_${variantId}`,
          productId: product.id,
          variantId,
          title: product.title,
          variantTitle,
          price: Number(price),
          image,
          handle: product.handle,
          quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    toast.success('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ---------- selectors ----------

  const getCartCount = useCallback(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const getCartTotal = useCallback(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems]
  );

  const isInCart = useCallback(
    (productId) => cartItems.some((i) => i.productId === productId),
    [cartItems]
  );

  // getCheckoutUrl is a no-op until Shopify checkout is wired;
  // CartPage will navigate to /checkout instead.
  const getCheckoutUrl = useCallback(() => null, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        isInCart,
        getCheckoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// src/context/CartContext.js
// Pure localStorage cart — zero Shopify dependency. Works with the canonical
// flat product shape from src/data/mockProducts.js (and the Shopify-normalised
// equivalent). Announces changes via an aria-live region for accessibility.
//
// API: cartItems, addToCart(product, variant, qty), removeFromCart(itemId),
//      updateQuantity(itemId, qty), clearCart, getCartCount, getCartTotal,
//      isInCart(productId), announce

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
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
  } catch {
    /* ignore quota / private-mode errors */
  }
};

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readCart());
  const [liveMessage, setLiveMessage] = useState('');

  useEffect(() => {
    writeCart(cartItems);
  }, [cartItems]);

  const announce = useCallback((msg) => {
    setLiveMessage('');
    // next tick so screen readers re-announce identical strings
    window.requestAnimationFrame(() => setLiveMessage(msg));
  }, []);

  // ---------- mutations ----------
  const addToCart = useCallback(
    (product, variant = null, quantity = 1) => {
      if (!product) return;
      const variantId = variant?.id || product.variants?.[0]?.id || product.id;
      const variantTitle = variant?.title || product.variants?.[0]?.title || '';
      const price = num(
        variant?.price ??
          product.price ??
          product.variants?.[0]?.price ??
          0
      );
      const image =
        variant?.image ||
        product.image ||
        product.images?.[0]?.url ||
        null;

      setCartItems((prev) => {
        const existing = prev.find(
          (i) => i.variantId === variantId && i.productId === product.id
        );
        if (existing) {
          return prev.map((i) =>
            i.variantId === variantId && i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [
          ...prev,
          {
            id: `${product.id}_${variantId}`,
            productId: product.id,
            variantId,
            title: product.title,
            variantTitle,
            price,
            image,
            handle: product.handle,
            quantity,
          },
        ];
      });

      const label = variantTitle
        ? `${product.title} (${variantTitle})`
        : product.title;
      toast.success(`Added to cart — ${label}`);
      announce(`${label} added to cart.`);
    },
    [announce]
  );

  const removeFromCart = useCallback(
    (itemId) => {
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
      toast.success('Item removed from cart');
      announce('Item removed from cart.');
    },
    [announce]
  );

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

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
        announce,
      }}
    >
      {children}
      <div aria-live="polite" role="status" className="sr-only">
        {liveMessage}
      </div>
    </CartContext.Provider>
  );
};

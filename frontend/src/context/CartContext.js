// src/context/CartContext.js
// Full Shopify Storefront API cart — NO backend proxy.
// All cart mutations call https://<store>.myshopify.com/api/2024-01/graphql.json
// directly from the browser using the public Storefront Access Token.

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { STOREFRONT_API_URL, STOREFRONT_ACCESS_TOKEN } from '../config/shopify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// ─── Storefront GraphQL helper ──────────────────────────────────────────────────────────────
async function storefrontFetch(query, variables = {}) {
  const res = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify Storefront API error: ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

// ─── GraphQL fragments & mutations ──────────────────────────────────────────────────────────
const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            priceV2 { amount currencyCode }
            product { title handle featuredImage { url altText } }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
`;

const GQL_CART_CREATE = `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const GQL_CART_FETCH = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) { ${CART_FIELDS} }
  }
`;

const GQL_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const GQL_LINES_UPDATE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const GQL_LINES_REMOVE = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ─── Provider ──────────────────────────────────────────────────────────────────────────
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // — Persist cart ID in localStorage (works for guests & logged-in users)
  const getStoredCartId = () => localStorage.getItem('shopify_cart_id');
  const storeCartId = (id) => {
    if (id) localStorage.setItem('shopify_cart_id', id);
    else localStorage.removeItem('shopify_cart_id');
  };

  // — Fetch an existing cart by ID; returns null if not found / expired
  const fetchCart = useCallback(async (cartId) => {
    try {
      const data = await storefrontFetch(GQL_CART_FETCH, { cartId });
      return data.cart || null;
    } catch {
      return null;
    }
  }, []);

  // — Ensure a valid cart exists; create one if not
  const ensureCart = useCallback(async () => {
    const stored = getStoredCartId();
    if (stored) {
      const existing = await fetchCart(stored);
      if (existing) return existing.id;
      // Expired or deleted by Shopify — create a fresh one
      storeCartId(null);
    }
    const data = await storefrontFetch(GQL_CART_CREATE, {});
    const newCart = data.cartCreate.cart;
    storeCartId(newCart.id);
    setCart(newCart);
    return newCart.id;
  }, [fetchCart]);

  // — Hydrate cart on mount
  useEffect(() => {
    const stored = getStoredCartId();
    if (!stored) return;
    fetchCart(stored).then((c) => {
      if (c) setCart(c);
      else storeCartId(null);
    });
  }, [fetchCart]);

  // — Add a variant to the cart
  const addToCart = async (variantId, quantity = 1) => {
    try {
      setIsLoading(true);
      const cartId = await ensureCart();
      const data = await storefrontFetch(GQL_LINES_ADD, {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      });
      const { cart: updated, userErrors } = data.cartLinesAdd;
      if (userErrors?.length) throw new Error(userErrors[0].message);
      setCart(updated);
      toast.success('Added to cart!');
    } catch (err) {
      console.error('addToCart error:', err);
      toast.error('Could not add to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // — Update quantity of an existing line item
  const updateCartItem = async (lineId, quantity) => {
    try {
      setIsLoading(true);
      const cartId = getStoredCartId();
      if (!cartId) return;
      const data = await storefrontFetch(GQL_LINES_UPDATE, {
        cartId,
        lines: [{ id: lineId, quantity }],
      });
      const { cart: updated, userErrors } = data.cartLinesUpdate;
      if (userErrors?.length) throw new Error(userErrors[0].message);
      setCart(updated);
    } catch (err) {
      console.error('updateCartItem error:', err);
      toast.error('Could not update item.');
    } finally {
      setIsLoading(false);
    }
  };

  // — Remove a line item from the cart
  const removeFromCart = async (lineId) => {
    try {
      setIsLoading(true);
      const cartId = getStoredCartId();
      if (!cartId) return;
      const data = await storefrontFetch(GQL_LINES_REMOVE, {
        cartId,
        lineIds: [lineId],
      });
      const { cart: updated, userErrors } = data.cartLinesRemove;
      if (userErrors?.length) throw new Error(userErrors[0].message);
      setCart(updated);
      toast.success('Item removed.');
    } catch (err) {
      console.error('removeFromCart error:', err);
      toast.error('Could not remove item.');
    } finally {
      setIsLoading(false);
    }
  };

  // — Clear cart (reset local state + localStorage)
  const clearCart = () => {
    setCart(null);
    storeCartId(null);
  };

  // — Derived helpers
  const cartItems = cart?.lines?.edges || [];

  const getCartCount = () =>
    cartItems.reduce((sum, { node }) => sum + (node.quantity || 0), 0);

  const getCartTotal = () => {
    const raw = cart?.cost?.subtotalAmount?.amount;
    return raw ? parseFloat(raw) : 0;
  };

  // — Build the Shopify checkout URL, optionally appending a discount code
  const getCheckoutUrl = (discountCode = null) => {
    if (!cart?.checkoutUrl) return null;
    if (discountCode?.trim()) {
      const url = new URL(cart.checkoutUrl);
      url.searchParams.set('discount', discountCode.trim().toUpperCase());
      return url.toString();
    }
    return cart.checkoutUrl;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
        getCheckoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

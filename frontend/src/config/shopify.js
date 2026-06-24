// src/config/shopify.js
// Shopify Storefront API configuration
// Product data is fetched from Shopify Storefront API.
// Cart, Auth, and Checkout are handled independently (no Shopify dependency).

// ---------------------------------------------------------------------------
// Storefront API — READ-ONLY product fetching
// Set REACT_APP_SHOPIFY_STORE_DOMAIN and REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
// in your .env file (or Vercel Environment Variables) before going live.
// ---------------------------------------------------------------------------
export const SHOPIFY_STORE_DOMAIN =
  process.env.REACT_APP_SHOPIFY_STORE_DOMAIN || '';

export const STOREFRONT_ACCESS_TOKEN =
  process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export const STOREFRONT_API_URL = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
  : '';

// ---------------------------------------------------------------------------
// Backend URL — FitGearzzz own API server (auth, orders, etc.)
// ---------------------------------------------------------------------------
export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || 'https://fitgearzzz-backend.onrender.com';

// ---------------------------------------------------------------------------
// Feature flags — controlled gracefully when Shopify is not yet configured
// ---------------------------------------------------------------------------
export const SHOPIFY_CONFIGURED =
  Boolean(SHOPIFY_STORE_DOMAIN && STOREFRONT_ACCESS_TOKEN);

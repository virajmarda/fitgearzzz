// src/config/shopify.js
// Central config for all Shopify-related environment variables.
// Import named exports from here — never read process.env directly in components.

// ---------------------------------------------------------------------------
// Storefront API — READ-ONLY product fetching
// Set these in .env (or Vercel Environment Variables) before going live:
//   REACT_APP_SHOPIFY_STORE_DOMAIN
//   REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
// ---------------------------------------------------------------------------

export const SHOPIFY_STORE_DOMAIN =
  process.env.REACT_APP_SHOPIFY_STORE_DOMAIN || '';

export const STOREFRONT_ACCESS_TOKEN =
  process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export const STOREFRONT_API_URL = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
  : '';

// ---------------------------------------------------------------------------
// Customer Accounts API — PKCE OAuth (auth, orders, profile)
// Set these in .env:
//   REACT_APP_SHOPIFY_CLIENT_ID
//   REACT_APP_SHOPIFY_ACCOUNT_DOMAIN  (e.g. https://account.fitgearzzz.com)
// ---------------------------------------------------------------------------

export const SHOPIFY_CLIENT_ID =
  process.env.REACT_APP_SHOPIFY_CLIENT_ID || '';

export const ACCOUNT_DOMAIN =
  process.env.REACT_APP_SHOPIFY_ACCOUNT_DOMAIN || '';

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

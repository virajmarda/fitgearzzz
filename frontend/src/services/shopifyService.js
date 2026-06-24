// src/services/shopifyService.js
// Shopify Storefront API — READ-ONLY product & collection fetching.
// This is the ONLY file that talks to Shopify. No cart, no auth, no checkout.
//
// When SHOPIFY is not yet configured (env vars not set), all functions return
// safe empty results so the app boots and renders without crashing.

import {
  STOREFRONT_API_URL,
  STOREFRONT_ACCESS_TOKEN,
  SHOPIFY_CONFIGURED,
} from '../config/shopify';

// ---------------------------------------------------------------------------
// Internal fetch helper
// ---------------------------------------------------------------------------
const shopifyFetch = async (query, variables = {}) => {
  if (!SHOPIFY_CONFIGURED) {
    console.warn('[shopifyService] Shopify not configured. Set REACT_APP_SHOPIFY_STORE_DOMAIN and REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    if (data.errors?.length) throw new Error(data.errors[0].message);
    return data.data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error('[shopifyService]', err.message);
    return null;
  }
};

// ---------------------------------------------------------------------------
// Product Fragments
// ---------------------------------------------------------------------------
const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    productType
    tags
    vendor
    availableForSale
    featuredImage { url altText }
    images(first: 8) { edges { node { url altText } } }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText }
        }
      }
    }
    options { name values }
    metafields(identifiers: [
      { namespace: "custom", key: "highlight_1" }
      { namespace: "custom", key: "highlight_2" }
      { namespace: "custom", key: "highlight_3" }
    ]) { key value }
  }
`;

// ---------------------------------------------------------------------------
// Normalise a raw Shopify product node into a flat, consistent shape
// ---------------------------------------------------------------------------
export const normaliseProduct = (node) => ({
  ...node,
  images: node.images?.edges?.map((e) => e.node) ?? [],
  variants: node.variants?.edges?.map((e) => e.node) ?? [],
});

// ---------------------------------------------------------------------------
// fetchProducts — homepage / listing
// ---------------------------------------------------------------------------
export const fetchProducts = async (first = 20, query = '') => {
  const GQL = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!, $query: String) {
      products(first: $first, query: $query, sortKey: BEST_SELLING) {
        edges { node { ...ProductFields } }
      }
    }
  `;
  const data = await shopifyFetch(GQL, { first, query });
  if (!data) return [];
  return data.products.edges.map((e) => normaliseProduct(e.node));
};

// ---------------------------------------------------------------------------
// fetchProductByHandle — product detail page
// ---------------------------------------------------------------------------
export const fetchProductByHandle = async (handle) => {
  const GQL = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
  `;
  const data = await shopifyFetch(GQL, { handle });
  if (!data?.productByHandle) return null;
  return normaliseProduct(data.productByHandle);
};

// ---------------------------------------------------------------------------
// fetchProductsByCollection — collection / category page
// ---------------------------------------------------------------------------
export const fetchProductsByCollection = async (handle, first = 24) => {
  const GQL = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        title
        description
        products(first: $first) {
          edges { node { ...ProductFields } }
        }
      }
    }
  `;
  const data = await shopifyFetch(GQL, { handle, first });
  if (!data?.collectionByHandle) return [];
  return data.collectionByHandle.products.edges.map((e) => normaliseProduct(e.node));
};

// ---------------------------------------------------------------------------
// searchProducts — search bar
// ---------------------------------------------------------------------------
export const searchProducts = async (searchTerm, first = 12) => {
  return fetchProducts(first, `title:*${searchTerm}* OR tag:*${searchTerm}*`);
};

// ---------------------------------------------------------------------------
// fetchCollections — categories / nav
// ---------------------------------------------------------------------------
export const fetchCollections = async (first = 8) => {
  const GQL = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id title handle
            image { url altText }
            description
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(GQL, { first });
  if (!data) return [];
  return data.collections.edges.map((e) => e.node);
};

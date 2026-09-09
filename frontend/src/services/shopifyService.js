// src/services/shopifyService.js
// Data access layer for the storefront.
//
// DEMO MODE (default): serves the central mock catalogue in src/data. No
// environment variables or Shopify account required — the whole shopping
// journey works out of the box.
//
// SHOPIFY MODE: when REACT_APP_SHOPIFY_STORE_DOMAIN and
// REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN are set, real products are fetched
// from the Storefront API and normalised to the SAME flat product shape used in
// demo mode, so no UI component needs to change.
//
// TODO(shopify): map productType/collections to the five brand pillars once the
// live catalogue is organised (train / carry / recover / wear).

import {
  STOREFRONT_API_URL,
  STOREFRONT_ACCESS_TOKEN,
  SHOPIFY_CONFIGURED,
} from '../config/shopify';
import {
  mockProducts,
  getProductByHandle,
  getRelatedProducts as getRelatedMock,
} from '../data/mockProducts';
import { mockCollections, getCollectionByHandle } from '../data/mockCollections';

// Simulate a tiny network delay so loading states are exercised in demo mode.
const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Shopify fetch helper (only used when configured)
// ---------------------------------------------------------------------------
const shopifyFetch = async (query, variables = {}) => {
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

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id title handle description descriptionHtml productType tags vendor availableForSale
    featuredImage { url altText }
    images(first: 8) { edges { node { url altText } } }
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount } }
    options { name values }
    variants(first: 30) {
      edges { node {
        id title availableForSale quantityAvailable
        price { amount currencyCode }
        compareAtPrice { amount }
        selectedOptions { name value }
        image { url altText }
      } }
    }
  }
`;

// Map a raw Shopify node to the canonical flat product shape.
export const normaliseProduct = (node) => {
  if (!node) return null;
  const images = node.images?.edges?.map((e) => ({
    url: e.node.url,
    alt: e.node.altText || node.title,
  })) ?? [];
  const price = Number(node.priceRange?.minVariantPrice?.amount || 0);
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice?.amount
    ? Number(node.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const tags = node.tags || [];
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    shortDescription: (node.description || '').slice(0, 140),
    description: node.description || '',
    price,
    compareAtPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : null,
    currency: node.priceRange?.minVariantPrice?.currencyCode || 'INR',
    image: node.featuredImage?.url || images[0]?.url || null,
    images: images.length ? images : node.featuredImage ? [{ url: node.featuredImage.url, alt: node.title }] : [],
    category: node.productType || '',
    collection: (node.productType || '').toLowerCase(),
    brand: node.vendor || 'Fitgearzzz',
    rating: null,
    reviewCount: null,
    stock: node.availableForSale ? 99 : 0,
    availability: node.availableForSale ? 'in_stock' : 'out_of_stock',
    badge: tags.includes('new') ? 'New' : tags.includes('bestseller') ? 'Bestseller' : null,
    tags,
    options: node.options?.map((o) => ({ name: o.name, values: o.values })) ?? [],
    variants:
      node.variants?.edges?.map((e) => ({
        id: e.node.id,
        title: e.node.title,
        available: e.node.availableForSale,
        price: Number(e.node.price?.amount || price),
        compareAtPrice: e.node.compareAtPrice?.amount ? Number(e.node.compareAtPrice.amount) : null,
        options: Object.fromEntries((e.node.selectedOptions || []).map((s) => [s.name, s.value])),
      })) ?? [],
    sizes: [],
    colours: [],
    fit: null,
    material: null,
    care: null,
    shipping: 'Pan-India delivery.',
    returns: '7-day returns.',
  };
};

// ---------------------------------------------------------------------------
// Public API — identical signatures for demo + shopify modes
// ---------------------------------------------------------------------------

export const fetchProducts = async (first = 50, query = '') => {
  if (SHOPIFY_CONFIGURED) {
    const GQL = `${PRODUCT_FRAGMENT}
      query GetProducts($first: Int!, $query: String) {
        products(first: $first, query: $query, sortKey: BEST_SELLING) {
          edges { node { ...ProductFields } }
        }
      }`;
    const data = await shopifyFetch(GQL, { first, query });
    if (!data) return [];
    return data.products.edges.map((e) => normaliseProduct(e.node));
  }
  await delay();
  return mockProducts.slice(0, first);
};

export const fetchProductByHandle = async (handle) => {
  if (SHOPIFY_CONFIGURED) {
    const GQL = `${PRODUCT_FRAGMENT}
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) { ...ProductFields }
      }`;
    const data = await shopifyFetch(GQL, { handle });
    if (!data?.productByHandle) return null;
    return normaliseProduct(data.productByHandle);
  }
  await delay();
  return getProductByHandle(handle);
};

export const fetchProductsByCollection = async (handle, first = 50) => {
  if (SHOPIFY_CONFIGURED) {
    const GQL = `${PRODUCT_FRAGMENT}
      query GetCollection($handle: String!, $first: Int!) {
        collectionByHandle(handle: $handle) {
          title description
          products(first: $first) { edges { node { ...ProductFields } } }
        }
      }`;
    const data = await shopifyFetch(GQL, { handle, first });
    if (!data?.collectionByHandle) return [];
    return data.collectionByHandle.products.edges.map((e) => normaliseProduct(e.node));
  }
  await delay();
  return mockProducts.filter((p) => p.collection === handle).slice(0, first);
};

export const searchProducts = async (searchTerm, first = 24) => {
  if (SHOPIFY_CONFIGURED) {
    return fetchProducts(first, `title:*${searchTerm}* OR tag:*${searchTerm}*`);
  }
  await delay();
  const q = (searchTerm || '').toLowerCase().trim();
  if (!q) return mockProducts.slice(0, first);
  return mockProducts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        (p.category || '').toLowerCase().includes(q)
    )
    .slice(0, first);
};

export const fetchCollections = async () => {
  if (SHOPIFY_CONFIGURED) {
    const GQL = `query GetCollections($first: Int!) {
      collections(first: $first) {
        edges { node { id title handle image { url altText } description } }
      }
    }`;
    const data = await shopifyFetch(GQL, { first: 8 });
    if (!data) return [];
    return data.collections.edges.map((e) => e.node);
  }
  await delay();
  return mockCollections;
};

export const fetchCollection = async (handle) => {
  if (!SHOPIFY_CONFIGURED) {
    await delay();
    return getCollectionByHandle(handle);
  }
  const cols = await fetchCollections();
  return cols.find((c) => c.handle === handle) || null;
};

export const fetchRelatedProducts = async (product, limit = 4) => {
  if (SHOPIFY_CONFIGURED) {
    const all = await fetchProducts(20);
    return all.filter((p) => p.id !== product?.id).slice(0, limit);
  }
  await delay();
  return getRelatedMock(product, limit);
};

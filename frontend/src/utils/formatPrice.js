// src/utils/formatPrice.js
// Canonical price formatter for FitGearzzz.
// Always formats in INR (Indian Rupees) using Intl.NumberFormat.
// Usage:
//   import { formatPrice, parseShopifyPrice } from '../utils/formatPrice';
//   formatPrice(1299)     => '\u20b91,299'
//   formatPrice(1299.50)  => '\u20b91,299.50'

/**
 * Format a numeric price in INR.
 * @param {number|string} amount - Raw price value (e.g. 1299 or '1299.00').
 * @returns {string} Formatted string like '\u20b91,299'.
 */
export function formatPrice(amount) {
  const num = parseFloat(amount);
  if (isNaN(num)) return '\u20b90';
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    // Fallback for environments without full Intl support
    return `\u20b9${num.toLocaleString('en-IN')}`;
  }
}

/**
 * Parse a Shopify price string (e.g. '1299.00') to a number.
 * Shopify returns prices as strings in storefront API.
 * @param {string|number} shopifyPrice
 * @returns {number}
 */
export function parseShopifyPrice(shopifyPrice) {
  if (shopifyPrice == null) return 0;
  return parseFloat(String(shopifyPrice).replace(/[^0-9.]/g, '')) || 0;
}

/**
 * Calculate discount percentage from original and sale price.
 * @param {number} original
 * @param {number} sale
 * @returns {number} Integer percentage (0–99).
 */
export function discountPercent(original, sale) {
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Return true if the cart total qualifies for free shipping.
 * Threshold: \u20b9499 for Pan-India delivery.
 */
export const FREE_SHIPPING_THRESHOLD = 499;

export function qualifiesForFreeShipping(totalAmount) {
  return parseFloat(totalAmount) >= FREE_SHIPPING_THRESHOLD;
}

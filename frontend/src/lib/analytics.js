/**
 * analytics.js — Issue #7
 *
 * Clean analytics abstraction for FitGearzzz.
 * No real IDs hardcoded — all loaded from env vars.
 * Safe no-op when IDs are absent (dev / pre-launch).
 *
 * ACTIVATION INSTRUCTIONS:
 *   1. Add to Vercel env vars:
 *      REACT_APP_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
 *      REACT_APP_META_PIXEL_ID=your_pixel_id
 *   2. Remove hardcoded pixel IDs from public/index.html (see comment there)
 *   3. This module auto-activates once env vars are set
 */

const GA4_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID;
const PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;

const isGA4Ready = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  !!GA4_ID;

const isPixelReady = () =>
  typeof window !== 'undefined' &&
  typeof window.fbq === 'function' &&
  !!PIXEL_ID;

function ga4(eventName, params = {}) {
  if (!isGA4Ready()) return;
  try { window.gtag('event', eventName, params); } catch (e) {}
}

function pixel(eventName, params = {}) {
  if (!isPixelReady()) return;
  try { window.fbq('track', eventName, params); } catch (e) {}
}

export function trackViewItem(product) {
  if (!product) return;
  const price = parseFloat(product?.priceRange?.minVariantPrice?.amount || product?.price || 0);
  const currency = product?.priceRange?.minVariantPrice?.currencyCode || 'INR';
  ga4('view_item', {
    currency, value: price,
    items: [{ item_id: product.id, item_name: product.title, item_category: product?.productType || '', price, quantity: 1 }],
  });
  pixel('ViewContent', { content_ids: [product.id], content_name: product.title, content_type: 'product', value: price, currency });
}

export function trackAddToCart(product, quantity = 1) {
  if (!product) return;
  const price = parseFloat(product?.priceRange?.minVariantPrice?.amount || product?.price || 0);
  const currency = product?.priceRange?.minVariantPrice?.currencyCode || 'INR';
  ga4('add_to_cart', {
    currency, value: price * quantity,
    items: [{ item_id: product.id, item_name: product.title, item_category: product?.productType || '', price, quantity }],
  });
  pixel('AddToCart', { content_ids: [product.id], content_name: product.title, content_type: 'product', value: price * quantity, currency, num_items: quantity });
}

export function trackBeginCheckout(cartItems = [], totalValue = 0) {
  const currency = 'INR';
  ga4('begin_checkout', {
    currency, value: totalValue,
    items: cartItems.map(({ product, quantity }) => ({
      item_id: product?.id, item_name: product?.title,
      price: parseFloat(product?.price || 0), quantity: quantity || 1,
    })),
  });
  pixel('InitiateCheckout', { value: totalValue, currency, num_items: cartItems.reduce((a, i) => a + (i.quantity || 1), 0) });
}

export function trackPurchase({ orderId, items = [], totalValue = 0 }) {
  const currency = 'INR';
  ga4('purchase', {
    transaction_id: orderId, currency, value: totalValue,
    items: items.map(({ product, quantity }) => ({
      item_id: product?.id, item_name: product?.title,
      price: parseFloat(product?.price || 0), quantity: quantity || 1,
    })),
  });
  pixel('Purchase', {
    value: totalValue, currency,
    content_ids: items.map(({ product }) => product?.id),
    num_items: items.reduce((a, i) => a + (i.quantity || 1), 0),
  });
}

export function trackNewsletterAttempt(source = 'unknown') {
  ga4('newsletter_subscribe_attempt', { source });
  if (isPixelReady()) window.fbq('trackCustom', 'NewsletterAttempt', { source });
}

export function trackNewsletterSuccess(source = 'unknown') {
  ga4('newsletter_subscribe_success', { source });
  if (isPixelReady()) window.fbq('trackCustom', 'NewsletterSuccess', { source });
}

const analytics = { trackViewItem, trackAddToCart, trackBeginCheckout, trackPurchase, trackNewsletterAttempt, trackNewsletterSuccess };
export default analytics;

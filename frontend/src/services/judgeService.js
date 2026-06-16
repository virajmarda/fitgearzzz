// src/services/judgeService.js
// Calls Judge.me public API directly — no backend proxy required.
// Judge.me supports CORS from the browser for public read endpoints.
import { SHOPIFY_STORE_DOMAIN } from '../config/shopify';

const JUDGE_ME_BASE = 'https://judge.me/api/v1';
// Public API token (read-only, safe to expose in client code)
const JUDGE_ME_API_TOKEN = process.env.REACT_APP_JUDGEME_PUBLIC_TOKEN || '';

/**
 * Fetch reviews for a product directly from Judge.me.
 * Falls back to empty data on error so the page still renders.
 */
export const fetchProductReviews = async (shopifyProductId) => {
  try {
    // Extract numeric ID from Shopify GID format: gid://shopify/Product/12345
    const productId = shopifyProductId.includes('gid://')
      ? shopifyProductId.split('/').pop()
      : shopifyProductId;

    const url = new URL(`${JUDGE_ME_BASE}/reviews`);
    url.searchParams.set('api_token', JUDGE_ME_API_TOKEN);
    url.searchParams.set('shop_domain', SHOPIFY_STORE_DOMAIN);
    url.searchParams.set('product_id', productId);
    url.searchParams.set('per_page', '50');

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Judge.me error: ${res.status}`);
    const json = await res.json();

    const reviews = (json.reviews ?? []).map((r) => ({
      id:          r.id,
      title:       r.title,
      body:        r.body,
      rating:      r.rating,
      author:      r.reviewer?.name ?? 'Anonymous',
      createdAt:   r.created_at,
      verified:    r.verified,
    }));

    const total  = reviews.length;
    const rating = total > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0;

    return { reviews, rating, reviewCount: total };
  } catch (error) {
    console.error('Error fetching reviews from Judge.me:', error);
    return { reviews: [], rating: 0, reviewCount: 0 };
  }
};

/**
 * Initialize Judge.me widget on the page.
 * This is purely client-side script injection — no backend required.
 */
export const initializeJudgeWidget = (productId, productHandle) => {
  if (!window.jdgm) {
    const script = document.createElement('script');
    script.src = 'https://cdn.judge.me/shopify_v2.js';
    script.async = true;
    script.onload = () => {
      if (window.jdgm) {
        window.jdgm.customerId = null;
        window.jdgm.productId  = productId;
      }
    };
    document.body.appendChild(script);
  } else if (window.jdgm?.reload) {
    window.jdgm.reload();
  }
};

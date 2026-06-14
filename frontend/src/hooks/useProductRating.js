/**
 * useProductRating — Issue #5
 *
 * A truthful rating abstraction for FitGearzzz.
 * Priority order for real data:
 *   1. Shopify metafields (reviews.rating / reviews.rating_count)
 *   2. Reviews app JSON (e.g. Judge.me, Okendo) via product metafields
 *   3. Custom backend API (future)
 *   4. Empty state — never fake data
 *
 * Usage:
 *   const { rating, reviewCount, hasRatings, stars } = useProductRating(product);
 */

import { useMemo } from 'react';

/**
 * Pure helper — extracts rating from a Shopify product object.
 * Returns null if no valid rating is found.
 *
 * @param {Object} product - Shopify product node
 * @returns {{ rating: number|null, reviewCount: number|null }}
 */
export function getProductRating(product) {
  if (!product) return { rating: null, reviewCount: null };

  // --- Source 1: Shopify metafields (standard reviews namespace) ---
  // Shopify native reviews metafields use namespace "reviews"
  // Shape: product.metafields.edges[].node.{ namespace, key, value }
  const metafields = product?.metafields?.edges || product?.metafields || [];

  const ratingMeta = metafields.find(
    (m) =>
      (m?.node?.namespace === 'reviews' && m?.node?.key === 'rating') ||
      (m?.namespace === 'reviews' && m?.key === 'rating')
  );

  const countMeta = metafields.find(
    (m) =>
      (m?.node?.namespace === 'reviews' && m?.node?.key === 'rating_count') ||
      (m?.namespace === 'reviews' && m?.key === 'rating_count')
  );

  if (ratingMeta) {
    const rawRating = ratingMeta?.node?.value ?? ratingMeta?.value;
    const rawCount = countMeta?.node?.value ?? countMeta?.value;

    const rating = parseFloat(rawRating);
    const reviewCount = parseInt(rawCount, 10);

    if (!isNaN(rating) && rating >= 0 && rating <= 5) {
      return {
        rating,
        reviewCount: !isNaN(reviewCount) && reviewCount >= 0 ? reviewCount : null,
      };
    }
  }

  // --- Source 2: Reviews app data on product object ---
  // Some review apps (Judge.me, Okendo) inject fields directly
  if (product?.rating && !isNaN(parseFloat(product.rating))) {
    return {
      rating: parseFloat(product.rating),
      reviewCount: product.reviewCount ?? product.review_count ?? null,
    };
  }

  // --- Source 3: No rating data found — return null (show empty state) ---
  return { rating: null, reviewCount: null };
}

/**
 * React hook — wraps getProductRating with memoisation.
 *
 * Returns:
 *   rating        {number|null}  — average rating 0-5, or null
 *   reviewCount   {number|null}  — total review count, or null
 *   hasRatings    {boolean}      — true if real rating data exists
 *   stars         {Array}        — array of 5 objects: { filled, half, empty }
 *
 * @param {Object} product
 */
export function useProductRating(product) {
  return useMemo(() => {
    const { rating, reviewCount } = getProductRating(product);
    const hasRatings = rating !== null;

    // Build star display data
    const stars = Array.from({ length: 5 }, (_, i) => {
      if (!hasRatings) return { filled: false, half: false, empty: true };
      const full = Math.floor(rating);
      const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
      if (i < full) return { filled: true, half: false, empty: false };
      if (i === full && hasHalf) return { filled: false, half: true, empty: false };
      return { filled: false, half: false, empty: true };
    });

    return { rating, reviewCount, hasRatings, stars };
  }, [product]);
}

export default useProductRating;

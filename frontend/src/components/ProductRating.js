/**
 * ProductRating component — Issue #5
 *
 * Truthful rating display. Shows stars and review count ONLY when real data exists.
 * Never displays fake/hardcoded ratings.
 *
 * Usage in ProductCard:
 *   <ProductRating product={product} size="sm" />
 *
 * Usage in ProductDetail:
 *   <ProductRating product={product} size="md" showCount />
 */

import React from 'react';
import { Star } from 'lucide-react';
import { useProductRating } from '../hooks/useProductRating';

/**
 * @param {Object}  product    - Shopify product object
 * @param {'sm'|'md'|'lg'} size - star size variant
 * @param {boolean} showCount  - whether to show review count text
 * @param {string}  className  - additional classes
 */
const ProductRating = ({ product, size = 'sm', showCount = true, className = '' }) => {
  const { rating, reviewCount, hasRatings, stars } = useProductRating(product);

  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starSize = sizeMap[size] || sizeMap.sm;

  // No ratings at all — show neutral empty state, never fake data
  if (!hasRatings) {
    return (
      <div className={`flex items-center gap-1 ${className}`} aria-label="No reviews yet">
        {stars.map((_, i) => (
          <Star key={i} className={`${starSize} text-zinc-700`} aria-hidden="true" />
        ))}
        {showCount && (
          <span className="text-xs text-zinc-500 ml-1">No reviews yet</span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      aria-label={`Rating: ${rating.toFixed(1)} out of 5${
        reviewCount !== null ? `, ${reviewCount} review${reviewCount !== 1 ? 's' : ''}` : ''
      }`}
    >
      {stars.map((star, i) => (
        <Star
          key={i}
          className={`${starSize} ${
            star.filled
              ? 'text-amber-400 fill-amber-400'
              : star.half
              ? 'text-amber-400 fill-amber-200'
              : 'text-zinc-600'
          }`}
          aria-hidden="true"
        />
      ))}
      {showCount && (
        <span className="text-xs text-zinc-400 ml-1">
          {rating.toFixed(1)}
          {reviewCount !== null && ` (${reviewCount.toLocaleString()})`}
        </span>
      )}
    </div>
  );
};

export default ProductRating;

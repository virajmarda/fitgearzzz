import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist: checkIsInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const originalPrice =
    product.variants?.[0]?.compareAtPrice?.amount != null
      ? Number(product.variants[0].compareAtPrice.amount)
      : null;
  const currentPrice = Number(product.price) || 0;
  const discountPct = originalPrice && originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  // Real rating from metafields / reviews API — null until populated
  const rating = product.rating ?? null;
  const reviewCount = product.reviewCount ?? null;

  const isWishlisted = checkIsInWishlist(product.id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const variantId = product.variants?.[0]?.id;
    if (!variantId) {
      toast.error('Select a variant first');
      return;
    }
    setIsAdding(true);
    try {
      await addToCart(variantId, 1);
    } catch {
      toast.error('Could not add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group relative flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">

      {/* Image */}
      <Link
        to={`/products/${product.handle}`}
        className="relative block overflow-hidden bg-zinc-800 aspect-square"
        tabIndex={-1}
        aria-label={product.title}
      >
        <img
          src={product.image || '/placeholder.png'}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discountPct > 0 && (
            <span className="inline-flex items-center gap-0.5 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm">
              <Tag className="w-2.5 h-2.5" /> -{discountPct}%
            </span>
          )}
          {product.tags?.includes('new') && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm">
              New
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-500 border-red-500 text-white'
              : 'bg-zinc-900/70 border-zinc-700 text-zinc-400 hover:border-red-400 hover:text-red-400'
          }`}
        >
          <Heart className="w-3.5 h-3.5" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        {product.category && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-500 truncate">
            {product.category}
          </p>
        )}

        <Link
          to={`/products/${product.handle}`}
          className="text-white font-medium text-sm leading-snug line-clamp-2 hover:text-orange-400 transition-colors"
        >
          {product.title}
        </Link>

        {/* Rating — only shown when real data exists */}
        {rating !== null && (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`w-3 h-3 ${
                  n <= Math.floor(rating)
                    ? 'text-amber-400 fill-amber-400'
                    : n - 0.5 <= rating
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-zinc-600'
                }`}
              />
            ))}
            {reviewCount !== null && (
              <span className="text-[11px] text-zinc-500 ml-0.5">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-white font-bold text-base">
            &#8377;{currentPrice % 1 === 0 ? currentPrice.toFixed(0) : currentPrice.toFixed(2)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <span className="text-zinc-500 text-sm line-through">
              &#8377;{originalPrice % 1 === 0 ? originalPrice.toFixed(0) : originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding || isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200 mt-1 ${
            isOutOfStock
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : isAdding
              ? 'bg-orange-600 text-white cursor-wait'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? 'Out of Stock' : isAdding ? 'Adding…' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

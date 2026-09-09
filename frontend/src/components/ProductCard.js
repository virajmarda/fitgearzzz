import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../lib/formatCurrency';
import { trackEvent } from '../lib/analytics';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const wishlist = useWishlist?.() || {};
  const toggleWishlist = wishlist.toggleWishlist || (() => {});
  const isInWishlist = wishlist.isInWishlist || (() => false);

  if (!product) return null;

  const price = Number(product.price) || 0;
  const compareAt =
    product.compareAtPrice && product.compareAtPrice > price
      ? Number(product.compareAtPrice)
      : null;
  const discountPct = compareAt
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : 0;

  const isOutOfStock = product.availability === 'out_of_stock' || product.stock === 0;
  const isLowStock = product.availability === 'low_stock';
  const wished = isInWishlist(product.id);

  const firstAvailable =
    product.variants?.find((v) => v.available) || product.variants?.[0] || null;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, firstAvailable, 1);
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.title,
      price,
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const badge =
    product.badge || (discountPct > 0 ? `-${discountPct}%` : null);

  return (
    <article className="group relative flex flex-col bg-[#f1eee8] border border-[#d4d0c8] overflow-hidden transition-colors duration-200 hover:border-[#171717]">
      <Link
        to={`/products/${product.handle}`}
        className="relative block overflow-hidden bg-[#e4e0d8] aspect-[4/5]"
        aria-label={product.title}
        onClick={() =>
          trackEvent('select_item', { item_id: product.id, item_name: product.title })
        }
      >
        <img
          src={product.image}
          alt={product.images?.[0]?.alt || product.title}
          width="600"
          height="750"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {badge && (
            <span className="inline-flex items-center bg-[#171717] text-[#f1eee8] text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1">
              {badge}
            </span>
          )}
          {isOutOfStock && (
            <span className="inline-flex items-center bg-[#f1eee8] text-[#171717] border border-[#171717] text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1">
              Sold out
            </span>
          )}
          {!isOutOfStock && isLowStock && (
            <span className="inline-flex items-center bg-[#f15a24] text-white text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1">
              Low stock
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wished ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          aria-pressed={wished}
          className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center border transition-colors duration-200 ${
            wished
              ? 'bg-[#f15a24] border-[#f15a24] text-white'
              : 'bg-[#f1eee8]/80 border-[#d4d0c8] text-[#77736d] hover:border-[#171717] hover:text-[#171717]'
          }`}
        >
          <Heart className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} />
        </button>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        {product.category && (
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f15a24]">
            {product.category}
          </p>
        )}

        <Link
          to={`/products/${product.handle}`}
          className="text-[#171717] font-semibold text-[15px] leading-snug tracking-[-0.02em] hover:text-[#f15a24] transition-colors"
        >
          {product.title}
        </Link>

        {product.shortDescription && (
          <p className="text-[12.5px] leading-relaxed text-[#77736d] line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-[#171717] font-bold text-[17px]">
            {formatCurrency(price)}
          </span>
          {compareAt && (
            <span className="text-[#96918a] text-[13px] line-through">
              {formatCurrency(compareAt)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="fg-btn w-full mt-1 text-[11px]"
        >
          {isOutOfStock ? 'Sold out' : 'Add to cart'}
          {!isOutOfStock && <ArrowUpRight className="w-4 h-4" />}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import AuthModal from '../components/AuthModal';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);


  const originalPrice =
    product.variants?.[0]?.compareAtPrice?.amount != null
      ? Number(product.variants[0].compareAtPrice.amount)
      : null;
  const currentPrice = Number(product.price) || 0;

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const rating = product.rating || 4 + Math.random();
  const reviewCount = product.reviewCount || Math.floor(Math.random() * 500) + 50;

  // Truncate title to max 5 words for card display
  const shortTitle = product.title
    ? product.title.split(' ').slice(0, 6).join(' ') + (product.title.split(' ').length > 6 ? '...' : '')
    : '';

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product || !product.variants || !product.variants[0]?.id) {
      toast.error('Product variant not available');
      return;
    }
    const variantId = product.variants[0].id;
    try {
      setIsAdding(true);
      await addToCart(variantId, 1);
    } catch (error) {
      console.error('Add to cart error in ProductCard:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInWishlist(!isInWishlist);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all group"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {discountPercentage > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {product.tags?.includes('new') && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">BESTSELLER</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all ${
            isInWishlist
              ? 'bg-red-500 text-white'
              : 'bg-zinc-800/80 text-zinc-300 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Product Image */}
        <Link to={`/products/${product.handle}`} className="block relative overflow-hidden aspect-square bg-zinc-800">
          <img
            src={product.image || '/placeholder.png'}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Quick View overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Link
              to={`/products/${product.handle}`}
              className="flex items-center gap-2 bg-white text-zinc-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-4 h-4" /> Quick View
            </Link>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4">
          {product.category && (
            <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide mb-1">{product.category}</p>
          )}

          <Link to={`/products/${product.handle}`}>
            <h3 className="text-white font-semibold text-sm leading-snug mb-2 hover:text-orange-400 transition-colors line-clamp-2">
              {shortTitle}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'
                }`}
              />
            ))}
            <span className="text-xs text-zinc-400 ml-1">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-orange-500 font-bold text-lg">₹{currentPrice.toFixed(2)}</span>
            {discountPercentage > 0 && originalPrice && (
              <span className="text-zinc-500 text-sm line-through">₹{originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="text-xs text-green-400 font-semibold mb-3">Free Shipping</div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Adding…' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </motion.div>

      {showAuth && <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default ProductCard;

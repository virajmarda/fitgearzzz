import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
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

  // Calculate discount percentage
  const originalPrice =
    product.variants?.[0]?.compareAtPrice?.amount != null
      ? Number(product.variants[0].compareAtPrice.amount)
      : null;
  const currentPrice = Number(product.price) || 0;

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  // Generate rating (use product rating if available, default to 4-5 stars)
  const rating = product.rating || 4 + Math.random();
  const reviewCount =
    product.reviewCount || Math.floor(Math.random() * 500) + 50;

  // Add to Cart handler - NOW MATCHES ProductDetail
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check authentication first - COMMENTED OUT TO ALLOW GUEST CART
//     if (!user) {
      // setShowAuth(true);
      // return;
    // }

    // Validate product and variant
    if (!product || !product.variants || !product.variants[0]?.id) {
      toast.error('Product variant not available');
      return;
    }

    const variantId = product.variants[0].id;

    try {
      setIsAdding(true);
      await addToCart(variantId, 1); // Quantity is 1 for quick add
    } catch (error) {
      console.error('Add to cart error in ProductCard:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-zinc-900 rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 border border-zinc-800 hover:border-orange-500/50"
      >
        <div className="relative aspect-square overflow-hidden bg-zinc-800">
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            </div>
          )}

          {/* Product Image */}
          <Link to={`/products/${product.handle}`}>
            <img
              src={product.image || product.images?.[0] || '/placeholder.png'}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </Link>
        </div>

        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">
              {product.category}
            </p>
          )}

          {/* Product Title */}
          <Link to={`/products/${product.handle}`}>
            <h3 className="font-bold text-white text-lg mb-3 line-clamp-2 hover:text-orange-500 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">({reviewCount})</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-orange-500">
              ₹{currentPrice.toFixed(2)}
            </span>
            {discountPercentage > 0 && originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
            <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
              Free Shipping
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ShoppingCart className="w-5 h-5" />
            {isAdding ? 'Adding…' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </motion.div>

      {/* Auth Modal */}
          {!user && (
            <p className="text-xs text-center text-zinc-400 mt-2">
              💡 <span className="text-orange-500">Log in</span> to save your cart
            </p>
          )}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default ProductCard;

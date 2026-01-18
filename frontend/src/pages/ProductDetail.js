import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import { toast } from 'sonner';
import api from '../utils/api';
import { fetchProductByHandle } from '../services/shopifyService';

const ProductDetail = () => {
  const { handle } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [reviews, setReviews] = useState({ reviews: [], rating: 0, reviewCount: 0 });
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        const productData = await fetchProductByHandle(handle);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoadingProduct(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const res = await api.get(`/reviews/product/${handle}`);
        setReviews(res.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [handle]);

  const handleReviewSubmitted = (newReviewData) => {
    setReviews(newReviewData);
  };

  const handleAddToCart = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    if (!product || !product.variants || !product.variants[0]?.id) {
      toast.error('Product variant not available');
      return;
    }

    const variantId = product.variants[0].id;

    try {
      setIsAdding(true);
      await addToCart(variantId, quantity);
    } catch (error) {
      console.error('Add to cart error in ProductDetail:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (loadingProduct || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <p className="text-zinc-400">Loading product...</p>
      </div>
    );
  }

  const price = parseFloat(product.price || product.variants?.[0]?.priceV2?.amount || 0);
  const compareAtPrice = parseFloat(product.compareAtPrice || price * 1.2);
  const discount = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-zinc-600 mb-6">
          Home › Electronics › {product.title}
        </div>

        {/* Product layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Left: Image */}
          <div className="relative bg-zinc-50 rounded-2xl overflow-hidden">
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                -{discount}% OFF
              </div>
            )}
            <img
              src={product.image || product.featuredImage?.url || '/placeholder.png'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            {/* Brand and Stock */}
            <div className="flex items-center gap-3">
              <span className="px-4 py-1 bg-zinc-100 text-zinc-800 rounded-full text-sm font-semibold">
                FitGear
              </span>
              <span className="px-4 py-1 bg-green-50 text-green-600 border border-green-200 rounded-full text-sm font-semibold">
                In Stock
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 text-gray-300" />
              </div>
              <span className="text-zinc-600">
                {reviews.rating.toFixed(1)} ({reviews.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-zinc-900">
                  ${price.toFixed(2)}
                </span>
                {discount > 0 && (
                  <span className="text-2xl text-zinc-400 line-through">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold">
                    SAVE ${(compareAtPrice - price).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Truck className="w-5 h-5" />
                <span className="font-semibold">Free Shipping</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-zinc-900">Description</h2>
              <p className="text-zinc-600 leading-relaxed">
                {product.description || 'Experience immersive sound with our premium wireless headphones featuring noise cancellation technology.'}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-zinc-900">Key Features</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Premium build quality and ergonomic design</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Long battery life for extended use</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Advanced connectivity features</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Built-in controls for easy operation</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Comfortable for all-day wear</span>
                </li>
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-zinc-700">
                <span className="font-semibold">Quantity:</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-zinc-100 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-zinc-700 hover:text-orange-500 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-zinc-900 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-zinc-700 hover:text-orange-500 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdding}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-base uppercase tracking-wide rounded-lg py-6 shadow-lg disabled:opacity-60"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAdding ? 'Adding…' : 'Add to Cart'}
                </Button>

                <button className="w-12 h-12 flex items-center justify-center border-2 border-zinc-200 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>

                <button className="w-12 h-12 flex items-center justify-center border-2 border-zinc-200 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 uppercase">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {loadingReviews ? (
                <div className="bg-zinc-50 rounded-2xl p-8 text-center">
                  <p className="text-zinc-600">Loading reviews...</p>
                </div>
              ) : (
                <ReviewsList
                  reviews={reviews.reviews}
                  rating={reviews.rating}
                  reviewCount={reviews.reviewCount}
                />
              )}
            </div>
            <div>
              {user ? (
                <ReviewForm
                  product={product}
                  user={user}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              ) : (
                <div className="bg-zinc-50 rounded-2xl p-8 text-center">
                  <p className="text-zinc-600 mb-4">Please log in to write a review</p>
                  <Button
                    onClick={() => setShowAuth(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold uppercase tracking-wide rounded-lg"
                  >
                    Log In to Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default ProductDetail;

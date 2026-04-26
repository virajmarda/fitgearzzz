import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Share2, ChevronRight, AlertCircle, Package, Check, RotateCcw, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import ProductDescriptionFormatter from '../components/ProductDescriptionFormatter';
import SeoProductSchema from '../components/SeoProductSchema';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import { toast } from 'sonner';
import api from '../utils/api';
import { fetchProductByHandle } from '../services/shopifyService';

const ProductDetail = () => {
  const { handle } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [showShareMenu, setShowShareMenu] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [reviews, setReviews] = useState({
    reviews: [],
    rating: 0,
    reviewCount: 0,
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
        // Use widget endpoint because we have a handle, not a product ID
        const res = await api.get(`/reviews/widget/${handle}`);

        // Adapt these keys if your widget response differs
        const data = res.data || {};
        setReviews({
          reviews: data.reviews || [],
          rating: data.rating || 0,
          reviewCount:
            data.review_count ??
            data.reviewCount ??
            (data.reviews ? data.reviews.length : 0),
        });
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [handle]);

    // Initialize selected variant when product loads
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const handleReviewSubmitted = (newReviewData) => {
    // Expecting newReviewData in same shape as `reviews` state
    setReviews(newReviewData);
  };

  const handleAddToCart = async () => {
    if (!product || !product.variants || !product.variants[0]?.id) {
      toast.error('Product variant not available');
      return;
    }

    const variant = product.variants[0];
    const variantId = variant.id;

    const price =
      variant?.priceV2?.amount != null
        ? Number(variant.priceV2.amount)
        : product?.price != null
        ? Number(product.price)
        : 0;

    const imageUrl =
      (product.images && product.images[0]) ||
      product.image ||
      null;

    try {
      setIsAdding(true);
      await addToCart(variantId, quantity, {
        title: product.title,
        imageUrl,
        price,
      });
    } catch (error) {
      console.error('Add to cart error in ProductDetail:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product || !product.variants || !product.variants[0]?.id) {
      toast.error('Product variant not available');
      return;
    }

    const variant = product.variants[0];
    const variantId = variant.id;

    try {
      // Use guest-checkout endpoint to create a one-off cart
      const res = await api.post('/cart/guest-checkout', {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      });

      const checkoutUrl = res.data?.checkoutUrl;
      if (!checkoutUrl) {
        throw new Error('No checkout URL returned');
      }

      // Redirect directly to Shopify checkout for this product only
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error in Buy Now:', error);
      toast.error('Error processing Buy Now');
    }
  };

  // Loading state
  if (loadingProduct || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-300">Loading product...</p>
        </div>
      </div>
    );
  }

  // Price calculations
  const firstVariant = product?.variants?.[0];

  const price =
    firstVariant?.priceV2?.amount != null
      ? Number(firstVariant.priceV2.amount)
      : product?.price != null
      ? Number(product.price)
      : 0;

  const compareAtRaw =
    firstVariant?.compareAtPrice?.amount ?? product?.compareAtPrice;

  const compareAtPrice =
    compareAtRaw != null && !Number.isNaN(Number(compareAtRaw))
      ? Number(compareAtRaw)
      : null;

  const discount =
    compareAtPrice && compareAtPrice > price
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
    <SeoProductSchema
        name={product.name}
        description={product.description || product.descriptionHtml}
        url={`https://fitgearzzz.com/products/${product.handle}`}
        images={product?.images || []}
        sku={product.sku || product.id}
        price={price}
        currency="INR"
        availability="https://schema.org/InStock"
        ratingValue={reviews.rating}
        reviewCount={reviews.reviewCount}
        brand="FitGearzzz"
      />
      <div className="max-w-7xl mx-auto">
        {/* Product layout */}
        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden aspect-square">
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold z-10">
                  -{discount}% OFF
                </div>
              )}
              <img
                src={
                  (product?.images || [])[selectedImageIndex] ||
                  product?.image ||
                  '/placeholder.png'
                }
                alt={product?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Grid */}
            {(product?.images || []).length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {(product?.images || []).slice(0, 4).map((img, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-orange-500 scale-105'
                        : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product?.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {index === 3 &&
                      (product?.images || []).length > 4 && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <span className="text-white text-lg sm:text-2xl font-bold">
                            +{(product?.images || []).length - 4}
                          </span>
                        </div>
                      )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-5 lg:space-y-6">
            {/* Brand and Stock */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-xs sm:text-sm font-semibold">
                Fitgearzzz
              </span>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-400/30 rounded-full text-xs sm:text-sm font-semibold">
                In Stock
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
              {product.title}
            </h1>

              {/* Share & Wishlist Actions */}
              <div className="flex items-center gap-3 my-3">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition ${
                    isInWishlist 
                      ? 'bg-red-500/20 border-red-500 text-red-500' 
                      : 'border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                  <span className="text-sm">{isInWishlist ? 'Saved' : 'Save'}</span>
                </button>
              </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600" />
              </div>
              <span className="text-xs sm:text-sm text-zinc-400">
                {reviews.rating.toFixed(1)} ({reviews.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  ₹{price.toFixed(2)}
                </span>
                {discount > 0 && compareAtPrice && (
                  <>
                    <span className="text-sm sm:text-lg text-zinc-500 line-through">
                      ₹{compareAtPrice.toFixed(2)}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded-md text-xs sm:text-sm font-semibold">
                      SAVE ₹{(compareAtPrice - price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">Free Shipping</span>
              </div>

                              {/* Urgency & Scarcity Indicators */}
              <div className="space-y-2 my-3">
                {/* Stock Scarcity */}
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-400">
                    Only <span className="font-bold">8 left</span> in stock - Order soon!
                  </span>
                </div>
                
                {/* Social Proof */}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-zinc-400">
                    <span className="font-semibold text-white">1,247</span> people purchased this
                  </span>
                </div>
                
                {/* Urgency Timer */}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium">
                    Sale ends in 4 hours 23 minutes
                  </span>
                </div>
              </div>
            </div>

          {/* Description */}
{product.description && (
  <div className="space-y-2 sm:space-y-3">
    <h2 className="text-base sm:text-lg font-bold text-white">
      Description
    </h2>
    <ProductDescriptionFormatter
      description={product.description}
      descriptionHtml={product.descriptionHtml}
    />
  </div>
)}

            {/* Quantity and Add to Cart / Buy Now */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1 text-zinc-300 text-sm sm:text-base">
                            {/* Product Variant Selector - Only show if product has multiple variants */}
              {product?.variants && product.variants.length > 1 && (
                <div className="mb-8">
                  <p className="text-sm font-semibold text-white mb-3">Select Option:</p>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all ${
                          selectedVariant?.id === variant.id
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'bg-transparent border-zinc-700 text-white hover:border-orange-500'
                        } ${
                          !variant.availableForSale ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!variant.availableForSale}
                      >
                        {variant.title}
                        {!variant.availableForSale && ' (Sold Out)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

                <span className="font-semibold">Quantity:</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center bg-zinc-900 rounded-lg w-full sm:w-auto justify-between">
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                    className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-orange-500 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-white font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-orange-500 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAdding}
                    className="w-full sm:flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-base uppercase tracking-wide rounded-lg py-4 sm:py-6 shadow-lg disabled:opacity-60"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {isAdding ? 'Adding…' : 'Add to Cart'}
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    className="w-full sm:flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold text-sm sm:text-base uppercase tracking-wide rounded-lg py-4 sm:py-6 shadow-lg disabled:opacity-60"
                  >
                    Buy Now
                  </Button>

              {/* Ask a Question Button */}
              <button
                onClick={() => toast.info('Question feature coming soon!')}
                className="w-full sm:w-auto px-6 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask a Question</span>
              </button>

                                    {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-xs font-semibold text-white">COD Available</p>
                      <p className="text-xs text-zinc-400">Pay on Delivery</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-xs font-semibold text-white">Easy Returns</p>
                      <p className="text-xs text-zinc-400">7 Days Return</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Star className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-xs font-semibold text-white">100% Original</p>
                      <p className="text-xs text-zinc-400">Verified Products</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pincode Delivery Estimator */}
              <div className="mt-8 p-4 bg-zinc-900 rounded-lg">
                <p className="text-sm font-semibold text-white mb-3">Check Delivery</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter Pincode"
                    maxLength="6"
                    className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                  <button 
                    onClick={() => {
                      if (pincode.length === 6) {
                        setDeliveryEstimate('3-5 business days');
                      }
                    }}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                    disabled={pincode.length !== 6}
                  >
                    Check
                  </button>
                </div>
                {deliveryEstimate && (
                  <p className="text-sm text-green-400 mt-3 flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Usually delivered in {deliveryEstimate}
                  </p>
                )}
              </div>
  </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 uppercase">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {loadingReviews ? (
                <div className="bg-zinc-900 rounded-2xl p-8 text-center">
                  <p className="text-zinc-400">Loading reviews...</p>
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
                <div className="bg-zinc-900 rounded-2xl p-8 text-center">
                  <p className="text-zinc-400 mb-4">
                    Please log in to write a review
                  </p>
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

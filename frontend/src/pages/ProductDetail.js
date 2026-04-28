import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Share2, Heart, AlertCircle, User, Users, Clock, MessageCircle } from 'lucide-react';
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

    // Parse product specifications dynamically from description
  const parseProductSpecs = () => {
    if (!product?.description) return {};
    
    const specs = {};
    const description = product.description;
    
    // Extract key-value pairs from description (e.g., "Product Name: XYZ", "Weight: 123g")
    const lines = description.split('\n');
    lines.forEach(line => {
      // Match patterns like "Key: Value"
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match && match[1] && match[2]) {
        const key = match[1].trim();
        const value = match[2].trim();
        // Skip if it's just a generic description line or too long
        if (key.length < 50 && !key.includes('.') && value.length > 0) {
          specs[key] = value;
        }
      }
    });
    
    return specs;
  };
  
  const productSpecs = parseProductSpecs();


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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">        {/* Product layout */}
        <motion.div
        className="flex flex-col lg:grid lg:grid-cols-[58%_42%] lg:gap-16 gap-10 py-8"          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Left: Images */}
          <div className="420
            ">
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

                          {/* Additional Info Below Images */}
              <div className="mt-8 space-y-4">
                {/* Trust Badges */}
                <div className="bg-zinc-900 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Why Buy From Us?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-full">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-zinc-300 text-sm">100% Authentic Products</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-full">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-zinc-300 text-sm">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-full">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-zinc-300 text-sm">Easy Returns & Refunds</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-zinc-900 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left text-sm text-zinc-300 hover:text-orange-500 transition-colors">
                      📋 Size Guide
                    </button>
                    <button className="w-full text-left text-sm text-zinc-300 hover:text-orange-500 transition-colors">
                      🚚 Shipping Policy
                    </button>
                    <button className="w-full text-left text-sm text-zinc-300 hover:text-orange-500 transition-colors">
                      🔄 Return & Exchange
                    </button>
                    <button className="w-full text-left text-sm text-zinc-300 hover:text-orange-500 transition-colors">
                      💬 Contact Support
                    </button>
                  </div>
                </div>

                {/* Share Product */}
                <div className="bg-zinc-900 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Share This Product</h3>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="bg-pink-600 hover:bg-pink-700 p-3 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

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

            {/* Product Specifications */}
            <div className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase">
                Product Specifications
              </h2>
              <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {product.metafields?.specifications ? (
                      Object.entries(JSON.parse(product.metafields.specifications)).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-zinc-800/50' : ''}>
                          <td className="px-6 py-4 font-semibold text-zinc-300 border-r border-zinc-700">{key}</td>
                          <td className="px-6 py-4 text-zinc-400">{value}</td>
                        </tr>
                      ))
                    ) }) : (
                      {Object.keys(productSpecs).length > 0 ? (
                      
                      {Object.entries(productSpecs).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-zinc-800/50' : ''}>
                          <td className="px-6 py-4 font-semibold text-zinc-300 border-r border-zinc-700">{key}</td>
                          <td className="px-6 py-4 text-zinc-400">{value}</td>
                        </tr>
                      }
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-6 py-4 text-center text-zinc-400">
                          No specifications available
                        </td>
                      </tr>
                    )}
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Features & Benefits */}
            <div className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase">
                Key Features & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 p-3 rounded-lg shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Adjustable Resistance</h3>
                      <p className="text-zinc-400">Easily adjust resistance from 10kg to 40kg to match your strength level and training goals.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 p-3 rounded-lg shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Digital Counter</h3>
                      <p className="text-zinc-400">Built-in electronic counter tracks your reps automatically, helping you monitor progress.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 p-3 rounded-lg shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Ergonomic Design</h3>
                      <p className="text-zinc-400">Non-slip handles provide comfortable grip during intense workouts, preventing hand fatigue.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 p-3 rounded-lg shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Recovery & Rehab</h3>
                      <p className="text-zinc-400">Perfect for physical therapy, injury recovery, and building hand strength for musicians and athletes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Returns Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Shipping Information</h3>
                </div>
                <div className="space-y-3 text-zinc-400">
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Free shipping on all orders across India</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Estimated delivery: 3-7 business days</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Track your order in real-time</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Secure packaging for safe delivery</span>
                  </p>
                </div>
              </div>
              <div className="bg-zinc-900 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Returns & Exchange</h3>
                </div>
                <div className="space-y-3 text-zinc-400">
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>7-day easy return & exchange policy</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Full refund if product is defective</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Free return pickup from your doorstep</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>100% original & authentic products</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose FitGearzzz */}
            <div className="mt-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl p-8 border border-orange-500/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase text-center">
                Why Choose FitGearzzz?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">100K+</div>
                  <div className="text-zinc-300 font-medium">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">4.8★</div>
                  <div className="text-zinc-300 font-medium">Average Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
                  <div className="text-zinc-300 font-medium">Customer Support</div>
                </div>
              </div>
            </div>


            {/* Quantity and Add to Cart / Buy Now */}
            <div className="space-y-3 sm:442
              ">
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
            <div className="423
                  ">                <div className="flex items-center bg-zinc-900 rounded-lg w-full sm:w-auto justify-between">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">                  <Button
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">                  <div className="flex flex-col items-center gap-2">
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

                            {/* You May Also Like - Related Products */}
            <div className="mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 uppercase text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Placeholder for related products - would fetch from API in production */}
                <div className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="aspect-square bg-zinc-800 relative">
                    <img src="/api/placeholder/300/300" alt="Related Product" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">20% OFF</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">Push Up Board</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 font-bold">₹799</span>
                      <span className="text-zinc-500 text-sm line-through">₹999</span>
                    </div>
                    <div className="flex items-center text-xs text-zinc-400">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-1">(156)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="aspect-square bg-zinc-800 relative">
                    <img src="/api/placeholder/300/300" alt="Related Product" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">BESTSELLER</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">Resistance Bands Set</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 font-bold">₹899</span>
                      <span className="text-zinc-500 text-sm line-through">₹1199</span>
                    </div>
                    <div className="flex items-center text-xs text-zinc-400">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-1">(342)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="aspect-square bg-zinc-800 relative">
                    <img src="/api/placeholder/300/300" alt="Related Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">Yoga Mat Premium</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 font-bold">₹649</span>
                      <span className="text-zinc-500 text-sm line-through">₹899</span>
                    </div>
                    <div className="flex items-center text-xs text-zinc-400">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-1">(89)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="aspect-square bg-zinc-800 relative">
                    <img src="/api/placeholder/300/300" alt="Related Product" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">NEW</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">Wrist Strengthener</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 font-bold">₹499</span>
                    </div>
                    <div className="flex items-center text-xs text-zinc-400">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-1">(203)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default ProductDetail;


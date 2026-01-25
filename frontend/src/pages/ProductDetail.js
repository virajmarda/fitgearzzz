import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star, Truck } from 'lucide-react';
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

  // While product is loading or missing, render a safe fallback
  if (loadingProduct || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-300">Loading product...</p>
        </div>
      </div>
    );
  }

  // Price calculations (Shopify-like shape, guarded)
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
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Product layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden aspect-square">
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
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
              <div className="grid grid-cols-4 gap-3">
                {(product?.images || []).slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
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
                          <span className="text-white text-2xl font-bold">
                            +{(product?.images || []).length - 4}
                          </span>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            {/* Brand and Stock */}
            <div className="flex items-center gap-3">
              <span className="px-4 py-1 bg-zinc-800 text-zinc-200 rounded-full text-sm font-semibold">
                Fitgearzzz
              </span>
              <span className="px-4 py-1 bg-green-900/30 text-green-400 border border-green-400/30 rounded-full text-sm font-semibold">
                In Stock
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="w-5 h-5 text-zinc-600" />
              </div>
              <span className="text-zinc-400">
                {reviews.rating.toFixed(1)} ({reviews.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-white">
                  ₹{price.toFixed(2)}
                </span>
                {discount > 0 && compareAtPrice && (
                  <>
                    <span className="text-2xl text-zinc-500 line-through">
                      ₹{compareAtPrice.toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold">
                      SAVE ₹{(compareAtPrice - price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <Truck className="w-5 h-5" />
                <span className="font-semibold">Free Shipping</span>
              </div>
            </div>

            {product.description && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">Description</h2>
                <div
                  className="shopify-rte text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.descriptionHtml || product.description,
                  }}
                />
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-zinc-300">
                <span className="font-semibold">Quantity:</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-zinc-900 rounded-lg">
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

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdding}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base uppercase tracking-wide rounded-lg py-6 shadow-lg disabled:opacity-60"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAdding ? 'Adding…' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 uppercase">
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

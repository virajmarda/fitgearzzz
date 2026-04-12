import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star, Truck } from 'lucide-react';
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

const formatMoney = (amount, currencyCode = 'INR') => {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return '₹0.00';
  }

  if (currencyCode === 'INR') {
    return `₹${numericAmount.toFixed(2)}`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
  }).format(numericAmount);
};

const getPriceAmount = (variant, product) => {
  const rawPrice =
    variant?.price?.amount ??
    variant?.priceV2?.amount ??
    product?.priceRange?.minVariantPrice?.amount ??
    product?.price ??
    0;

  const price = Number(rawPrice);
  return Number.isNaN(price) ? 0 : price;
};

const getCompareAtAmount = (variant, product) => {
  const rawCompareAt =
    variant?.compareAtPrice?.amount ??
    variant?.compareAtPriceV2?.amount ??
    product?.compareAtPriceRange?.maxVariantCompareAtPrice?.amount ??
    product?.compareAtPrice ??
    null;

  if (rawCompareAt == null) {
    return null;
  }

  const compareAt = Number(rawCompareAt);
  return Number.isNaN(compareAt) ? null : compareAt;
};

const getCurrencyCode = (variant, product) => {
  return (
    variant?.price?.currencyCode ??
    variant?.priceV2?.currencyCode ??
    product?.priceRange?.minVariantPrice?.currencyCode ??
    'INR'
  );
};

const getPrimaryVariant = (product) => {
  if (!product) return null;

  if (Array.isArray(product?.variants) && product.variants.length > 0) {
    return product.variants[0];
  }

  if (Array.isArray(product?.variants?.edges) && product.variants.edges.length > 0) {
    return product.variants.edges[0]?.node ?? null;
  }

  return null;
};

const ProductDetail = () => {
  const { handle } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviews, setReviews] = useState({
    reviews: [],
    rating: 0,
    reviewCount: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        const productData = await fetchProductByHandle(handle);
        setProduct(productData);
        setSelectedImageIndex(0);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Unable to load product');
      } finally {
        setLoadingProduct(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const res = await api.get(`/reviews/widget/${handle}`);
        const data = res.data || {};

        setReviews({
          reviews: data.reviews || [],
          rating: Number(data.rating || 0),
          reviewCount:
            data.review_count ??
            data.reviewCount ??
            (Array.isArray(data.reviews) ? data.reviews.length : 0),
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

  const selectedVariant = useMemo(() => getPrimaryVariant(product), [product]);

  const pricing = useMemo(() => {
    const price = getPriceAmount(selectedVariant, product);
    const compareAtPrice = getCompareAtAmount(selectedVariant, product);
    const currencyCode = getCurrencyCode(selectedVariant, product);

    const discount =
      compareAtPrice && compareAtPrice > price
        ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
        : 0;

    const savings =
      compareAtPrice && compareAtPrice > price
        ? compareAtPrice - price
        : 0;

    return {
      price,
      compareAtPrice,
      currencyCode,
      discount,
      savings,
      isDiscounted: discount > 0,
    };
  }, [product, selectedVariant]);

  const handleReviewSubmitted = (newReviewData) => {
    setReviews(newReviewData);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      toast.error('Product variant not available');
      return;
    }

    const imageUrl =
      (product?.images && product.images[0]) ||
      product?.image ||
      null;

    try {
      setIsAdding(true);

      await addToCart(selectedVariant.id, quantity, {
        title: product?.title,
        imageUrl,
        price: pricing.price,
        compareAtPrice: pricing.compareAtPrice,
        currencyCode: pricing.currencyCode,
      });

      toast.success('Added to cart');
    } catch (error) {
      console.error('Add to cart error in ProductDetail:', error);
      toast.error('Failed to add product to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant?.id) {
      toast.error('Product variant not available');
      return;
    }

    try {
      const res = await api.post('/cart/guest-checkout', {
        lines: [
          {
            merchandiseId: selectedVariant.id,
            quantity,
          },
        ],
      });

      const checkoutUrl = res.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error('No checkout URL returned');
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error in Buy Now:', error);
      toast.error('Error processing Buy Now');
    }
  };

  if (loadingProduct || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-300">Loading product...</p>
        </div>
      </div>
    );
  }

  const productImages = product?.images || [];
  const mainImage =
    productImages[selectedImageIndex] ||
    product?.image ||
    '/placeholder.png';

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <SeoProductSchema
        name={product?.title}
        description={product?.description || product?.descriptionHtml}
        url={`https://fitgearzzz.com/products/${product?.handle}`}
        images={productImages}
        sku={selectedVariant?.sku || product?.sku || product?.id}
        price={pricing.price}
        currency={pricing.currencyCode}
        availability="https://schema.org/InStock"
        ratingValue={reviews.rating}
        reviewCount={reviews.reviewCount}
        brand="FitGearzzz"
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-4">
            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden aspect-square">
              {pricing.isDiscounted && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold z-10">
                  -{pricing.discount}% OFF
                </div>
              )}

              <img
                src={mainImage}
                alt={product?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {productImages.slice(0, 4).map((img, index) => (
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

                    {index === 3 && productImages.length > 4 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white text-lg sm:text-2xl font-bold">
                          +{productImages.length - 4}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5 lg:space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full text-xs sm:text-sm font-semibold">
                Fitgearzzz
              </span>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-400/30 rounded-full text-xs sm:text-sm font-semibold">
                In Stock
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
              {product?.title}
            </h1>

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

            <div className="space-y-2">
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {formatMoney(pricing.price, pricing.currencyCode)}
                </span>

                {pricing.isDiscounted && pricing.compareAtPrice && (
                  <>
                    <span className="text-sm sm:text-lg text-zinc-500 line-through">
                      {formatMoney(pricing.compareAtPrice, pricing.currencyCode)}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded-md text-xs sm:text-sm font-semibold">
                      SAVE {formatMoney(pricing.savings, pricing.currencyCode)}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">Free Shipping</span>
              </div>

              {!pricing.isDiscounted && (
                <p className="text-xs sm:text-sm text-zinc-500">
                  Discount codes and automatic checkout offers may appear only at checkout unless
                  this product has a compare-at price configured in Shopify.
                </p>
              )}
            </div>

            {product?.description && (
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

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1 text-zinc-300 text-sm sm:text-base">
                <span className="font-semibold">Quantity:</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center bg-zinc-900 rounded-lg w-full sm:w-auto justify-between">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
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
                    disabled={product?.stock === 0 || isAdding}
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
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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

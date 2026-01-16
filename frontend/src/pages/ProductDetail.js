import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import { toast } from 'sonner';
import api from '../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
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
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoadingProduct(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const res = await api.get(`/reviews/product/${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

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

    const variantId = product.variants[0].id; // or selected variant id

    try {
      setIsAdding(true);
      await addToCart(variantId, quantity);
      // Optional: open cart drawer here via global state if you want
    } catch (error) {
      console.error('Add to cart error in ProductDetail:', error);
      // addToCart already shows toast
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

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Product layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Left: Image */}
          <div className="glass-card rounded-3xl overflow-hidden">
            <img
              src={product.image || product.featuredImage?.url || '/placeholder.png'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            <h1 className="font-oswald text-3xl sm:text-4xl font-bold text-white">
              {product.title}
            </h1>

            <p className="text-zinc-400">{product.description}</p>

            <p className="text-3xl font-oswald font-bold text-orange-500">
              ${parseFloat(product.price || product.variants?.[0]?.priceV2?.amount || 0).toFixed(2)}
            </p>

            <div className="flex items-center space-x-4 mt-4">
              {/* Quantity controls */}
              <div className="flex items-center bg-zinc-900 rounded-full px-3 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-white font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to cart button */}
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-full py-7 shadow-lg hover:shadow-orange-500/30 disabled:opacity-60"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? 'Adding…' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="font-oswald text-3xl font-bold text-white mb-8 uppercase">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Reviews Display */}
            <div>
              {loadingReviews ? (
                <div className="glass-card rounded-3xl p-8 text-center">
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

            {/* Right: Write Review Form */}
            <div>
              {user ? (
                <ReviewForm
                  product={product}
                  user={user}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              ) : (
                <div className="glass-card rounded-3xl p-8 text-center">
                  <p className="text-zinc-400 mb-4">Please log in to write a review</p>
                  <Button
                    onClick={() => setShowAuth(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full"
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

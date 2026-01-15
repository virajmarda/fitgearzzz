import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import AuthModal from '../components/AuthModal';
import { fetchProductByHandle } from '../services/shopifyService';
import { fetchProductReviews, initializeJudgeWidget } from '../services/judgeService';
import '../styles/judgeme-custom.css';

const ProductDetail = () => {
  const { handle } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [reviews, setReviews] = useState({ reviews: [], rating: 0, reviewCount: 0 });

  const fetchProduct = async () => {
    try {
      const productData = await fetchProductByHandle(handle);
      setProduct(productData);
      
      // Fetch Judge.me reviews
      if (productData.id) {
        const reviewData = await fetchProductReviews(productData.id);
        setReviews(reviewData);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [handle]);

  // Initialize Judge.me widget after product loads
  useEffect(() => {
    if (product) {
      // Extract numeric ID from Shopify GID
      const numericId = product.id.includes('gid://') 
        ? product.id.split('/').pop()
        : product.id;
      
      initializeJudgeWidget(numericId, handle);
    }
  }, [product, handle]);

  const handleAddToCart = () => {
    const variantId = product.variants?.[0]?.id;
    if (!variantId) {
      toast.error('Product variant not available');
      return;
    }
    addToCart(variantId, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-zinc-400">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Product Images - Keep your existing code */}
          <div>
            <div className="glass-card rounded-3xl overflow-hidden mb-4 shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-2xl overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-orange-500' : 'border-zinc-700'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
              {product.name}
            </h1>

            {/* Judge.me Rating Display */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(reviews.rating) 
                        ? 'text-orange-500 fill-orange-500' 
                        : 'text-zinc-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-zinc-300">
                {reviews.rating > 0 ? reviews.rating.toFixed(1) : 'No reviews yet'} 
                {reviews.reviewCount > 0 && ` (${reviews.reviewCount} reviews)`}
              </span>
            </div>

            <div className="text-5xl font-oswald font-bold text-orange-500 mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-zinc-300 font-manrope mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Stock & Category - Keep your existing code */}
            <div className="glass-card rounded-3xl p-6 mb-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-400">Category:</span>
                  <p className="text-white font-semibold">{product.category}</p>
                </div>
                <div>
                  <span className="text-zinc-400">Stock:</span>
                  <p className={`font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart - Keep your existing code */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 glass-card rounded-full px-6 py-3 shadow-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-full py-7 shadow-lg hover:shadow-orange-500/30"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ✅ NEW: Judge.me Reviews Section */}
        <div className="grid grid-cols-1 gap-12 mt-16">
          <div>
            <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase">
              Customer Reviews
            </h2>
            
            {/* Judge.me Review Widget - Displays reviews */}
            <div 
              className="jdgm-widget jdgm-review-widget glass-card rounded-3xl p-6"
              data-id={product.id.split('/').pop()}
            ></div>
            
            {/* Judge.me Review Form - For submitting new reviews */}
            <div className="mt-8">
              <h3 className="font-oswald text-2xl font-bold text-white mb-4">Write a Review</h3>
              <div 
                className="jdgm-widget jdgm-write-review-tab glass-card rounded-3xl p-6"
                data-id={product.id.split('/').pop()}
              >
                {!user && (
                  <div className="text-center py-8">
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
      </div>
      
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default ProductDetail;


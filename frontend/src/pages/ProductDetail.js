import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import api from '../utils/api';
import AuthModal from '../components/AuthModal';
import { fetchProductByHandle } from '../services/shopifyService';

const ProductDetail = () => {
  const { handle } = useParams();  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchProduct();
  }, [handle]);
  
    const fetchProduct = async () => {
    try {
      const productData = await fetchProductByHandle(handle);
            setProduct(productData);
 } catch (error) {
      console.error('Error fetching product:', error);
    }
      
      
      setLoading(false);
    }  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
      return;
    }

    try {
      await api.post(`/products/${product.id}/reviews`, reviewData);
      toast.success('Review submitted!');
      setReviewData({ rating: 5, comment: '' });
      fetchProduct();
    } catch (error) {
      toast.error('Failed to submit review');
    }
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
          <div>
            <div className="glass-card rounded-3xl overflow-hidden mb-4 shadow-lg" data-testid="product-main-image">
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
                    data-testid={`product-thumbnail-${index}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight" data-testid="product-detail-name">
              {product.name}
            </h1>
            <p className="text-lg text-zinc-400 mb-4" data-testid="product-detail-brand">{product.brand}</p>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex" data-testid="product-detail-rating">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-orange-500 fill-orange-500' : 'text-zinc-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-zinc-300">
                {product.rating.toFixed(1)} ({product.review_count} reviews)
              </span>
            </div>

            <div className="text-5xl font-oswald font-bold text-orange-500 mb-6" data-testid="product-detail-price">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-zinc-300 font-manrope mb-8 leading-relaxed" data-testid="product-detail-description">
              {product.description}
            </p>

            <div className="glass-card rounded-3xl p-6 mb-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-400">Category:</span>
                  <p className="text-white font-semibold" data-testid="product-detail-category">{product.category}</p>
                </div>
                <div>
                  <span className="text-zinc-400">Stock:</span>
                  <p className={`font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`} data-testid="product-detail-stock">
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 glass-card rounded-full px-6 py-3 shadow-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                  data-testid="decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-bold w-12 text-center" data-testid="quantity-display">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-orange-500 transition-colors"
                  data-testid="increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-full py-7 shadow-lg hover:shadow-orange-500/30"
                data-testid="add-to-cart-detail-button"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

                              {product.shopifyUrl && (
                                              <a
                                                href={product.shopifyUrl}
                                                                  target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                                      className="block mt-3"
                                                                                                                      >
                                                                                                                        <Button
                                                                                                                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-oswald text-lg uppercase tracking-wider rounded-none"
                                                                                                                                              data-testid="buy-now-shopify-button"
                                                                                                                                                                >
                                                                                                                                                                  Buy Now
                                                                                                                                                                </Button>
                                                                                                                                                              </a>
                                                                                                                                                            )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase" data-testid="reviews-section-title">
              Customer Reviews
            </h2>
            {product.reviews.length === 0 ? (
              <p className="text-zinc-400" data-testid="no-reviews-message">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="glass-card rounded-2xl p-6 shadow-md" data-testid={`review-${index}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-manrope font-semibold text-white">{review.user_name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-zinc-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-300 font-manrope">{review.comment}</p>
                    <p className="text-xs text-zinc-500 mt-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase">Write a Review</h2>
            <form onSubmit={handleSubmitReview} className="glass-card rounded-3xl p-6 space-y-4 shadow-lg" data-testid="review-form">
              <div>
                <label className="text-zinc-300 mb-2 block">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      data-testid={`rating-star-${star}`}
                    >
                      <Star
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                          star <= reviewData.rating ? 'text-orange-500 fill-orange-500' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-zinc-300 mb-2 block">Comment</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  rows={4}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-2xl px-4 py-2 focus:border-orange-500 focus:outline-none"
                  required
                  data-testid="review-comment-input"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full py-3"
                data-testid="submit-review-button"
              >
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};


export default ProductDetail;

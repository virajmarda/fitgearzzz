import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Share2, Heart, AlertCircle, User, Clock, Check, X, ChevronLeft, ChevronRight, ZoomIn, Package, Shield, RefreshCw, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import api from '../utils/api';
import { fetchProductByHandle } from '../services/shopifyService';
import SeoProductSchema from '../components/SeoProductSchema';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import { formatPrice } from '../utils/formatPrice';
import { trackAddToCart, trackViewContent } from '../utils/analytics';

const ProductDetail = () => {
  const { handle } = useParams();
  const { user } = useAuth();
    const { addToCart, getCheckoutUrl } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const imageRef = useRef(null);

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByHandle(handle);
        if (data && data.product) {
          setProduct(data.product);
          setSelectedVariant(data.product.variants?.[0] || null);
          // Simulate related products (in production, fetch from API)
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  // Sticky add to cart on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsPinned(true);
      } else {
        setIsPinned(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }
    addToCart(selectedVariant.id, quantity);
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
          trackAddToCart({ productId: product?.id, productName: product?.title, variantId: selectedVariant.id, price: parseFloat(selectedVariant.price) || 0, quantity });
    handleAddToCart();
    const checkoutUrl = getCheckoutUrl(); if (checkoutUrl) window.location.href = checkoutUrl;
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.title} on FitGearzzz`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      copy: null
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
      setShowShareMenu(false);
    } else {
      window.open(shareUrls[platform], '_blank');
      setShowShareMenu(false);
    }
  };

  const handleImageZoom = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

    const averageRating = product?.averageRating || null; // Populated from reviews API
  const totalReviews = product?.reviewCount || null; // In production, fetch from API
  const inStock = selectedVariant?.inventory_quantity > 0;
  const discount = selectedVariant?.compare_at_price ? 
    Math.round(((selectedVariant.compare_at_price - selectedVariant.price) / selectedVariant.compare_at_price) * 100) : 0;

  return (
    <>
      <SeoProductSchema product={product} />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-orange-500">Home</a>
            <ChevronRight size={16} className="text-gray-400" />
            <a href="/products" className="text-gray-600 hover:text-orange-500">Products</a>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Sticky Add to Cart Bar (Mobile) */}
      <AnimatePresence>
        {isPinned && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40 md:hidden"
          >
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={product.images?.[0]?.src} alt={product.title} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-semibold text-sm truncate max-w-[150px]">{product.title}</p>
                              <p className="text-orange-500 font-bold">₹{selectedVariant?.price}</p>
              </div>
              <Button onClick={handleAddToCart} className="bg-orange-500 hover:bg-orange-600">
                <ShoppingCart size={18} className="mr-1" />
                Add
              </Button>
            </div>
                                  </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden border-2 border-gray-100">
              {discount > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discount}% OFF
                  </span>
                </div>
              )}
              <div 
                className="relative aspect-square cursor-zoom-in"
                ref={imageRef}
                onMouseEnter={() => setShowImageZoom(true)}
                onMouseLeave={() => setShowImageZoom(false)}
                onMouseMove={handleImageZoom}
              >
                <img
                  src={product.images?.[selectedImage]?.src || '/placeholder.png'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  style={showImageZoom ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: 'scale(1.5)'
                  } : {}}
                />
              </div>
              <button 
                className="absolute top-4 right-4 z-10"
                onClick={handleWishlist}
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Heart 
                    size={28} 
                    className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'} bg-white rounded-full p-1 shadow-md`}
                  />
                </motion.div>
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img.src} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg">
                <Shield size={24} className="text-green-600 mb-1" />
                <p className="text-xs font-semibold text-green-900">Secure Payment</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                <Truck size={24} className="text-blue-600 mb-1" />
                <p className="text-xs font-semibold text-blue-900">Fast Shipping</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg">
                <RefreshCw size={24} className="text-purple-600 mb-1" />
                <p className="text-xs font-semibold text-purple-900">Easy Returns</p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold">{averageRating}</span>
                </div>
                <span className="text-sm text-gray-600">({totalReviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
                {inStock && selectedVariant?.inventory_quantity < 10 && (
                  <span className="text-sm text-orange-600">Only {selectedVariant.inventory_quantity} left!</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-baseline space-x-3">
                              <span className="text-4xl font-bold text-gray-900">₹{selectedVariant?.price}</span>
                {selectedVariant?.compare_at_price && (
                                <span className="text-2xl text-gray-500 line-through">₹{selectedVariant.compare_at_price}</span>
                )}
                {discount > 0 && (
                <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-bold">{Math.round(((selectedVariant.compare_at_price - selectedVariant.price) / selectedVariant.compare_at_price) * 100)}% OFF</span>                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Variant Selector */}
            {product.variants?.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Variant: <span className="text-orange-500">{selectedVariant?.title}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.inventory_quantity === 0}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                        selectedVariant?.id === variant.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : variant.inventory_quantity === 0
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 hover:border-orange-300 text-gray-700'
                      }`}
                    >
                      {variant.title}
                      {variant.inventory_quantity === 0 && <span className="ml-1 text-xs">(Sold Out)</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-orange-500 flex items-center justify-center font-bold text-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg font-semibold"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-orange-500 flex items-center justify-center font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="w-full py-6 text-lg font-bold bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={22} className="mr-2" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Buy Now - Fast Checkout
              </Button>
              <div className="flex space-x-2">
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="flex-1 py-3 border-2 hover:border-red-500 hover:text-red-500"
                >
                  <Heart size={18} className={`mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </Button>
                <div className="relative">
                  <Button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    variant="outline"
                    className="py-3 px-6 border-2 hover:border-blue-500 hover:text-blue-500"
                  >
                    <Share2 size={18} className="mr-2" />
                    Share
                  </Button>
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-20">
                      <button onClick={() => handleShare('facebook')} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-t-lg">Facebook</button>
                      <button onClick={() => handleShare('twitter')} className="w-full px-4 py-2 text-left hover:bg-gray-100">Twitter</button>
                      <button onClick={() => handleShare('whatsapp')} className="w-full px-4 py-2 text-left hover:bg-gray-100">WhatsApp</button>
                      <button onClick={() => handleShare('pinterest')} className="w-full px-4 py-2 text-left hover:bg-gray-100">Pinterest</button>
                      <button onClick={() => handleShare('copy')} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-b-lg">Copy Link</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <Truck className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders above $50. Delivery in 3-5 business days.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RefreshCw className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy. No questions asked.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Secure Checkout</p>
                  <p className="text-sm text-gray-600">Your payment information is encrypted and secure.</p>
                </div>
              </div>
            </div>

            {/* Offers */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg p-4">
              <h3 className="font-bold text-orange-900 mb-2">🎉 Special Offers</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Use code <span className="font-mono bg-white px-2 py-1 rounded font-bold">FIRST10</span> for 10% off your first order</li>
                <li>• Buy 2, Get 15% off on entire order</li>
                <li>• Free gift on orders above $100</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                  {tab === 'reviews' && <span className="ml-2 text-xs">({totalReviews})</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: product.body_html || product.description || '<p>No description available.</p>'
                  }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Product Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">Brand</dt>
                      <dd className="font-semibold text-gray-900">{product.vendor || 'FitGearzzz'}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">Product Type</dt>
                      <dd className="font-semibold text-gray-900">{product.product_type || 'Fitness Equipment'}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">SKU</dt>
                      <dd className="font-semibold text-gray-900 font-mono text-sm">{selectedVariant?.sku || 'N/A'}</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-gray-600">Weight</dt>
                      <dd className="font-semibold text-gray-900">{selectedVariant?.weight ? `${selectedVariant.weight} ${selectedVariant.weight_unit}` : 'N/A'}</dd>
                    </div>
                  </dl>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Premium quality materials</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Ergonomic design for comfort</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Durable and long-lasting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700">Easy to clean and maintain</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <ReviewsList productId={product.id} />
                {user && <ReviewForm productId={product.id} />}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Standard Shipping</h4>
                      <p className="text-gray-600 text-sm">3-5 business days - Free on orders above $50</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Express Shipping</h4>
                      <p className="text-gray-600 text-sm">1-2 business days - $15.99</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">International</h4>
                      <p className="text-gray-600 text-sm">7-14 business days - Rates vary by location</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Return Policy</h3>
                  <p className="text-gray-700 mb-4">We offer a 30-day return policy for all products. Items must be unused and in original packaging.</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Free returns within 30 days</li>
                    <li>• Original packaging required</li>
                    <li>• Refund processed within 5-7 business days</li>
                    <li>• Contact support@fitgearzzz.com for returns</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProd) => (
                <div key={relProd.id} className="group cursor-pointer" onClick={() => navigate(`/product/${relProd.handle}`)}>
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gray-100">
                    <img
                      src={relProd.images?.[0]?.src}
                      alt={relProd.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-orange-500">{relProd.title}</h3>
                  <p className="text-orange-600 font-bold">${relProd.variants?.[0]?.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;

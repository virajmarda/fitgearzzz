import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Loader2, ShoppingBag, Lock, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
   const location = useLocation();
  const { user } = useAuth();
  const { cart, isLoading } = useCart();
  const [redirecting, setRedirecting] = useState(false);
   const [directProduct, setDirectProduct] = useState(null);
 const [isDirectCheckout, setIsDirectCheckout] = useState(false);

  // Get cart items safely
  const cartItems = cart?.lines?.edges || [];
  const hasItems = cartItems.length > 0;

  useEffect(() => {
    // Wait for cart to load
    if (isLoading) return;

    // Check if cart exists and has items
    if (!cart || !cart.id || !hasItems) {
      toast.error('Your cart is empty');
      navigate('/products');
      return;
    }
  }, [cart, hasItems, navigate, isLoading]);

   // Handle direct checkout from Buy Now
 useEffect(() => {
   if (location?.state?.directCheckout && location?.state?.product) {
     setDirectProduct(location.state.product);
     setIsDirectCheckout(true);
   }
 }, [location]);


  const handleProceedToCheckout = () => {
    if (!cart || !cart.checkoutUrl) {
      toast.error('Unable to proceed to checkout. Please try again.');
      return;
    }

    setRedirecting(true);
    
    // Redirect to Shopify checkout
    setTimeout(() => {
      window.location.href = cart.checkoutUrl;
    }, 800);
  };

  const calculateTotal = () => {
    if (!cart || !cart.cost) return 0;
    return parseFloat(cart.cost.totalAmount.amount);
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.cost) return 0;
    return parseFloat(cart.cost.subtotalAmount?.amount || cart.cost.totalAmount.amount);
  };

  // Show loading state while cart loads
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-24">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Show redirecting state
  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <h2 className="font-oswald text-2xl text-white mb-2">
            Redirecting to Secure Checkout...
          </h2>
          <p className="text-zinc-400">
            Please wait while we prepare your order
          </p>
        </motion.div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight uppercase">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Order Summary */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-6 shadow-lg mb-6">
                <h2 className="font-oswald text-2xl font-bold text-white mb-6 uppercase flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-2 text-orange-500" />
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {cartItems.map(({ node: item }) => {
                    const product = item.merchandise.product;
                    const variant = item.merchandise;
                    
                    return (
                      <div key={item.id} className="flex space-x-4 p-4 bg-zinc-800/50 rounded-2xl">
                        <img
                          src={product.featuredImage?.url || '/placeholder.png'}
                          alt={product.title}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">
                            {product.title}
                          </h3>
                          {variant.title !== 'Default Title' && (
                            <p className="text-zinc-400 text-sm">{variant.title}</p>
                          )}
                          <p className="text-zinc-400 text-sm mt-1">
                            ${parseFloat(variant.priceV2.amount).toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-orange-500 font-bold text-lg">
                            ${(parseFloat(variant.priceV2.amount) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Info */}
              <div className="glass-card rounded-3xl p-6 shadow-lg">
                <h2 className="font-oswald text-xl font-bold text-white mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-green-500" />
                  Secure Checkout
                </h2>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Secure Payment Processing</p>
                      <p className="text-sm text-zinc-400">256-bit SSL encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Multiple Payment Methods</p>
                      <p className="text-sm text-zinc-400">Credit card, PayPal, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Fast & Free Shipping</p>
                      <p className="text-sm text-zinc-400">On orders over $100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Checkout Summary */}
            <div>
              <div className="glass-card rounded-3xl p-6 sticky top-24 shadow-xl">
                <h2 className="font-oswald text-2xl font-bold text-white mb-6 uppercase">
                  Payment Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}):</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-zinc-300">
                    <span>Shipping:</span>
                    <span className="text-green-500 font-semibold">
                      {subtotal >= 100 ? 'FREE' : 'Calculated at checkout'}
                    </span>
                  </div>

                  <div className="border-t border-zinc-700 pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span className="font-oswald text-white">Total:</span>
                      <span className="text-orange-500">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleProceedToCheckout}
                  disabled={redirecting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-full py-7 shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                  {redirecting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate('/cart')}
                    className="text-zinc-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    ← Back to Cart
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-zinc-700">
                  <p className="text-xs text-zinc-500 text-center mb-3">
                    We accept
                  </p>
                  <div className="flex justify-center items-center space-x-3 opacity-60">
                    <div className="text-white text-xs font-semibold px-3 py-1 bg-zinc-700 rounded">VISA</div>
                    <div className="text-white text-xs font-semibold px-3 py-1 bg-zinc-700 rounded">MASTERCARD</div>
                    <div className="text-white text-xs font-semibold px-3 py-1 bg-zinc-700 rounded">AMEX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;

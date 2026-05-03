import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const COUPON_CODES = {
  'WELCOME10': { discount: 10, type: 'percentage', minOrder: 0 },
  'SAVE20': { discount: 20, type: 'percentage', minOrder: 1000 },
  'FLAT100': { discount: 100, type: 'fixed', minOrder: 500 },
};

const CartDrawer = ({ open, onClose }) => {
  const { user } = useAuth();
  const {
    cart,
    isLoading,
    updateCartItem,
    removeFromCart,
    getCartTotal,
    getCartCount,
    getCheckoutUrl,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  const subtotal = getCartTotal();
  const count = getCartCount();
  const cartItems = cart?.lines?.edges || [];

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    const coupon = COUPON_CODES[code];
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order of ₹${coupon.minOrder} required`);
      return;
    }
    setAppliedCoupon({ code, ...coupon });
    setCouponError('');
    toast.success(`Coupon "${code}" applied! You saved ₹${calculateDiscount(coupon)}`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  const calculateDiscount = (coupon) => {
    if (!coupon) return 0;
    if (coupon.type === 'percentage') {
      return Math.floor(subtotal * (coupon.discount / 100));
    }
    return coupon.discount;
  };

  const discount = calculateDiscount(appliedCoupon);
  const total = subtotal - discount;
  const freeShippingThreshold = 499;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = async () => {
    if (!cartItems.length) {
      toast.error('Your cart is empty');
      return;
    }
    try {
      setIsCheckingOut(true);
      const checkoutUrl = getCheckoutUrl() || cart?.checkoutUrl;
      if (!checkoutUrl) {
        throw new Error('No checkout URL available');
      }
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to proceed to checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h2 className="font-oswald text-xl font-bold text-white">Cart ({count})</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest login prompt */}
        {!user && cartItems.length > 0 && (
          <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800">
            <p className="text-zinc-400 text-sm">
              <button
                onClick={() => { window.location.href = 'https://account.fitgearzzz.com'; }}
                className="text-orange-500 hover:text-orange-400 underline font-semibold"
              >
                Log in
              </button>
              {' '}to save your cart and checkout faster!
            </p>
          </div>
        )}

        {/* Free shipping banner */}
        {cartItems.length > 0 && amountToFreeShipping > 0 && (
          <div className="px-4 py-2 bg-orange-500/10 border-b border-orange-500/20 text-center">
            <p className="text-orange-400 text-sm">
              🎉 Add <span className="font-bold">₹{amountToFreeShipping}</span> more for FREE shipping!
            </p>
          </div>
        )}
        {cartItems.length > 0 && amountToFreeShipping === 0 && (
          <div className="px-4 py-2 bg-green-500/10 border-b border-green-500/20 text-center">
            <p className="text-green-400 text-sm">✅ You've unlocked FREE shipping!</p>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400 font-medium">Your cart is empty</p>
              <p className="text-zinc-600 text-sm mt-1">Add some items to get started</p>
              <button
                onClick={onClose}
                className="mt-4 text-orange-500 hover:text-orange-400 text-sm underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(({ node: item }) => {
              const merchandise = item.merchandise || {};
              const product = merchandise.product || {};
              const imageUrl = product.featuredImage?.url || '/placeholder.png';
              const title = product.title || merchandise.title || 'Product';
              const priceAmount = merchandise.priceV2?.amount ?? merchandise.price?.amount ?? merchandise.price ?? 0;
              const lineId = item.id;
              const quantity = item.quantity ?? 1;
              return (
                <div key={lineId} className="flex gap-3 bg-zinc-900 rounded-xl p-3">
                  <img src={imageUrl} alt={title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium truncate">{title}</h3>
                    {merchandise.title && merchandise.title !== 'Default Title' && (
                      <p className="text-zinc-500 text-xs mt-0.5">{merchandise.title}</p>
                    )}
                    <p className="text-orange-400 text-sm font-semibold mt-1">₹{Number(priceAmount).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => removeFromCart(lineId)}
                        className="text-red-500 hover:text-red-400 transition-colors p-1"
                        data-testid="remove-item-button"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateCartItem(lineId, Math.max(1, quantity - 1))}
                        className="w-6 h-6 flex items-center justify-center hover:bg-zinc-700 text-white rounded-full transition-colors"
                        data-testid="decrease-quantity-button"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => updateCartItem(lineId, quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-zinc-700 text-white rounded-full transition-colors"
                        data-testid="increase-quantity-button"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with coupon and checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-zinc-800 p-4 space-y-3">

            {/* Coupon section */}
            <div>
              <p className="text-zinc-400 text-xs mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Have a coupon code?
              </p>
              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                      placeholder="Enter code"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg px-10 py-2.5 focus:outline-none focus:border-orange-500 uppercase"
                    />
                  </div>
                  <Button onClick={applyCoupon} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">Apply</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                  <span className="text-green-400 text-sm font-semibold">{appliedCoupon.code} &nbsp;<span className="text-green-300 font-normal">(-₹{discount})</span></span>
                  <button onClick={removeCoupon} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                </div>
              )}
              {couponError && <p className="text-red-400 text-xs mt-1">{couponError}</p>}
            </div>

            {/* Order summary */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span className="text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Discount:</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Shipping:</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-white border-t border-zinc-800 pt-1 mt-1">
                <span>Total:</span>
                <span className="text-orange-400">₹{total.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <p className="text-green-400 text-xs text-center">You saved ₹{discount.toFixed(2)}!</p>
              )}
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
              data-testid="checkout-button"
            >
              {isCheckingOut ? 'Redirecting…' : 'Proceed to Checkout'}
            </Button>
            <p className="text-zinc-600 text-xs text-center">🔒 Secure checkout powered by Shopify</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

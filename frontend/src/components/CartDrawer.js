import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const CartDrawer = ({ open, onClose }) => {import React, { useEffect, useState } from 'react';
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-zinc-900 z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h2 className="font-oswald text-xl font-bold text-white uppercase tracking-wide">
              Cart ({count})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest login prompt */}
        {!user && cartItems.length > 0 && (
          <div className="mx-6 mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
            <p className="text-sm text-orange-300">
              <button
                onClick={() => { window.location.href = 'https://account.fitgearzzz.com'; }}
                className="text-orange-500 hover:text-orange-400 underline font-semibold"
              >
                Log in
              </button>{' '}
              to save your cart and checkout faster!
            </p>
          </div>
        )}

        {/* Free shipping banner */}
        {cartItems.length > 0 && amountToFreeShipping > 0 && (
          <div className="mx-6 mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
            <p className="text-sm text-green-300">
              🎉 Add <span className="font-bold text-green-400">₹{amountToFreeShipping}</span> more for FREE shipping!
            </p>
            <div className="mt-2 w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}
        {cartItems.length > 0 && amountToFreeShipping === 0 && (
          <div className="mx-6 mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
            <p className="text-sm text-green-300 font-semibold">
              ✅ You've unlocked FREE shipping!
            </p>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent" />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-zinc-700 mb-4" />
              <p className="text-zinc-400 text-lg mb-2">Your cart is empty</p>
              <p className="text-zinc-500 text-sm mb-6">Add some items to get started</p>
              <Button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(({ node: item }) => {
                const merchandise = item.merchandise || {};
                const product = merchandise.product || {};
                const imageUrl = product.featuredImage?.url || '/placeholder.png';
                const title = product.title || merchandise.title || 'Product';
                const priceAmount = merchandise.priceV2?.amount ?? merchandise.price?.amount ?? merchandise.price ?? 0;
                const lineId = item.id;
                const quantity = item.quantity ?? 1;

                return (
                  <div
                    key={lineId}
                    className="flex gap-4 bg-zinc-800/50 border border-zinc-800 rounded-xl p-3 hover:border-zinc-700 transition-colors"
                  >
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-20 h-20 object-cover rounded-lg bg-zinc-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">{title}</h3>
                      {merchandise.title && merchandise.title !== 'Default Title' && (
                        <p className="text-zinc-500 text-xs mb-2">{merchandise.title}</p>
                      )}
                      <p className="text-orange-500 font-bold text-base">₹{Number(priceAmount).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(lineId)}
                        className="text-red-500 hover:text-red-400 transition-colors p-1"
                        data-testid="remove-item-button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-zinc-900 rounded-full p-1">
                        <button
                          onClick={() => updateCartItem(lineId, Math.max(1, quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center hover:bg-zinc-700 text-white rounded-full transition-colors"
                          data-testid="decrease-quantity-button"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-semibold text-sm w-6 text-center">{quantity}</span>
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
              })}
            </div>
          )}
        </div>

        {/* Footer with coupon and checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-zinc-800 p-6 space-y-4 bg-zinc-900/80 backdrop-blur">
            {/* Coupon section */}
            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wide block mb-2">
                Have a coupon code?
              </label>
              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                      placeholder="Enter code"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg px-10 py-2.5 focus:outline-none focus:border-orange-500 uppercase"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    disabled={!couponCode.trim()}
                    className="px-5 py-2.5 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-semibold text-sm">{appliedCoupon.code}</span>
                    <span className="text-green-400 text-sm">(-₹{discount})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-green-400 hover:text-green-300 text-xs underline">
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-red-400 text-xs mt-1">{couponError}</p>
              )}
            </div>

            {/* Order summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subtotal:</span>
                <span className="text-white font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-400">Discount:</span>
                  <span className="text-green-400 font-semibold">-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Shipping:</span>
                <span className="text-green-400 font-semibold">FREE</span>
              </div>
              <div className="border-t border-zinc-800 pt-2 mt-2 flex items-center justify-between">
                <span className="text-white font-bold text-lg">Total:</span>
                <div className="text-right">
                  <span className="text-orange-500 font-bold text-2xl">₹{total.toFixed(2)}</span>
                  {appliedCoupon && (
                    <p className="text-green-400 text-xs">You saved ₹{discount.toFixed(2)}!</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base py-4 rounded-xl transition-colors"
            >
              {isCheckingOut ? 'Redirecting…' : 'Proceed to Checkout'}
            </Button>
            <p className="text-center text-zinc-500 text-xs">
              🔒 Secure checkout powered by Shopify
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
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

  const total = getCartTotal();
  const count = getCartCount();
  const cartItems = cart?.lines?.edges || [];

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
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
        data-testid="cart-overlay"
      />
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-zinc-900 shadow-2xl z-50 overflow-hidden flex flex-col"
        data-testid="cart-drawer"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2
            className="font-oswald text-2xl font-bold text-white"
            data-testid="cart-title"
          >
            Cart ({count})
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
            data-testid="close-cart-button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Soft login prompt for guest users */}
        {!user && cartItems.length > 0 && (
          <div className="bg-zinc-800/50 border-b border-zinc-700 p-3">
            <p className="text-sm text-zinc-300 text-center">
              <button
  onClick={() => {
    window.location.href = 'https://account.fitgearzzz.com';
  }}
  className="text-orange-500 hover:text-orange-400 underline"
>
  Log in
</button>
{' '}
              to save your cart and checkout faster next time!
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div
              className="text-center py-12"
              data-testid="empty-cart-message"
            >
              <p className="text-zinc-400 mb-4">Your cart is empty</p>
              <Button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full"
                data-testid="continue-shopping-button"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(({ node: item }) => {
                const merchandise = item.merchandise || {};
                const product = merchandise.product || {};

                const imageUrl =
                  product.featuredImage?.url ||
                  '/placeholder.png';

                const title =
                  product.title ||
                  merchandise.title ||
                  'Product';

                const priceAmount =
                  merchandise.priceV2?.amount ??
                  merchandise.price?.amount ??
                  merchandise.price ??
                  0;

                const lineId = item.id;
                const quantity = item.quantity ?? 1;

                return (
                  <div
                    key={lineId}
                    className="flex space-x-4 glass-card rounded-2xl p-4"
                    data-testid={`cart-item-${lineId}`}
                  >
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-20 h-20 object-cover rounded-2xl bg-zinc-800"
                    />
                    <div className="flex-1">
                      <h3
                        className="font-manrope font-semibold text-white text-sm"
                        data-testid="cart-item-name"
                      >
                        {title}
                      </h3>
                      {merchandise.title &&
                        merchandise.title !== 'Default Title' && (
                          <p className="text-zinc-400 text-xs">
                            {merchandise.title}
                          </p>
                        )}
                      <p
                        className="text-orange-500 font-bold mt-1"
                        data-testid="cart-item-price"
                      >
                        ₹{Number(priceAmount).toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            updateCartItem(
                              lineId,
                              Math.max(1, quantity - 1)
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl transition-colors"
                          data-testid="decrease-quantity-button"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span
                          className="text-white font-semibold w-8 text-center"
                          data-testid="cart-item-quantity"
                        >
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(lineId, quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl transition-colors"
                          data-testid="increase-quantity-button"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(lineId)}
                          className="ml-auto text-red-500 hover:text-red-400 transition-colors"
                          data-testid="remove-item-button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-zinc-800 p-4 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-manrope text-zinc-300">Subtotal:</span>
              <span
                className="font-oswald text-2xl font-bold text-orange-500"
                data-testid="cart-subtotal"
              >
                ₹{total.toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full py-3 disabled:opacity-60"
              data-testid="checkout-button"
            >
              {isCheckingOut ? 'Redirecting…' : 'Proceed to Checkout'}
            </Button>
            <p className="text-xs text-zinc-400 text-center">
              Secure checkout powered by Fitgearzzz
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

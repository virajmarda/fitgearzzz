import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

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

  // Only render when open
  if (!open) return null;

  const total = getCartTotal();
  const count = getCartCount();

  // cart.lines.edges for Shopify; for guest carts we normalize in CartContext,
  // but still guard against missing shapes.
  const cartItems = cart?.lines?.edges || [];

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const checkoutUrl = getCheckoutUrl() || cart?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('No checkout URL available');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to proceed to checkout. Please try again.');
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
                onClick={() => (window.location.href = '/login')}
                className="text-orange-500 hover:text-orange-400 underline"
              >
                Log in
              </button>{' '}
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
              {cartItems.map((edge, index) => {
                // Support both Shopify shape (edge.node) and any fallback
                const item = edge?.node || edge || {};

                const merchandise = item.merchandise || {};
                const product = merchandise.product || {};

                const imageUrl =
                  product.featuredImage?.url ||
                  merchandise.featuredImage?.url ||
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

                const lineId = item.id || `guest-line-${index}`;
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

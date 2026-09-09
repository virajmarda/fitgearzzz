import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowUpRight, ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/formatCurrency';
import { SITE } from '../config/siteConfig';
import { trackEvent } from '../lib/analytics';

const FREE_SHIPPING_THRESHOLD = 499;

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  useEffect(() => {
    document.title = `Cart \u2014 ${SITE.name}`;
    trackEvent('view_cart', { value: subtotal, items: cartItems.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckout = () => {
    trackEvent('begin_checkout', { value: subtotal });
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <main id="main" className="fg-surface min-h-screen bg-[#f1eee8] flex items-center justify-center px-5">
        <div className="text-center py-24">
          <ShoppingBag className="w-10 h-10 mx-auto text-[#96918a] mb-5" />
          <p className="fg-eyebrow mb-3">Your cart</p>
          <h1 className="text-3xl font-bold mb-3 tracking-[-0.03em]">Nothing here yet</h1>
          <p className="text-[#77736d] mb-7 max-w-sm mx-auto">
            Start with the work. Add the pieces you actually reach for.
          </p>
          <Link to="/products" className="fg-btn">
            Enter the catalog <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="fg-surface min-h-screen bg-[#f1eee8]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14">
        <header className="mb-8 border-b border-[#171717] pb-6 flex items-end justify-between">
          <div>
            <p className="fg-eyebrow mb-3">Your cart</p>
            <h1 className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.045em] leading-none">
              Cart
            </h1>
          </div>
          <button onClick={clearCart} className="text-[12px] text-[#77736d] hover:text-[#f15a24]">
            Clear cart
          </button>
        </header>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Line items */}
          <ul className="border-t border-[#d4d0c8]">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 py-5 border-b border-[#d4d0c8]"
              >
                <Link
                  to={`/products/${item.handle}`}
                  className="shrink-0 w-24 h-28 bg-[#e4e0d8] overflow-hidden border border-[#d4d0c8]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        to={`/products/${item.handle}`}
                        className="font-semibold text-[15px] tracking-[-0.02em] hover:text-[#f15a24] transition-colors block truncate"
                      >
                        {item.title}
                      </Link>
                      {item.variantTitle && (
                        <p className="text-[12px] text-[#77736d] mt-0.5">{item.variantTitle}</p>
                      )}
                    </div>
                    <span className="font-bold whitespace-nowrap">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-[#171717]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#e4e0d8] disabled:opacity-40"
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#e4e0d8]"
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 text-[12px] text-[#77736d] hover:text-[#a33]"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 h-fit border border-[#171717] p-6 bg-[#e4e0d8]">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] mb-5">Order summary</h2>

            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-[#5f5c56]">Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5f5c56]">Shipping</span>
                <span className="font-semibold">
                  {remaining === 0 ? 'Free' : 'Calculated at checkout'}
                </span>
              </div>
            </div>

            {remaining > 0 ? (
              <p className="mt-4 text-[12px] text-[#77736d]">
                Add {formatCurrency(remaining)} more for free shipping.
              </p>
            ) : (
              <p className="mt-4 text-[12px] text-[#5a7a4e] font-semibold">
                You&rsquo;ve unlocked free shipping.
              </p>
            )}

            <div className="mt-5 pt-5 border-t border-[#c9c4ba] flex justify-between items-baseline">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold">{formatCurrency(subtotal)}</span>
            </div>

            <button onClick={handleCheckout} className="fg-btn w-full mt-6">
              <Lock className="w-4 h-4" /> Checkout
            </button>

            {/* Demo-mode notice: no live payment is processed. */}
            <p className="mt-3 text-[11px] text-[#77736d] leading-relaxed">
              Demo store &mdash; checkout is not connected to live payments yet.
              {/* TODO(shopify): redirect to Shopify checkout URL when connected. */}
            </p>

            <Link
              to="/products"
              className="block text-center mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#171717] hover:text-[#f15a24]"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;

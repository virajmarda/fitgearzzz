// src/pages/CartPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    cart,
    cartItems,
    isLoading,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCheckoutUrl,
  } = useCart();

  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = React.useState('');
  const [applyingDiscount, setApplyingDiscount] = React.useState(false);

  // Normalize items for Shopify cart vs guest cart
  const items = React.useMemo(() => {
    if (!cartItems || cartItems.length === 0) return [];

    // Shopify style: lines.edges
    if (cartItems[0]?.node) {
      return cartItems.map((edge) => {
        const line = edge.node;
        const merch = line.merchandise;
        const product = merch?.product;
        const image = merch?.image || product?.featuredImage;

        return {
          id: line.id,
          variantId: merch?.id,
          title: product?.title || merch?.title || 'Product',
          variantTitle:
            merch?.title && merch?.title !== product?.title ? merch.title : '',
          imageUrl: image?.url,
          price: Number(merch?.priceV2?.amount ?? 0),
          currencyCode: merch?.priceV2?.currencyCode ?? 'INR',
          quantity: line.quantity,
        };
      });
    }

    // Guest / normalized items from CartContext
    return cartItems.map((item) => ({
      id: item.id || item.variantId,
      variantId: item.variantId,
      title: item.title || 'Product',
      variantTitle: item.variantTitle || '',
      imageUrl: item.imageUrl,
      price: Number(item.price ?? item.unitPrice ?? 0),
      currencyCode: item.currencyCode || 'INR',
      quantity: item.quantity ?? 1,
    }));
  }, [cartItems]);

  const subtotal =
    typeof getCartTotal === 'function'
      ? getCartTotal()
      : items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const isEmpty = !items || items.length === 0;

  const formatPrice = (amount, currencyCode = 'INR') => {
    if (!amount) return '₹0.00';
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `₹${amount.toFixed(2)}`;
    }
  };

  const handleQuantityChange = (item, nextQty) => {
    if (nextQty < 1) return;
    if (typeof updateCartItem === 'function') {
      updateCartItem(item.id || item.variantId, nextQty);
    }
  };

  const handleRemove = (item) => {
    if (typeof removeFromCart === 'function') {
      removeFromCart(item.id || item.variantId);
    }
  };

  const handleClearCart = () => {
    if (typeof clearCart === 'function' && !isEmpty) {
      clearCart();
    }
  };

  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    if (!discountCode.trim()) return;
    setApplyingDiscount(true);
    try {
      // Optional: call backend to attach discount to cart
      // await api.post('/cart/discount', { code: discountCode });
    } finally {
      setApplyingDiscount(false);
    }
  };

  const handleCheckout = async () => {
    if (!getCheckoutUrl) return;

    try {
      const url = await getCheckoutUrl(discountCode?.trim() || undefined);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      // optional toast here
    }
  };

  const handleContinueShopping = () => {
    // ✅ proper React onClick, no broken `onclick=`
    navigate('/');
  };

  if (isLoading && !cart && items.length === 0) {
    return (
      <div className="cart-page cart-page--loading">
        <div className="cart-page__container">
          <p className="cart-page__loading-text">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="cart-page cart-page--empty">
        <div className="cart-page__container">
          <h1 className="cart-page__title">Your Cart</h1>
          <p className="cart-page__empty-text">
            Your cart is empty. Add products to the cart and come back here.
          </p>
          <button
            type="button"
            className="cart-page__button cart-page__button--primary"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <h1 className="cart-page__title">Your Cart</h1>
        <p className="cart-page__subtitle">
          Review your items, adjust quantities, and proceed to a secure checkout.
        </p>

        <div className="cart-page__layout">
          {/* Left: items */}
          <div className="cart-page__items">
            {items.map((item) => (
              <div key={item.id} className="cart-page__item">
                <div className="cart-page__item-media">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="cart-page__item-image"
                    />
                  ) : (
                    <div className="cart-page__item-image cart-page__item-image--placeholder">
                      <span>FG</span>
                    </div>
                  )}
                </div>

                <div className="cart-page__item-content">
                  <div className="cart-page__item-header">
                    <div>
                      <h2 className="cart-page__item-title">{item.title}</h2>
                      {item.variantTitle && (
                        <p className="cart-page__item-variant">
                          {item.variantTitle}
                        </p>
                      )}
                    </div>
                    <p className="cart-page__item-price">
                      {formatPrice(item.price, item.currencyCode)}
                    </p>
                  </div>

                  <div className="cart-page__item-footer">
                    <div className="cart-page__quantity">
                      <button
                        type="button"
                        className="cart-page__qty-btn"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="cart-page__qty-value">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="cart-page__qty-btn"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-page__item-actions">
                      <p className="cart-page__item-subtotal">
                        {formatPrice(item.price * item.quantity, item.currencyCode)}
                      </p>
                      <button
                        type="button"
                        className="cart-page__remove"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-page__bottom-actions">
              <button
                type="button"
                className="cart-page__button cart-page__button--ghost"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="cart-page__button cart-page__button--link"
                onClick={handleClearCart}
                disabled={isEmpty}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Right: summary */}
          <aside className="cart-page__summary">
            <div className="cart-page__summary-card">
              <h2 className="cart-page__summary-title">Order Summary</h2>

              <div className="cart-page__summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="cart-page__summary-row cart-page__summary-row--muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="cart-page__summary-row cart-page__summary-row--total">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <form className="cart-page__discount" onSubmit={handleApplyDiscount}>
                <label className="cart-page__discount-label">
                  Coupon / Promo code
                </label>
                <div className="cart-page__discount-row">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="cart-page__discount-input"
                  />
                  <button
                    type="submit"
                    className="cart-page__button cart-page__button--outline"
                    disabled={applyingDiscount || !discountCode.trim()}
                  >
                    {applyingDiscount ? 'Applying…' : 'Apply'}
                  </button>
                </div>
              </form>

              <button
                type="button"
                className="cart-page__button cart-page__button--primary cart-page__button--full"
                onClick={handleCheckout}
                disabled={isLoading || isEmpty}
              >
                {isLoading ? 'Processing…' : 'Proceed to Checkout'}
              </button>

              <p className="cart-page__trust-text">
                100% secure checkout powered by Fitgearzzz.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import './CartPage.css';

const COUPON_CODES = {
  'WELCOME10': { discount: 10, type: 'percentage', minOrder: 0 },
  'SAVE20': { discount: 20, type: 'percentage', minOrder: 1000 },
  'FLAT100': { discount: 100, type: 'fixed', minOrder: 500 },
};

const CartPage = () => {
  const navigate = useNavigate();
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

  const subtotal = getCartTotal();
  const count = getCartCount();
  const cartItems = cart?.lines?.edges || [];

  // Apply coupon
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
    toast.success(
      `Coupon "${code}" applied! You saved ₹${calculateDiscount(coupon)}`
    );
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  // Calculate discount
  const calculateDiscount = (coupon) => {
    if (!coupon) return 0;
    if (coupon.type === 'percentage') {
      return Math.floor(subtotal * (coupon.discount / 100));
    }
    return coupon.discount;
  };

  const discount = calculateDiscount(appliedCoupon);
  const total = subtotal - discount;

  // Handle quantity update
  const handleUpdateQuantity = async (lineId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(lineId, newQuantity);
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Handle remove item
  const handleRemoveItem = async (lineId) => {
    try {
      await removeFromCart(lineId);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  // Handle checkout
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  // Show empty cart state
  if (!cartItems.length) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <ShoppingBag className="empty-cart-icon" size={80} />
            <h1 className="empty-cart-title">Your Cart is Empty</h1>
            <p className="empty-cart-text">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products" className="shop-now-btn">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render cart with items
  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <h1 className="cart-title">Your Shopping Cart</h1>
          <p className="cart-subtitle">
            You have <span>{count}</span> {count === 1 ? 'item' : 'items'} in
            your cart
          </p>
        </div>

        {/* Main Content */}
        <div className="cart-content">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <h2 className="cart-items-header">Cart Items</h2>
            <div className="cart-items-list">
              {cartItems.map(({ node }) => {
                const item = node;
                const product = item.merchandise?.product;
                const variant = item.merchandise;
                const image = product?.images?.edges?.[0]?.node;

                return (
                  <div key={item.id} className="cart-item">
                    {/* Product Image */}
                    <div className="item-image">
                      <img
                        src={image?.url || '/placeholder.png'}
                        alt={product?.title || 'Product'}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="item-details">
                      <h3 className="item-name">{product?.title}</h3>
                      {variant?.title !== 'Default Title' && (
                        <p className="item-variant">{variant?.title}</p>
                      )}
                      <p className="item-price">
                        ₹
                        {parseFloat(
                          item.cost?.totalAmount?.amount || 0
                        ).toFixed(2)}
                      </p>
                    </div>

                    {/* Item Actions */}
                    <div className="item-actions">
                      {/* Quantity Control */}
                      <div className="quantity-control">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            {/* Coupon Section */}
            <div className="coupon-section">
              <label className="coupon-label">Have a coupon code?</label>
              {!appliedCoupon ? (
                <>
                  <div className="coupon-input-wrapper">
                    <input
                      type="text"
                      className="coupon-input"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError('');
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') applyCoupon();
                      }}
                    />
                    <button
                      className="apply-btn"
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="coupon-error">{couponError}</p>
                  )}
                </>
              ) : (
                <div className="applied-coupon">
                  <span className="applied-coupon-text">
                    {appliedCoupon.code} applied
                  </span>
                  <button
                    className="remove-coupon-btn"
                    onClick={removeCoupon}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span className="price-value">₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="price-row discount">
                  <span>Discount</span>
                  <span className="price-value">-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="price-row total">
                <span>Total</span>
                <span className="price-value total">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut || !cartItems.length}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            {/* Continue Shopping */}
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

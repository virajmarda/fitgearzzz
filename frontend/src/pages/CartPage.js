// src/pages/CartPage.js
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { trackInitiateCheckout } from '../utils/analytics';

const styles = {
  page: {
    background: '#0a0a0f',
    color: '#f0f0f5',
    minHeight: '80vh',
    padding: '3rem 1.5rem 5rem',
    fontFamily: 'inherit',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  heading: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 700,
    marginBottom: '0.25rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    color: '#9090a0',
    fontSize: '0.95rem',
    marginBottom: '2.5rem',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) 360px',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    display: 'flex',
    gap: '1rem',
    padding: '1.25rem',
    background: 'linear-gradient(135deg, #141420, #0d0d14)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px',
  },
  itemImage: {
    width: '90px',
    height: '90px',
    borderRadius: '10px',
    objectFit: 'cover',
    flexShrink: 0,
    background: '#1e1e2a',
  },
  imagePlaceholder: {
    width: '90px',
    height: '90px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #1a1018, #1e1e2a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f97316',
    fontWeight: 700,
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  itemContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  itemTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.3,
    margin: 0,
  },
  itemVariant: {
    fontSize: '0.8rem',
    color: '#9090a0',
    marginTop: '2px',
  },
  itemPrice: {
    color: '#f97316',
    fontWeight: 600,
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
  },
  itemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.25rem',
  },
  qtyControl: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  qtyBtn: {
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a1a26',
    border: 'none',
    color: '#f0f0f5',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  qtyValue: {
    width: '38px',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  itemSubtotal: {
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#f87171',
    fontSize: '0.8rem',
    cursor: 'pointer',
    padding: '2px 0',
  },
  bottomActions: {
    marginTop: '1.25rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #141420, #0d0d14)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '1.5rem',
    position: 'sticky',
    top: '100px',
  },
  summaryTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '1.25rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    marginBottom: '0.6rem',
  },
  summaryRowTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: 700,
    paddingTop: '0.75rem',
    marginTop: '0.5rem',
    borderTop: '1px solid rgba(255,255,255,0.07)',
  },
  discountLabel: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#9090a0',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  discountRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  discountInput: {
    flex: 1,
    background: '#0d0d14',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '999px',
    color: '#f0f0f5',
    padding: '0.5rem 1rem',
    fontSize: '0.88rem',
    outline: 'none',
  },
  btnPrimary: {
    borderRadius: '999px',
    padding: '0.7rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #f97316, #ef4444)',
    color: '#ffffff',
    boxShadow: '0 6px 24px rgba(249,115,22,0.35)',
    width: '100%',
    marginTop: '0.5rem',
    letterSpacing: '0.02em',
  },
  btnOutline: {
    borderRadius: '999px',
    padding: '0.55rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    background: 'transparent',
    color: '#f0f0f5',
    border: '1px solid rgba(255,255,255,0.15)',
    cursor: 'pointer',
  },
  btnDanger: {
    background: 'transparent',
    border: 'none',
    color: '#f87171',
    fontSize: '0.85rem',
    cursor: 'pointer',
    padding: '0.55rem 0.5rem',
  },
  trustText: {
    fontSize: '0.75rem',
    color: '#60606e',
    textAlign: 'center',
    marginTop: '0.75rem',
  },
  trustIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.6rem',
    fontSize: '0.75rem',
    color: '#60606e',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    margin: '1rem 0',
  },
};

const formatPrice = (amount, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(Number(amount) || 0);
  } catch {
    return `₹${Number(amount || 0).toFixed(2)}`;
  }
};

const CartPage = () => {
  const {
    cartItems,
    isLoading,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCheckoutUrl,
  } = useCart();

  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [applying, setApplying] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  const items = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return [];
    if (cartItems[0]?.node) {
      return cartItems.map(({ node: line }) => {
        const merch = line.merchandise;
        const product = merch?.product;
        const image = merch?.image || product?.featuredImage;
        return {
          id: line.id,
          title: product?.title || 'Product',
          variantTitle: merch?.title !== product?.title ? merch?.title : '',
          imageUrl: image?.url,
          price: Number(merch?.priceV2?.amount ?? 0),
          currency: merch?.priceV2?.currencyCode ?? 'INR',
          quantity: line.quantity,
        };
      });
    }
    return cartItems.map((item) => ({
      id: item.id || item.variantId,
      title: item.title || 'Product',
      variantTitle: item.variantTitle || '',
      imageUrl: item.imageUrl,
      price: Number(item.price ?? item.unitPrice ?? 0),
      currency: item.currencyCode || 'INR',
      quantity: item.quantity ?? 1,
    }));
  }, [cartItems]);

  const subtotal =
    typeof getCartTotal === 'function'
      ? getCartTotal()
      : items.reduce((s, i) => s + i.price * i.quantity, 0);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleQty = (item, next) => {
    if (next < 1) return;
    updateCartItem?.(item.id, next);
  };

  const handleRemove = (item) => removeFromCart?.(item.id);

  const handleClear = () => {
    if (items.length && window.confirm('Remove all items from your cart?'))
      clearCart?.();
  };

  const handleDiscount = async (e) => {
    e.preventDefault();
    if (!discountCode.trim()) return;
    setApplying(true);
    await new Promise((r) => setTimeout(r, 700));
    setApplying(false);
    setDiscountApplied(true);
  };

  const handleCheckout = async () => {
    if (!getCheckoutUrl) return;
    try {
      const url = await getCheckoutUrl(discountCode?.trim() || undefined);
            if (url) {
            trackInitiateCheckout({ value: getCartTotal?.() || 0, numItems: getCartCount?.() || 0 });
                      window.location.href = url;
                    }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  // ── Loading ──
  if (isLoading && items.length === 0) {
    return (
      <div style={{
        background: '#0a0a0f',
        color: '#f0f0f5',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
      }}>
        <p style={{ color: '#9090a0', fontSize: '0.95rem' }}>
          Loading your cart…
        </p>
      </div>
    );
  }

  // ── Empty state (matches Wishlist exactly) ──
  if (items.length === 0) {
    return (
      <div style={{
        background: '#0a0a0f',
        color: '#f0f0f5',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '0.75rem',
          padding: '2rem',
        }}>
          {/* Icon circle */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem',
          }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.8"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>

          {/* Text */}
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            margin: 0,
          }}>
            Your Cart is Empty
          </h1>
          <p style={{
            color: '#9090a0',
            fontSize: '0.95rem',
            maxWidth: '34ch',
            lineHeight: 1.6,
            margin: 0,
          }}>
            Add some premium gear to your cart and come back here to checkout.
          </p>

          {/* Button — matches wishlist exactly */}
          <button
            type="button"
            style={{
              marginTop: '0.5rem',
              borderRadius: '999px',
              padding: '0.7rem 2rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              background: '#f97316',
              color: '#ffffff',
            }}
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Filled cart ──
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Your Cart</h1>
        <p style={styles.subtitle}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart — review
          and proceed to checkout.
        </p>

        <div style={styles.layout}>
          {/* ── Items ── */}
          <div style={styles.itemsList}>
            {items.map((item) => (
              <div key={item.id} style={styles.item}>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={styles.itemImage}
                    loading="lazy"
                  />
                ) : (
                  <div style={styles.imagePlaceholder}>FG</div>
                )}

                <div style={styles.itemContent}>
                  <div style={styles.itemHeader}>
                    <div>
                      <h2 style={styles.itemTitle}>{item.title}</h2>
                      {item.variantTitle && (
                        <p style={styles.itemVariant}>{item.variantTitle}</p>
                      )}
                    </div>
                    <span style={styles.itemPrice}>
                      {formatPrice(item.price, item.currency)}
                    </span>
                  </div>

                  <div style={styles.itemFooter}>
                    <div style={styles.qtyControl}>
                      <button
                        type="button"
                        style={styles.qtyBtn}
                        onClick={() => handleQty(item, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span style={styles.qtyValue}>{item.quantity}</span>
                      <button
                        type="button"
                        style={styles.qtyBtn}
                        onClick={() => handleQty(item, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div style={styles.itemActions}>
                      <span style={styles.itemSubtotal}>
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </span>
                      <button
                        type="button"
                        style={styles.removeBtn}
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={styles.bottomActions}>
              <button
                type="button"
                style={styles.btnOutline}
                onClick={() => navigate('/products')}
              >
                ← Continue Shopping
              </button>
              <button
                type="button"
                style={styles.btnDanger}
                onClick={handleClear}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <aside>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

              <div style={styles.summaryRow}>
                <span style={{ color: '#9090a0' }}>
                  Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={{ color: '#9090a0' }}>Shipping</span>
                <span style={{
                  color: subtotal >= 499 ? '#4ade80' : '#9090a0',
                  fontSize: '0.85rem',
                  fontWeight: subtotal >= 499 ? 600 : 400,
                }}>
                  {subtotal >= 499 ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>

              {subtotal > 0 && subtotal < 499 && (
                <div style={{
                  background: 'rgba(249,115,22,0.08)',
                  border: '1px solid rgba(249,115,22,0.2)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.9rem',
                  fontSize: '0.8rem',
                  color: '#fdba74',
                  marginBottom: '0.75rem',
                }}>
                  🎯 Add <strong>{formatPrice(499 - subtotal)}</strong> more to
                  unlock free shipping
                </div>
              )}

              <hr style={styles.divider} />

              <div style={styles.summaryRowTotal}>
                <span>Total</span>
                <span style={{ color: '#f97316' }}>{formatPrice(subtotal)}</span>
              </div>

              {/* Promo code */}
              <div style={{ marginTop: '1.25rem' }}>
                <label style={styles.discountLabel}>Promo / Coupon Code</label>
                <form onSubmit={handleDiscount} style={styles.discountRow}>
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    style={styles.discountInput}
                  />
                  <button
                    type="submit"
                    style={{
                      ...styles.btnOutline,
                      padding: '0.5rem 1rem',
                      fontSize: '0.82rem',
                    }}
                    disabled={applying || !discountCode.trim()}
                  >
                    {applying ? '…' : discountApplied ? '✓' : 'Apply'}
                  </button>
                </form>
                {discountApplied && (
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#4ade80',
                    marginTop: '-0.5rem',
                    marginBottom: '0.5rem',
                  }}>
                    ✓ Code applied! Discount will reflect at checkout.
                  </p>
                )}
              </div>

              {/* Checkout button */}
              <button
                type="button"
                style={{
                  ...styles.btnPrimary,
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Processing…' : 'Proceed to Checkout →'}
              </button>

              <p style={styles.trustText}>
                🔒 Secure checkout powered by Fitgearzzz.
              </p>
              <div style={styles.trustIcons}>
                <span>✅ Easy Returns</span>
                <span>•</span>
                <span>🚚 Pan India Delivery</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

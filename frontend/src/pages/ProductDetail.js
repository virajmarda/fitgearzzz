import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  X,
} from 'lucide-react';
import { fetchProductByHandle, fetchRelatedProducts } from '../services/shopifyService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { formatCurrency } from '../lib/formatCurrency';
import { SITE } from '../config/siteConfig';
import { trackEvent } from '../lib/analytics';

const APPAREL_SIZE_GUIDE = [
  ['S', '86\u201391', '71\u201376'],
  ['M', '96\u2013101', '81\u201386'],
  ['L', '106\u2013111', '91\u201396'],
  ['XL', '116\u2013121', '101\u2013106'],
  ['XXL', '126\u2013131', '111\u2013116'],
];

function Detail({ label, children }) {
  return (
    <details className="border-b border-[#d4d0c8] group">
      <summary className="flex items-center justify-between py-4 cursor-pointer list-none text-[13px] font-bold uppercase tracking-[0.08em] text-[#171717]">
        {label}
        <Plus className="w-4 h-4 text-[#77736d] group-open:hidden" />
        <Minus className="w-4 h-4 text-[#77736d] hidden group-open:block" />
      </summary>
      <div className="pb-5 text-[14px] leading-relaxed text-[#5f5c56]">{children}</div>
    </details>
  );
}

function SizeGuide({ onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    ref.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
        className="fg-surface bg-[#f1eee8] w-full max-w-md p-6 outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Size guide</h2>
          <button onClick={onClose} aria-label="Close size guide" className="text-[#77736d] hover:text-[#171717]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[13px] text-[#77736d] mb-4">Measurements in centimetres. When between sizes, size up for a relaxed fit.</p>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left border-b border-[#171717]">
              <th className="py-2 font-bold">Size</th>
              <th className="py-2 font-bold">Chest</th>
              <th className="py-2 font-bold">Waist</th>
            </tr>
          </thead>
          <tbody>
            {APPAREL_SIZE_GUIDE.map((row) => (
              <tr key={row[0]} className="border-b border-[#d4d0c8]">
                <td className="py-2 font-semibold">{row[0]}</td>
                <td className="py-2 text-[#5f5c56]">{row[1]}</td>
                <td className="py-2 text-[#5f5c56]">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setActiveImg(0);
    setQty(1);
    window.scrollTo({ top: 0 });
    fetchProductByHandle(handle)
      .then((p) => {
        if (!active) return;
        setProduct(p);
        if (p) {
          const init = {};
          (p.options || []).forEach((o) => {
            const firstAvail =
              p.variants.find((v) => v.available && v.options[o.name])?.options[o.name] ||
              o.values[0];
            init[o.name] = firstAvail;
          });
          setSelected(init);
          document.title = `${p.title} \u2014 ${SITE.name}`;
          trackEvent('view_item', { item_id: p.id, item_name: p.title, price: p.price });
          fetchRelatedProducts(p, 4).then((r) => active && setRelated(r || []));
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [handle]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    const match = product.variants.find((v) =>
      Object.entries(selected).every(([k, val]) => v.options?.[k] === val)
    );
    return match || product.variants[0] || null;
  }, [product, selected]);

  if (loading) {
    return (
      <main className="fg-surface min-h-screen bg-[#f1eee8]">
        <div className="max-w-[1200px] mx-auto px-5 py-14 grid md:grid-cols-2 gap-10">
          <div className="aspect-[4/5] bg-[#e4e0d8] animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 w-1/4 bg-[#e4e0d8] animate-pulse" />
            <div className="h-10 w-3/4 bg-[#e4e0d8] animate-pulse" />
            <div className="h-6 w-1/3 bg-[#e4e0d8] animate-pulse" />
            <div className="h-24 w-full bg-[#e4e0d8] animate-pulse" />
            <div className="h-12 w-full bg-[#e4e0d8] animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="fg-surface min-h-screen bg-[#f1eee8] flex items-center justify-center px-5">
        <div className="text-center py-24">
          <p className="fg-eyebrow mb-3">404</p>
          <h1 className="text-3xl font-bold mb-3">Product not found</h1>
          <p className="text-[#77736d] mb-6">This piece may have sold out or moved.</p>
          <Link to="/products" className="fg-btn">Back to shop</Link>
        </div>
      </main>
    );
  }

  const price = selectedVariant?.price ?? product.price;
  const compareAt =
    (selectedVariant?.compareAtPrice ?? product.compareAtPrice) &&
    (selectedVariant?.compareAtPrice ?? product.compareAtPrice) > price
      ? selectedVariant?.compareAtPrice ?? product.compareAtPrice
      : null;

  const productOOS = product.availability === 'out_of_stock' || product.stock === 0;
  const variantUnavailable = selectedVariant ? !selectedVariant.available : false;
  const canBuy = !productOOS && !variantUnavailable;
  const wished = isInWishlist(product.id);
  const isApparel = product.category === 'Wear' && (product.options || []).some((o) => o.name === 'Size');

  const handleAdd = () => {
    if (!canBuy) return;
    addToCart(product, selectedVariant, qty);
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.title,
      price,
      quantity: qty,
      variant: selectedVariant?.title,
    });
  };

  return (
    <main id="main" className="fg-surface min-h-screen bg-[#f1eee8] pb-28 md:pb-0">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 pt-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.1em] text-[#77736d] mb-6">
          <Link to="/" className="hover:text-[#f15a24]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#f15a24]">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?pillar=${product.collection}`} className="hover:text-[#f15a24]">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#171717]">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/5] bg-[#e4e0d8] overflow-hidden border border-[#d4d0c8]">
              <img
                src={product.images?.[activeImg]?.url || product.image}
                alt={product.images?.[activeImg]?.alt || product.title}
                width="800"
                height="1000"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#171717] text-[#f1eee8] text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1">
                  {product.badge}
                </span>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((im, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === activeImg}
                    className={`w-16 h-20 overflow-hidden border ${
                      i === activeImg ? 'border-[#171717]' : 'border-[#d4d0c8] hover:border-[#96918a]'
                    }`}
                  >
                    <img src={im.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="fg-eyebrow mb-3">{product.category} / {product.brand}</p>
            <h1 className="text-[clamp(30px,4.5vw,52px)] font-bold tracking-[-0.04em] leading-[1.02]">
              {product.title}
            </h1>
            <p className="mt-3 text-[15px] text-[#5f5c56] leading-relaxed">{product.shortDescription}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl font-bold">{formatCurrency(price)}</span>
              {compareAt && (
                <>
                  <span className="text-[#96918a] line-through">{formatCurrency(compareAt)}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#f15a24]">
                    Save {formatCurrency(compareAt - price)}
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.08em]">
              {productOOS ? (
                <span className="text-[#a33]">Sold out</span>
              ) : product.availability === 'low_stock' ? (
                <span className="text-[#f15a24]">Low stock \u2014 order soon</span>
              ) : (
                <span className="text-[#5a7a4e]">In stock</span>
              )}
            </p>

            {/* Options */}
            {(product.options || []).map((opt) => (
              <div key={opt.name} className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-bold uppercase tracking-[0.08em]">
                    {opt.name}: <span className="text-[#77736d] font-medium">{selected[opt.name]}</span>
                  </span>
                  {isApparel && opt.name === 'Size' && (
                    <button
                      type="button"
                      onClick={() => setShowGuide(true)}
                      className="text-[12px] underline text-[#77736d] hover:text-[#f15a24]"
                    >
                      Size guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((val) => {
                    const variantForVal = product.variants.find((v) => v.options?.[opt.name] === val);
                    const unavailable = variantForVal ? !variantForVal.available : false;
                    const on = selected[opt.name] === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [opt.name]: val }))}
                        aria-pressed={on}
                        className={`px-4 py-2.5 text-[13px] font-semibold border min-h-[44px] transition-colors relative ${
                          on
                            ? 'bg-[#171717] text-[#f1eee8] border-[#171717]'
                            : 'bg-transparent text-[#171717] border-[#d4d0c8] hover:border-[#171717]'
                        } ${unavailable ? 'opacity-45 line-through' : ''}`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity + Add */}
            <div className="mt-7 flex items-stretch gap-3">
              <div className="flex items-center border border-[#171717]">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#171717] hover:bg-[#e4e0d8] disabled:opacity-40"
                  aria-label="Decrease quantity"
                  disabled={qty <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-[#171717] hover:bg-[#e4e0d8]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button type="button" onClick={handleAdd} disabled={!canBuy} className="fg-btn flex-1">
                {productOOS ? 'Sold out' : variantUnavailable ? 'Unavailable' : 'Add to cart'}
                {canBuy && <ArrowUpRight className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wished}
                className={`w-11 h-11 flex items-center justify-center border ${
                  wished ? 'bg-[#f15a24] border-[#f15a24] text-white' : 'border-[#171717] text-[#171717] hover:bg-[#e4e0d8]'
                }`}
              >
                <Heart className="w-5 h-5" fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>

            {variantUnavailable && !productOOS && (
              <p className="mt-2 text-[12px] text-[#a33]">
                This option is currently unavailable. Choose another {product.options?.[0]?.name?.toLowerCase()}.
              </p>
            )}

            {/* Trust row */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-[11px] text-[#5f5c56]">
              <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-[#f15a24]" /> Pan-India</span>
              <span className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-[#f15a24]" /> 7-day returns</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#f15a24]" /> Checked before dispatch</span>
            </div>

            {/* Accordions */}
            <div className="mt-8">
              <Detail label="Description">{product.description}</Detail>
              {product.fit && <Detail label="Fit">{product.fit}</Detail>}
              {product.material && <Detail label="Material">{product.material}</Detail>}
              {product.care && <Detail label="Care">{product.care}</Detail>}
              <Detail label="Shipping & returns">
                {product.shipping} {product.returns}
              </Detail>
              {/* Reviews are integration-ready: no fabricated ratings shown. */}
              <Detail label="Reviews">
                Verified customer reviews will appear here once connected. We don&rsquo;t show
                placeholder ratings.
              </Detail>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-[clamp(24px,3.5vw,40px)] font-bold tracking-[-0.04em] mb-6">
              Pairs well with
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky purchase bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 fg-surface bg-[#f1eee8] border-t border-[#171717] px-4 py-3 flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#77736d] leading-none">{product.title}</span>
          <span className="font-bold">{formatCurrency(price)}</span>
        </div>
        <button type="button" onClick={handleAdd} disabled={!canBuy} className="fg-btn flex-1">
          {productOOS ? 'Sold out' : variantUnavailable ? 'Unavailable' : 'Add to cart'}
        </button>
      </div>

      {showGuide && <SizeGuide onClose={() => setShowGuide(false)} />}
    </main>
  );
};

export default ProductDetail;

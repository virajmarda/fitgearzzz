import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Package,
  CheckCircle2,
  CreditCard,
  Lock,
  MessageCircle,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/shopifyService';
import HeroPremium from '../components/HeroPremium';
import CategoryShowcase from '../components/CategoryShowcase';
import InfiniteReviews from '../components/InfiniteReviews';
import BrandStorySpotlight from '../components/BrandStorySpotlight';
import { DoodleUnderline, DoodleCircle } from '../components/Doodle';

// Same punch motion signature as HeroPremium — one animation identity
// across the whole page instead of framer-motion's default fade+drift.
const PUNCH_EASE = [0.34, 1.56, 0.64, 1];

// ManifestStamp — replaces the old cursive MarginNote. Instead of a
// handwritten line + doodle, this is a rotated ink-stamp tag (mono,
// bordered, uppercase) next to a short manifest-style line. Same job
// (a quiet breathing beat between sections) but reads as "checked and
// logged" rather than "founder scribbled a note" — ties directly into
// the inspection/dispatch language used everywhere else on the page.
// Kept to exactly four placements, same as the original plan.
const ManifestStamp = ({ code, text }) => (
  <div className="bg-zinc-950 py-12 sm:py-14 border-b border-zinc-900">
    <motion.div
      initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.3, ease: PUNCH_EASE }}
      className="max-w-3xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
    >
      <span className="shrink-0 border border-orange-500/60 text-orange-500 font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm -rotate-2 select-none">
        {code}
      </span>
      <p className="font-mono text-sm sm:text-base text-zinc-300 tracking-wide uppercase text-center">
        {text}
      </p>
    </motion.div>
  </div>
);

// Operational trust signals. Keep copy factual, not promotional.
const TRUST_BADGES = [
  { icon: Truck, title: 'Free Shipping', sub: 'Orders above ₹499' },
  { icon: RotateCcw, title: '7-Day Returns', sub: 'No questions asked' },
  { icon: ShieldCheck, title: '100% Authentic', sub: 'Inspected before dispatch' },
  { icon: Headphones, title: 'Support Available', sub: 'Mon–Sat, 10am–6pm' },
];

// "How we operate" — rendered as a checkpoint ledger, not an icon
// timeline. Each step now carries a short stamped status code (the
// word that would actually appear on a real dispatch log) alongside
// the existing title/body copy.
const OPERATING_STEPS = [
  {
    step: '01',
    code: 'Inspected',
    icon: CheckCircle2,
    title: 'Every item is checked before it ships',
    body:
      'We physically inspect each product at our end before it leaves the warehouse. If something does not pass, it does not go out — no exceptions, no shortcuts.',
  },
  {
    step: '02',
    code: 'Dispatched',
    icon: Package,
    title: 'Dispatched the same day, most days',
    body:
      'Orders placed before 3pm go out same-day. After that, they ship the next morning. Delivery across India typically takes 3–5 business days.',
  },
  {
    step: '03',
    code: 'COD',
    icon: CreditCard,
    title: 'You pay when it arrives, not before',
    body:
      'No advance payment required. Pay by cash or UPI at your door once the order is in your hands — you see it before you pay for it.',
  },
  {
    step: '04',
    code: 'Encrypted',
    icon: Lock,
    title: 'If you do pay online, it is encrypted end to end',
    body:
      'Card and UPI payments run through SSL-encrypted, PCI-compliant processors. We never see or store your payment details on our servers.',
  },
  {
    step: '05',
    code: 'Returns',
    icon: RotateCcw,
    title: 'Seven days to change your mind',
    body:
      'Not satisfied? Return within 7 days of delivery for a full refund. No forms to fill, no reasons required — we process it and move on.',
  },
  {
    step: '06',
    code: 'Support',
    icon: MessageCircle,
    title: 'A real person answers on WhatsApp',
    body:
      'Message us directly and expect a reply from an actual human in under 2 hours during business hours — not a bot loop.',
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [tally, setTally] = useState(0);

  useEffect(() => {
    fetchProducts()
      .then((all) => setFeaturedProducts(all.slice(0, 8)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Counts the manifest tally up to the loaded item count once products
  // arrive — a small, honest bit of motion (it counts real loaded items,
  // it doesn't fabricate a "live orders" number).
  useEffect(() => {
    if (loading || featuredProducts.length === 0) return;
    let n = 0;
    const total = featuredProducts.length;
    const id = setInterval(() => {
      n += 1;
      setTally(n);
      if (n >= total) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [loading, featuredProducts.length]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero — manifest header, no stock photography */}
      <HeroPremium />

      {/* Category grid — modular band */}
      <CategoryShowcase />

      {/* Reviews — credibility band */}
      <InfiniteReviews />

      {/* Stamp 1/4: quiet breathing space between reviews and catalog */}
      <ManifestStamp code="Verified" text="real reviews. real orders." />

      {/* Catalog — 8 hand-picked SKUs, synced from Shopify, numbered as manifest lines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="block w-5 h-px bg-orange-500" />
              <p className="font-mono text-orange-500 text-[10px] font-semibold uppercase tracking-[0.22em]">
                Manifest · Catalog Line
              </p>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              What people are buying
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1.5 max-w-sm font-mono uppercase tracking-wide">
              {loading
                ? 'Loading manifest…'
                : `${String(tally).padStart(3, '0')} / ${String(featuredProducts.length).padStart(3, '0')} items logged from Shopify`}
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors shrink-0"
          >
            Full catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.25, delay: (i % 4) * 0.05, ease: PUNCH_EASE }}
                className="relative"
              >
                {/* Manifest line number — overlay tag, ProductCard itself is untouched
                    so this stays in sync with every other place ProductCard is used. */}
                <span className="absolute -top-2 -left-2 z-20 bg-zinc-950 border border-zinc-800 text-orange-500 font-mono text-[10px] px-1.5 py-0.5 rounded-sm">
                  {String(i + 1).padStart(3, '0')}
                </span>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 text-sm text-center py-12">
            Catalog is loading. Check back shortly.
          </p>
        )}
      </section>

      {/* Stamp 2/4: catalog is live, not staged */}
      <ManifestStamp code="Live" text="live catalog, not staged photos." />

      {/* Operating guarantees & order journey — rendered as a checkpoint ledger */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header + trust badges */}
          <div className="mb-14 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="max-w-xl relative">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="block w-5 h-px bg-orange-500" />
                <p className="font-mono text-orange-500 text-[10px] font-semibold uppercase tracking-[0.22em]">
                  Operating Log
                </p>
              </div>
              <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide inline-block relative">
                What happens after you place an order
              </h2>
              <DoodleUnderline className="w-40 h-6 text-orange-500/70 mt-1" />
              <p className="text-zinc-500 mt-3 text-sm leading-relaxed">
                Inspection, dispatch, payment, returns, and support all run on fixed rules — not
                one-off promises. Every order moves through the same six checkpoints, in order.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:max-w-md relative">
              {TRUST_BADGES.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-3 relative">
                  <Icon className="w-5 h-5 text-orange-500 shrink-0" strokeWidth={1.5} />
                  <div className="relative">
                    <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{sub}</p>
                    {title === '100% Authentic' && (
                      <DoodleCircle className="w-24 h-10 text-orange-500/70 absolute -left-4 -top-3 pointer-events-none" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkpoint ledger — replaces the circle-and-line timeline.
              Each row: mono checkpoint code, a rotated stamp badge with
              the status word, then title + body. Reads like an actual
              dispatch log rather than a generic "how it works" strip. */}
          <div className="border-t border-zinc-800">
            {OPERATING_STEPS.map(({ step, code, icon: Icon, title, body }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.28, ease: PUNCH_EASE }}
                className="grid grid-cols-[56px_1fr] sm:grid-cols-[64px_128px_1fr] gap-4 sm:gap-8 items-start py-6 border-b border-zinc-800"
              >
                <span className="font-mono text-zinc-700 text-xs pt-1.5">CHK.{step}</span>

                <span className="hidden sm:inline-flex items-center justify-center h-fit w-fit border border-orange-500/50 text-orange-500 font-mono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm -rotate-1">
                  {code}
                </span>

                <div>
                  <span className="sm:hidden inline-flex items-center border border-orange-500/50 text-orange-500 font-mono text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-sm -rotate-1 mb-2">
                    {code}
                  </span>
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-orange-500 shrink-0" strokeWidth={1.5} />
                    {title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stamp 3/4: standalone band, full breathing room, no crowding */}
      <ManifestStamp code="Sealed" text="COD, returns, encrypted checkout — always on, never a limited-time thing." />

      {/* Brand editorial spotlight */}
      <BrandStorySpotlight />

      {/* Stamp 4/4: before the newsletter offer */}
      <ManifestStamp code="No Spam" text="we mean it — no spam, ever." />

      {/* Newsletter — framed as joining the manifest, not a bolted-on marketing band */}
      <section className="bg-orange-500 py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 border border-white/30 rounded-sm px-2.5 py-1 -rotate-2 mb-5">
            Manifest Entry
          </span>
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-2">
            10% off your first order
          </h2>
          <p className="text-orange-100/80 text-sm mb-7">
            Early access to restocks, new arrivals, and training reads. No spam.
          </p>
          {subscribed ? (
            <p className="text-white font-mono font-semibold uppercase tracking-wide text-sm">
              ✓ Logged. Check your inbox.
            </p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-5 py-3 rounded-sm text-zinc-900 text-sm font-medium placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-sm transition-colors whitespace-nowrap"
              >
                Join the list
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

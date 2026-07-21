import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Mail,
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

// Operational trust signals. Keep copy factual, not promotional.
const TRUST_BADGES = [
  { icon: Truck, title: 'Free Shipping', sub: 'Orders above ₹499' },
  { icon: RotateCcw, title: '7-Day Returns', sub: 'No questions asked' },
  { icon: ShieldCheck, title: '100% Authentic', sub: 'Inspected before dispatch' },
  { icon: Headphones, title: 'Support Available', sub: 'Mon–Sat, 10am–6pm' },
];

// "How we operate" — told as a sequence, not a feature grid.
// Each step is a stage in the order lifecycle, in the order it actually happens.
const OPERATING_STEPS = [
  {
    step: '01',
    icon: CheckCircle2,
    title: 'Every item is checked before it ships',
    body:
      'We physically inspect each product at our end before it leaves the warehouse. If something does not pass, it does not go out — no exceptions, no shortcuts.',
  },
  {
    step: '02',
    icon: Package,
    title: 'Dispatched the same day, most days',
    body:
      'Orders placed before 3pm go out same-day. After that, they ship the next morning. Delivery across India typically takes 3–5 business days.',
  },
  {
    step: '03',
    icon: CreditCard,
    title: 'You pay when it arrives, not before',
    body:
      'No advance payment required. Pay by cash or UPI at your door once the order is in your hands — you see it before you pay for it.',
  },
  {
    step: '04',
    icon: Lock,
    title: 'If you do pay online, it is encrypted end to end',
    body:
      'Card and UPI payments run through SSL-encrypted, PCI-compliant processors. We never see or store your payment details on our servers.',
  },
  {
    step: '05',
    icon: RotateCcw,
    title: 'Seven days to change your mind',
    body:
      'Not satisfied? Return within 7 days of delivery for a full refund. No forms to fill, no reasons required — we process it and move on.',
  },
  {
    step: '06',
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

  useEffect(() => {
    fetchProducts()
      .then((all) => setFeaturedProducts(all.slice(0, 8)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <HeroPremium />
      <CategoryShowcase />
      <InfiniteReviews />

      {/* Operational trust strip */}
      <section className="bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-orange-500 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog — 8 hand-picked SKUs, synced from Shopify */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="block w-5 h-px bg-orange-500" />
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
                From the catalog
              </p>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              What people are buying
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-sm">
              Eight products pulled from the live Shopify catalog. Updated in real time.
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
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 text-sm text-center py-12">
            Catalog is loading. Check back shortly.
          </p>
        )}
      </section>

      {/* How we operate — told as a numbered operational sequence, not a feature grid */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
                How we operate
              </p>
            </div>
            <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
              From warehouse to your door
            </h2>
            <p className="text-zinc-500 mt-3 text-sm leading-relaxed">
              These are not promises made for a landing page. They are the operating conditions
              we set for ourselves before the first order ever shipped — in the order they
              actually happen.
            </p>
          </div>

          <div className="relative">
            {/* Vertical connecting line, desktop only */}
            <div className="hidden sm:block absolute left-[27px] top-2 bottom-2 w-px bg-zinc-800" />

            <div className="flex flex-col gap-10 sm:gap-12">
              {OPERATING_STEPS.map(({ step, icon: Icon, title, body }, i) => (
                <div key={step} className="relative flex gap-6 sm:gap-8">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center relative z-10">
                      <Icon className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1 pt-1 pb-2">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <span className="text-zinc-700 text-xs font-mono tracking-wider">
                        {step}
                      </span>
                      <h3 className="text-white font-semibold text-base sm:text-lg">
                        {title}
                      </h3>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand editorial spotlight */}
      <BrandStorySpotlight />

      {/* Newsletter — direct offer, no filler */}
      <section className="bg-orange-500 py-14">
        <div className="max-w-lg mx-auto px-4 text-center">
          <Mail className="w-7 h-7 text-white/80 mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-2">
            10% off your first order
          </h2>
          <p className="text-orange-100/80 text-sm mb-7">
            Early access to restocks, new arrivals, and training reads. No spam.
          </p>
          {subscribed ? (
            <p className="text-white font-semibold">
              You're in. Check your inbox.
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
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

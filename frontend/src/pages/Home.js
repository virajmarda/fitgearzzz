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
  { icon: Truck,       title: 'Free Shipping',     sub: 'Orders above ₹499' },
  { icon: RotateCcw,   title: '7-Day Returns',     sub: 'No questions asked' },
  { icon: ShieldCheck, title: '100% Authentic',    sub: 'Inspected before dispatch' },
  { icon: Headphones,  title: 'Support Available', sub: 'Mon–Sat, 10am–6pm' },
];

const WHY_US = [
  {
    icon: Package,
    title: 'Ships within 24 hours',
    body: 'Orders placed before 3 pm are dispatched the same day. Delivery across India in 3–5 business days.',
    stat: '24h',
    label: 'Dispatch',
  },
  {
    icon: CheckCircle2,
    title: 'Full refund, 7 days',
    body: 'Return any product within 7 days of delivery for a complete refund. No forms, no friction.',
    stat: '7',
    label: 'Day window',
  },
  {
    icon: CreditCard,
    title: 'Pay on delivery',
    body: 'No advance required. Pay cash or UPI when your order arrives at the door.',
    stat: '₹0',
    label: 'Advance',
  },
  {
    icon: Lock,
    title: 'Encrypted checkout',
    body: 'All payment data runs through SSL-encrypted, PCI-compliant processors. Nothing is stored on our side.',
    stat: 'SSL',
    label: 'Encrypted',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp support',
    body: 'Message us on WhatsApp. A real person responds in under 2 hours during business hours.',
    stat: '<2h',
    label: 'Response',
  },
  {
    icon: ShieldCheck,
    title: 'Checked before it ships',
    body: 'Each item is physically inspected at our end before dispatch. If it does not pass, it does not leave.',
    stat: '100%',
    label: 'Inspected',
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

      {/* Why FitGearzzz — factual, not motivational */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
                How we operate
              </p>
            </div>
            <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide max-w-lg">
              The standards we hold ourselves to
            </h2>
            <p className="text-zinc-500 mt-3 max-w-md text-sm leading-relaxed">
              These are not promises. They are the operating conditions we set before we shipped a single order.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_US.map(({ icon: Icon, title, body, stat, label }) => (
              <div
                key={title}
                className="bg-zinc-950 rounded-sm border border-zinc-800/80 p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors"
              >
                <div className="w-9 h-9 rounded-sm bg-orange-500/10 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-orange-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{body}</p>
                </div>
                <div className="flex items-baseline gap-1.5 mt-auto pt-2 border-t border-zinc-800">
                  <span className="text-orange-500 font-bold text-base">{stat}</span>
                  <span className="text-zinc-700 text-xs uppercase tracking-wide">{label}</span>
                </div>
              </div>
            ))}
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

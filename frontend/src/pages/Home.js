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

const TRUST_BADGES = [
  { icon: Truck,       title: 'Free Shipping',    sub: 'On orders above \u20b9499' },
  { icon: RotateCcw,   title: '7-Day Returns',    sub: 'No questions asked' },
  { icon: ShieldCheck, title: '100% Authentic',   sub: 'Quality guaranteed' },
  { icon: Headphones,  title: 'Customer Support', sub: 'Mon\u2013Sat, 10am\u20136pm' },
];

const WHY_US = [
  {
    icon: Package,
    title: 'Pan-India Delivery',
    body: 'Ships within 24 hours. Arrives in 3\u20135 business days at any pin code.',
    stat: '24h', label: 'Dispatch',
  },
  {
    icon: CheckCircle2,
    title: 'Money-Back Guarantee',
    body: 'Return any product within 7 days for a full refund, hassle-free.',
    stat: '7', label: 'Day Window',
  },
  {
    icon: CreditCard,
    title: 'Cash on Delivery',
    body: 'Pay when your package arrives. Zero advance payment required.',
    stat: '\u20b90', label: 'Advance',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    body: 'All transactions run through PCI-compliant, SSL-encrypted gateways.',
    stat: 'SSL', label: 'Encrypted',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    body: 'Real humans respond to your messages in under 2 hours on WhatsApp.',
    stat: '<2h', label: 'Response',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Inspected',
    body: 'Every item is checked before dispatch. We ship only what we stand behind.',
    stat: '100%', label: 'Inspected',
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

      {/* Trust badges */}
      <section className="bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-orange-500 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.2em] mb-1">Hand-picked</p>
            <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
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
          <p className="text-zinc-500 text-sm text-center py-12">
            Products are loading\u2014 check back shortly.
          </p>
        )}
      </section>

      {/* Why FitGearzzz */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Why us</p>
            <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
              Everything you need to train confidently
            </h2>
            <p className="text-zinc-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              We handle delivery, quality, and support\u2014 so your only job is showing up.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map(({ icon: Icon, title, body, stat, label }) => (
              <div
                key={title}
                className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
                </div>
                <div className="flex items-baseline gap-1.5 mt-auto">
                  <span className="text-orange-500 font-bold text-lg">{stat}</span>
                  <span className="text-zinc-600 text-xs uppercase tracking-wide">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-orange-500 py-14">
        <div className="max-w-xl mx-auto px-4 text-center">
          <Mail className="w-8 h-8 text-white mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-2">
            Get 10% off your first order
          </h2>
          <p className="text-orange-100 text-sm mb-7">
            Subscribe for early access to deals, restocks, and training guides.
          </p>
          {subscribed ? (
            <p className="text-white font-semibold text-base">
              You're in. Check your inbox for your discount code.
            </p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-3 rounded-full text-zinc-900 text-sm font-medium placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-full transition-colors whitespace-nowrap"
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

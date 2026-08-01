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
import { DoodleCircle, DoodleUnderline, DoodleStar, DoodleArrow } from '../components/Doodle';

// Operational trust signals. Keep copy factual, not promotional.
const TRUST_BADGES = [
  { icon: Truck, title: 'Free Shipping', sub: 'Orders above ₹499' },
  { icon: RotateCcw, title: '7-Day Returns', sub: 'No questions asked' },
  { icon: ShieldCheck, title: '100% Authentic', sub: 'Inspected before dispatch' },
  { icon: Headphones, title: 'Support Available', sub: 'Mon–Sat, 10am–6pm' },
];

// "How we operate" — told as a sequence, not a feature grid.
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
      {/* Hero — full-height entry */}
      <HeroPremium />

      {/* Category grid — modular band */}
      <CategoryShowcase />

      {/* Reviews — credibility band */}
      <InfiniteReviews />

      {/* Catalog — 8 hand-picked SKUs, synced from Shopify */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div className="relative">
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
            <div className="hidden sm:block absolute -right-16 top-0 text-orange-500/80">
              <span className="font-hand text-lg -rotate-3 block">live, not staged</span>
              <DoodleArrow className="w-10 h-8 -mt-1 ml-6" />
            </div>
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

      {/* Operating guarantees & order journey — single authored band */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header + trust badges */}
          <div className="mb-14 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="max-w-xl relative">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="block w-5 h-px bg-orange-500" />
                <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
                  How we operate
                </p>
              </div>
              <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide inline-block relative">
                What happens after you place an order
              </h2>
              <DoodleUnderline className="w-40 h-6 text-orange-500/80 mt-1" />
              <p className="text-zinc-500 mt-3 text-sm leading-relaxed">
                Inspection, dispatch, payment, returns, and support all run on fixed rules — not
                one-off promises. Below is the sequence every order moves through from warehouse to
                your door.
                <span className="font-hand text-orange-400 text-base ml-2">no fine print, promise.</span>
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

          {/* Timeline */}
          <div className="relative">
            <div className="hidden sm:block absolute left-[27px] top-4 bottom-4 w-px bg-zinc-800" />
            <div className="flex flex-col gap-9 sm:gap-11">
              {OPERATING_STEPS.map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="relative flex gap-6 sm:gap-8">
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center relative z-10">
                      <Icon className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                    </div>
                    <span className="mt-2 text-zinc-700 text-[11px] font-mono tracking-widest">
                      {step}
                    </span>
                  </div>
                  <div className="flex-1 pt-1 pb-2 relative">
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5">
                      {title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{body}</p>
                    {step === '05' && (
                      <span className="font-hand text-orange-400 text-lg mt-2 block rotate-[-1deg]">
                        seriously, no forms.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-zinc-400">
              <DoodleStar className="w-7 h-7 text-orange-400 shrink-0" />
              <p>
                COD, 7-day returns, and encrypted checkout are available on every eligible order —
                they are part of how the site works, not limited-time conditions.
                <span className="font-hand text-orange-400 text-base ml-2">always on.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand editorial spotlight */}
      <BrandStorySpotlight />

      {/* Newsletter — direct offer, no filler */}
      <section className="bg-orange-500 py-16">
        <div className="max-w-lg mx-auto px-4 text-center relative">
          <Mail className="w-7 h-7 text-white/80 mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-2">
            10% off your first order
          </h2>
          <p className="text-orange-100/80 text-sm mb-2">
            Early access to restocks, new arrivals, and training reads. No spam.
          </p>
          <p className="font-hand text-white/90 text-lg mb-7">we mean it, no spam.</p>
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Star,
  Mail,
  Trophy,
  Package,
  CheckCircle2,
  CreditCard,
  Lock,
  MessageCircle,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/shopifyService';
import HeroPremium from '../components/HeroPremium';
import CategoryShowcase from '../components/CategoryShowcase';
import SocialProof from '../components/SocialProof';

const trustBadges = [
  { icon: <Truck className="w-7 h-7 text-orange-500" />, title: 'Free Shipping', sub: 'On all orders above ₹499' },
  { icon: <RotateCcw className="w-7 h-7 text-orange-500" />, title: 'Easy Returns', sub: '7-day hassle-free returns' },
  { icon: <ShieldCheck className="w-7 h-7 text-orange-500" />, title: '100% Authentic', sub: 'Verified genuine products' },
  { icon: <Headphones className="w-7 h-7 text-orange-500" />, title: '24/7 Support', sub: 'Always here to help you' },
];

const testimonials = [
  { name: 'Rahul S.', city: 'Mumbai', rating: 4, text: 'Amazing quality products! The knee patches worked wonders for my recovery. Fast shipping too.', avatar: 'R' },
  { name: 'Priya K.', city: 'Bangalore', rating: 5, text: 'Finally a fitness store that delivers what it promises. The wrist straps are top-notch for heavy lifting.', avatar: 'P' },
  { name: 'Amit D.', city: 'Delhi', rating: 5, text: 'Been using FitGearzzz for 6 months now. Best prices and genuine products every single time.', avatar: 'A' },
  { name: 'Sneha M.', city: 'Pune', rating: 4, text: 'The waist trimmer belt is excellent. Lost 3 inches in 2 months! Super happy with the purchase.', avatar: 'S' },
];

const uspItems = [
  {
    icon: <Trophy className="w-10 h-10" />,
    title: 'Lowest Price Guarantee',
    desc: 'We match any lower price you find elsewhere.',
    gradient: 'from-yellow-500 to-orange-500',
    stat: '100%',
    statLabel: 'Match'
  },
  {
    icon: <Package className="w-10 h-10" />,
    title: 'Fast Pan India Delivery',
    desc: 'Shipped within 24 hours. Delivered in 3-5 days.',
    gradient: 'from-blue-500 to-cyan-500',
    stat: '24hrs',
    statLabel: 'Ship Time'
  },
  {
    icon: <CheckCircle2 className="w-10 h-10" />,
    title: '100% Money Back',
    desc: '7-day no-questions-asked return policy.',
    gradient: 'from-green-500 to-emerald-500',
    stat: '7 Days',
    statLabel: 'Return'
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: 'COD Available',
    desc: 'Pay on delivery across all of India.',
    gradient: 'from-purple-500 to-pink-500',
    stat: '₹0',
    statLabel: 'Advance'
  },
  {
    icon: <Lock className="w-10 h-10" />,
    title: 'Secure Checkout',
    desc: 'Bank-grade SSL encryption on all payments.',
    gradient: 'from-red-500 to-orange-500',
    stat: '256-bit',
    statLabel: 'SSL'
  },
  {
    icon: <MessageCircle className="w-10 h-10" />,
    title: 'Expert Support',
    desc: 'WhatsApp & email support 7 days a week.',
    gradient: 'from-indigo-500 to-purple-500',
    stat: '24/7',
    statLabel: 'Available'
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const products = await fetchProducts();
      setFeaturedProducts(products.slice(0, 8));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const categories = [
    { name: 'Gym Equipment', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80', slug: 'Gym%20Equipment' },
    { name: 'Supplements', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80', slug: 'Supplements' },
    { name: 'Apparel', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80', slug: 'Apparel' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1592999641298-434e28c11d14?w=400&q=80', slug: 'Accessories' },
  ];

      return (
    <div className="min-h-screen bg-zinc-950">

          {/* Premium Hero Section */}
      <HeroPremium />

      {/* Premium Category Showcase */}
      <CategoryShowcase />

      {/* Social Proof Section */}
      <SocialProof />
            
      {/* Trust Badges Strip */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                {badge.icon}
                <div>
                  <p className="text-white font-semibold text-sm">{badge.title}</p>
                  <p className="text-zinc-400 text-xs">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-oswald text-3xl font-bold text-white uppercase tracking-wide">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="flex items-center gap-1 text-orange-500 hover:text-orange-400 font-semibold transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-zinc-800 rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose FitGearzzz */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[120px]" />
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>

            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-wide mb-4">
              Built for{' '}
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Champions
              </span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We don't just sell FITNESS GEARS.. We deliver EXCELLENCE, TRUST and RESULTS.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {uspItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative w-full max-w-sm"
              >
                {/* Gradient border effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative bg-zinc-900 rounded-2xl p-6 h-full border border-zinc-800 group-hover:border-transparent transition-all duration-300 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Stat badge */}
                  <div className="flex items-center justify-center gap-2">
                    <div className={`inline-flex items-center gap-1 bg-gradient-to-r ${item.gradient} rounded-full px-3 py-1`}>
                      <span className="text-white font-bold text-sm">{item.stat}</span>
                    </div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wide">
                      {item.statLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

      </div>
      </section>

      
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Mail className="w-10 h-10 text-white mx-auto mb-4" />
          <h2 className="font-oswald text-3xl font-bold text-white uppercase tracking-wide mb-2">
            Get 10% OFF Your First Order
          </h2>
          <p className="text-orange-100 mb-6">
            Subscribe to our newsletter for exclusive deals, new arrivals & fitness tips.
          </p>

          {subscribed ? (
            <p className="text-white font-bold text-lg">
              ✅ You're subscribed! Check your inbox for your discount code.
            </p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3 rounded-full text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-full transition-colors whitespace-nowrap"
              >
                Subscribe & Save
              </button>
            </form>
          )}
        </div>
      </section>
    </div
  );
};export default Home;

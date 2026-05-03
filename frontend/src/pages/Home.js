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

const trustBadges = [
  { icon: <Truck className="w-7 h-7 text-orange-500" />, title: 'Free Shipping', sub: 'On all orders above ₹499' },
  { icon: <RotateCcw className="w-7 h-7 text-orange-500" />, title: 'Easy Returns', sub: '7-day hassle-free returns' },
  { icon: <ShieldCheck className="w-7 h-7 text-orange-500" />, title: '100% Authentic', sub: 'Verified genuine products' },
  { icon: <Headphones className="w-7 h-7 text-orange-500" />, title: '24/7 Support', sub: 'Always here to help you' },
];

const testimonials = [
  { name: 'Rahul S.', city: 'Mumbai', rating: 5, text: 'Amazing quality products! The knee patches worked wonders for my recovery. Fast shipping too.', avatar: 'R' },
  { name: 'Priya K.', city: 'Bangalore', rating: 5, text: 'Finally a fitness store that delivers what it promises. The wrist straps are top-notch for heavy lifting.', avatar: 'P' },
  { name: 'Amit D.', city: 'Delhi', rating: 5, text: 'Been using FitGearzzz for 6 months now. Best prices and genuine products every single time.', avatar: 'A' },
  { name: 'Sneha M.', city: 'Pune', rating: 5, text: 'The waist trimmer belt is excellent. Lost 3 inches in 2 months! Super happy with the purchase.', avatar: 'S' },
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
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=85')" }}
        >
          <div className="absolute inset-0 bg-zinc-950/70" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-4"
          >
            India's #1 Fitness Store
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-oswald text-5xl md:text-7xl font-bold text-white uppercase tracking-tight leading-none mb-6"
          >
            Unleash Your<br /><span className="text-orange-500">Inner Strength</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 text-lg md:text-xl max-w-xl mx-auto mb-8"
          >
            Premium fitness equipment & supplements to fuel your journey to greatness
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider px-8 py-4 rounded-full text-lg transition-colors"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/products?tag=sale"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-zinc-900 font-oswald uppercase tracking-wider px-8 py-4 rounded-full text-lg transition-colors"
            >
              View Deals
            </Link>
          </motion.div>
        </div>
      </section>

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

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-oswald text-3xl font-bold text-white text-center mb-10 uppercase tracking-wide">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/products?category=${category.slug}`}
                className="relative block rounded-2xl overflow-hidden aspect-square group"
              >
                <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-oswald text-white text-xl font-bold">{category.name}</h3>
                  <p className="text-orange-400 text-sm font-semibold">Shop Now →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-oswald text-3xl font-bold text-white uppercase tracking-wide">Featured Products</h2>
          <Link to="/products" className="flex items-center gap-1 text-orange-500 hover:text-orange-400 font-semibold transition-colors">
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

      {/* Why Choose FitGearzzz - PREMIUM USP SECTION WITH DYNAMIC DESIGN */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
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
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-wide mb-4">
              Built for <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Champions</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We don't just sell fitness gear. We deliver excellence, trust, and results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" justify-items-center>
            {uspItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Gradient border effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative bg-zinc-900 rounded-2xl p-6 h-full border border-zinc-800 group-hover:border-transparent transition-all duration-300">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.desc}</p>

                  {/* Stat badge */}
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center gap-1 bg-gradient-to-r ${item.gradient} rounded-full px-3 py-1`}>
                      <span className="text-white font-bold text-sm">{item.stat}</span>
                    </div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wide">{item.statLabel}</span>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust metrics banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <Award className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-3xl mb-1">10K+</p>
                <p className="text-orange-100 text-sm">Happy Customers</p>
              </div>
              <div>
                <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-3xl mb-1">98%</p>
                <p className="text-orange-100 text-sm">Satisfaction Rate</p>
              </div>
              <div>
                <Package className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-3xl mb-1">50K+</p>
                <p className="text-orange-100 text-sm">Products Delivered</p>
              </div>
              <div>
                <Star className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-3xl mb-1">4.9/5</p>
                <p className="text-orange-100 text-sm">Average Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-oswald text-3xl font-bold text-white text-center mb-10 uppercase tracking-wide">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">\"{t.text}\"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-zinc-500 text-xs">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Mail className="w-10 h-10 text-white mx-auto mb-4" />
          <h2 className="font-oswald text-3xl font-bold text-white uppercase tracking-wide mb-2">Get 10% OFF Your First Order</h2>
          <p className="text-orange-100 mb-6">Subscribe to our newsletter for exclusive deals, new arrivals & fitness tips.</p>
          {subscribed ? (
            <p className="text-white font-bold text-lg">✅ You're subscribed! Check your inbox for your discount code.</p>
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
    </div>
  );
};

export default Home;

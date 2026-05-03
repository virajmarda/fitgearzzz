import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones, Star, Mail } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/shopifyService';

const trustBadges = [
  { icon: <Truck className="w-7 h-7 text-orange-500" />, title: 'Free Shipping', sub: 'On all orders above \u20b9499' },
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
  { icon: '\ud83c\udfc6', title: 'Lowest Price Guarantee', desc: 'We match any lower price you find elsewhere.' },
  { icon: '\ud83d\udce6', title: 'Fast Pan India Delivery', desc: 'Shipped within 24 hours. Delivered in 3-5 days.' },
  { icon: '\u2705', title: '100% Money Back', desc: '7-day no-questions-asked return policy.' },
  { icon: '\ud83d\udcb3', title: 'COD Available', desc: 'Pay on delivery across all of India.' },
  { icon: '\ud83d\udd12', title: 'Secure Checkout', desc: 'Bank-grade SSL encryption on all payments.' },
  { icon: '\ud83d\udcac', title: 'Expert Support', desc: 'WhatsApp & email support 7 days a week.' },
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
                  <p className="text-orange-400 text-sm font-semibold">Shop Now \u2192</p>
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

      {/* Why FitGearzzz - USP Section */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-oswald text-3xl font-bold text-white text-center mb-12 uppercase tracking-wide">Why Choose FitGearzzz?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {uspItems.map((item, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-2xl p-6 text-center hover:bg-zinc-800 transition-colors">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
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
            <p className="text-white font-bold text-lg">\u2705 You're subscribed! Check your inbox for your discount code.</p>
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

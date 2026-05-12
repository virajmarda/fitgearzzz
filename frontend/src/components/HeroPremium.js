import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, TrendingUp, Shield } from 'lucide-react';

const HeroPremium = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[800px] overflow-hidden bg-black">
      {/* Dynamic Background with Image */}
      <div className="absolute inset-0">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')`,
          }}
        >
          {/* Gradient Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>

        {/* Animated accent gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full filter blur-[150px] opacity-30"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-full flex items-center">
          <div className="max-w-3xl space-y-8">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 backdrop-blur-sm border border-orange-500/20"
            >
              <Shield className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">
                India&apos;s #1 Fitness Destination
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            <h1 className="text-5xl lg:text-7xl font-sans font-black text-white leading-[0.95] tracking-tight">
              TRANSFORM YOUR POTENTIAL
              <span className="block mt-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  TRANSFORM YOUR LIFE
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-zinc-300 font-light max-w-2xl leading-relaxed"
            >
              Premium fitness equipment engineered for champions.
              <span className="block mt-2 text-white font-medium">
                Transform your body, elevate your performance.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Shop Now</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Play className="w-5 h-5" fill="currentColor" />
                <span>Watch Story</span>
              </button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-8 pt-8"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                <div>
                  <div className="text-white font-bold text-lg">4.9/5</div>
                  <div className="text-zinc-400 text-sm">15K+ Reviews</div>
                </div>
              </div>

              <div className="h-12 w-px bg-white/10"></div>

              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-white font-bold text-lg">50K+</div>
                  <div className="text-zinc-400 text-sm">Active Users</div>
                </div>
              </div>

              <div className="h-12 w-px bg-white/10"></div>

              <div>
                <div className="text-white font-bold text-lg">Free Shipping</div>
                <div className="text-zinc-400 text-sm">Orders above ₹999</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPremium;

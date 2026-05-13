import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';

const HeroPremium = () => {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 min-h-[92vh] flex items-center">
        <div className="max-w-3xl pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-zinc-200 font-medium tracking-wide">
              Performance gear. Trusted delivery.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(3rem,7vw,6.2rem)] leading-[0.92] tracking-[-0.045em] font-semibold max-w-4xl"
          >
            Built for
            <span className="block text-orange-500">serious training</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl"
          >
            Premium fitness and recovery gear for everyday athletes who want better performance, cleaner quality, and a shopping experience they can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-4 text-white font-semibold transition-colors duration-200"
            >
              Shop Bestsellers
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-7 py-4 text-white font-medium backdrop-blur-sm transition-colors duration-200"
            >
              Explore Categories
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-white">Fast Dispatch</span>
              </div>
              <p className="text-sm text-zinc-400">Quick order processing across India.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-white">Secure Checkout</span>
              </div>
              <p className="text-sm text-zinc-400">Protected payments and reliable ordering.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-white">7-Day Returns</span>
              </div>
              <p className="text-sm text-zinc-400">Simple support when you need help.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// TODO: Replace with your own CDN image when ready
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop';

const HeroPremium = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      className="relative h-[92vh] min-h-[640px] max-h-[900px] overflow-hidden bg-zinc-950"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          y: imgY,
        }}
      />

      {/* Directional overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          {/* Eyebrow label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-6"
          >
            Indias #1 Fitness Destination
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            className="font-oswald text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.0] tracking-tight text-white uppercase mb-6"
          >
            Gear That
            <br />
            <span className="text-orange-500">Moves</span> With You.
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className="text-zinc-300 text-lg leading-relaxed mb-10 max-w-lg"
          >
            Performance fitness equipment and apparel  built for serious
            training, delivered pan-India within 35 days with COD and easy returns.
          </motion.p>

          {/* Primary actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full transition-colors duration-200"
            >
              Shop Premium Gear
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products?tag=bestseller"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/70 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full transition-colors duration-200 backdrop-blur-sm"
            >
              View Bestsellers
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-12 text-xs text-zinc-400 uppercase tracking-widest"
          >
            <span>Free Shipping above 2499</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>7-Day Returns</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>COD Available</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>Secure Checkout</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroPremium;

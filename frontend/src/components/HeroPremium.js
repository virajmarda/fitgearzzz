import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Replace with your own CDN-hosted hero image before launch.
// Unsplash placeholder maintained until brand photography is ready.
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop';

const HeroPremium = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section
      ref={sectionRef}
      className="relative h-[92vh] min-h-[640px] max-h-[920px] overflow-hidden bg-zinc-950"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          y: imgY,
        }}
      />

      {/* Directional overlays — left-heavy for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
        <div className="max-w-xl">

          {/* Category label */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-orange-500 text-xs font-semibold uppercase tracking-[0.24em] mb-5"
          >
            Fitness gear. Pan-India delivery.
          </motion.p>

          {/* Headline — declarative, not aspirational */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-oswald text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.0] tracking-tight text-white uppercase mb-5"
          >
            Built to train.
            <br />
            <span className="text-orange-500">Sourced to last.</span>
          </motion.h1>

          {/* Subline — operational, not sloganeering */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-9 max-w-md"
          >
            Fitness equipment and apparel, inspected before dispatch and shipped
            across India in 3–5 days. COD available. 7-day returns.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm transition-colors duration-200"
            >
              Shop the catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products?tag=bestseller"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm transition-colors duration-200"
            >
              What's selling
            </Link>
          </motion.div>

          {/* Trust line — sparse, factual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-11 text-[11px] text-zinc-500 uppercase tracking-widest"
          >
            <span>Free shipping ₹499+</span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span>7-day returns</span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span>COD</span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span>Secure checkout</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/35 hover:text-white/65 transition-colors cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="text-[9px] uppercase tracking-[0.22em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroPremium;

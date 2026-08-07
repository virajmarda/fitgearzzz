import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Punch-in motion signature: fast scale+opacity snap on a spring curve,
// not a soft opacity/y drift. This is the one motion signature used
// across the whole homepage — see also ManifestStamp and the catalog
// tally in Home.js. Keeping it identical everywhere is what makes it
// register as "a style" rather than "an animation library default."
const punch = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.32, delay, ease: [0.34, 1.56, 0.64, 1] },
});

const MANIFEST_LINES = [
  ['001', 'Free ship ₹499+'],
  ['002', '7-day returns'],
  ['003', 'COD available'],
  ['004', 'Encrypted checkout'],
];

const HeroPremium = () => {
  // Real date, not a fabricated "live" stat — keeps the manifest framing honest.
  const [today] = useState(() =>
    new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  );

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-zinc-950 border-b border-zinc-900">
      {/* Blueprint grid backdrop — replaces stock photography entirely.
          The hero is typographic and data-driven, not another gym photo. */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[360px] h-[360px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Corner brackets — a targeting/inspection-frame motif instead of
          a decorative gradient corner. Reinforces "everything is checked." */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-orange-500/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-orange-500/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-orange-500/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-orange-500/40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-28">
        {/* Manifest header strip */}
        <motion.div
          {...punch(0)}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500"
        >
          <span className="text-orange-500">Manifest — {today}</span>
          <span className="text-zinc-800">|</span>
          <span>Route: Pan-India</span>
          <span className="text-zinc-800">|</span>
          <span>Status: Dispatch Ready</span>
        </motion.div>

        {/* Headline — declarative, still Oswald, no handwriting */}
        <motion.h1
          {...punch(0.06)}
          className="font-oswald text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.98] tracking-tight text-white uppercase max-w-3xl"
        >
          Built to train.
          <br />
          <span className="text-orange-500">Shipped to prove it.</span>
        </motion.h1>

        <motion.p
          {...punch(0.12)}
          className="text-zinc-400 text-base sm:text-lg leading-relaxed mt-6 max-w-lg"
        >
          Every order is inspected before it leaves the warehouse, logged like freight,
          and dispatched across India in 3–5 days. Pay when it arrives.
        </motion.p>

        {/* CTAs — manifest-framed, single primary action */}
        <motion.div {...punch(0.18)} className="flex flex-wrap gap-3 mt-9">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm transition-colors duration-200"
          >
            Add to today's shipment
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/products?tag=bestseller"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-sm transition-colors duration-200"
          >
            What's selling
          </Link>
        </motion.div>

        {/* Manifest line items — replaces the old trust-badge row.
            Same four facts, framed as ledger entries instead of icon chips. */}
        <motion.div
          {...punch(0.24)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 mt-14 max-w-2xl"
        >
          {MANIFEST_LINES.map(([code, label]) => (
            <div key={code} className="bg-zinc-950 px-4 py-3">
              <p className="font-mono text-[10px] text-orange-500/70">{code}</p>
              <p className="text-zinc-300 text-xs mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue — restrained, no bouncing chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-600 font-mono text-[9px] uppercase tracking-[0.24em]"
      >
        <span className="w-4 h-px bg-zinc-700" />
        Scroll
        <span className="w-4 h-px bg-zinc-700" />
      </motion.div>
    </section>
  );
};

export default HeroPremium;

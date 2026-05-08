import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Target,
  Sparkles,
  Trophy,
  Users,
  BadgeCheck,
  Clock3,
  Box,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Performance First',
    desc: 'Every product we list must solve a real training, recovery, or daily fitness need. We do not stock filler products just to increase catalog size.',
    icon: Target,
  },
  {
    title: 'Trust Over Hype',
    desc: 'We believe Indian shoppers deserve clear pricing, honest product value, and a store experience that feels reliable from first click to final delivery.',
    icon: ShieldCheck,
  },
  {
    title: 'Built for Everyday Athletes',
    desc: 'FitGearzzz is designed for real people building real routines — from first-time buyers to disciplined gym-goers upgrading their setup.',
    icon: Trophy,
  },
  {
    title: 'Service That Stays Human',
    desc: 'Great commerce is not only about checkout conversion. It is about support, communication, delivery clarity, and customer confidence after purchase.',
    icon: HeartHandshake,
  },
];

const highlights = [
  { label: 'Fast Dispatch', value: '24 hrs' },
  { label: 'Return Window', value: '7 Days' },
  { label: 'Support Access', value: '7 Days / Week' },
  { label: 'Pan India Reach', value: 'Nationwide' },
];

const timeline = [
  {
    year: 'The Idea',
    title: 'A fitness store built around clarity',
    desc: 'FitGearzzz started with one simple frustration: too many fitness products looked exciting online but failed on quality, delivery, or customer trust.',
  },
  {
    year: 'The Build',
    title: 'Curating products with stronger intent',
    desc: 'Instead of becoming another generic catalog, the brand focused on selecting practical gear, wellness accessories, and training-focused products customers actually use.',
  },
  {
    year: 'The Standard',
    title: 'Designing a better buying experience',
    desc: 'The store experience evolved around speed, product presentation, simple navigation, transparent checkout, and support channels that feel responsive.',
  },
  {
    year: 'The Vision',
    title: 'Turning FitGearzzz into a long-term fitness brand',
    desc: 'The goal is bigger than selling products. It is to build a respected Indian fitness commerce brand known for trust, modern design, and useful products.',
  },
];

const pillars = [
  {
    title: 'Product Curation',
    desc: 'We prioritize utility, repeat usage, and practical value. That means products should earn their place in the catalog.',
    icon: Box,
  },
  {
    title: 'Delivery Confidence',
    desc: 'From dispatch expectations to order clarity, we want every shopper to feel informed and in control.',
    icon: Truck,
  },
  {
    title: 'Store Experience',
    desc: 'A premium brand should feel premium online too — cleaner pages, better clarity, easier decisions.',
    icon: Sparkles,
  },
  {
    title: 'Customer Loyalty',
    desc: 'We aim to create repeat buyers by getting the fundamentals right: quality, reliability, and consistency.',
    icon: Users,
  },
];

const trustPoints = [
  'Carefully selected fitness, wellness, and recovery-focused products.',
  'Clear pricing and practical value-led positioning.',
  'Fast, simple shopping experience with modern design standards.',
  'Responsive support built around customer confidence.',
  'A brand direction designed for long-term trust, not short-term hype.',
];

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_24%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-5"
              >
                About Us
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="font-oswald text-5xl sm:text-6xl lg:text-7xl leading-none uppercase tracking-tight mb-6"
              >
                We are building a
                <span className="block text-orange-500">fitness commerce brand</span>
                made for modern India
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed"
              >
                FitGearzzz exists to make premium fitness shopping feel sharper, easier, and more trustworthy — with a stronger focus on product value, better design, and a customer experience that actually feels cared for.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold transition-colors"
                >
                  Shop Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 font-semibold transition-colors"
                >
                  Contact Our Team
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm p-6 lg:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 font-semibold mb-6">
                  Brand Snapshot
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                      <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
                      <p className="text-sm text-zinc-400">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/8 p-4">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Our ambition is simple: become the kind of fitness brand customers return to because the experience feels dependable, elevated, and worth recommending.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
              Our Story
            </p>
            <h2 className="font-oswald text-4xl sm:text-5xl uppercase leading-none">
              Not another generic
              <span className="block text-zinc-500">fitness store</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
              <p>
                FitGearzzz was born from a gap that too many shoppers in fitness e-commerce already know well: products often look premium in ads, but the buying experience behind them feels confusing, inconsistent, or forgettable.
              </p>
              <p>
                We wanted to build something sharper. A store where product selection feels intentional, where design improves trust instead of distracting from it, and where the customer journey — from browsing to support — feels like it belongs to a serious brand.
              </p>
              <p>
                That is the long-term play behind FitGearzzz. We are not trying to be the loudest brand in the space. We are working to become one of the most trusted, most useful, and most modern fitness commerce experiences for Indian customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3">
                  {item.year}
                </p>
                <h3 className="text-white text-xl font-semibold mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-y border-zinc-900 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
              What We Stand For
            </p>
            <h2 className="font-oswald text-4xl sm:text-5xl uppercase mb-4">
              Principles that shape every product decision
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Great brands are built on repeatable standards. These principles shape how we think about products, presentation, pricing, and customer trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7"
                >
                  <Icon className="w-6 h-6 text-orange-500 mb-5" />
                  <h3 className="text-white text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
              Why FitGearzzz
            </p>
            <h2 className="font-oswald text-4xl sm:text-5xl uppercase leading-none mb-4">
              The four pillars
              <span className="block text-zinc-500">behind the brand</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We want every customer touchpoint to feel aligned — product, delivery, design, and support.
            </p>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  <Icon className="w-6 h-6 text-orange-500 mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-zinc-800">
                <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
                  Trust Markers
                </p>
                <h2 className="font-oswald text-4xl uppercase mb-4">
                  Built to feel premium.
                  <span className="block text-zinc-500">Designed to feel reliable.</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Customers do not trust stores because of big claims alone. They trust stores that feel coherent, clear, and consistent at every stage.
                </p>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  {trustPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 flex items-start gap-3"
                    >
                      <BadgeCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                      <p className="text-zinc-300 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <Clock3 className="w-5 h-5 text-orange-500 mb-3" />
                    <p className="text-white font-semibold mb-1">Speed matters</p>
                    <p className="text-sm text-zinc-400">Fast response and faster clarity reduce friction.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <Truck className="w-5 h-5 text-orange-500 mb-3" />
                    <p className="text-white font-semibold mb-1">Delivery confidence</p>
                    <p className="text-sm text-zinc-400">Clear order movement builds confidence after checkout.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <ShieldCheck className="w-5 h-5 text-orange-500 mb-3" />
                    <p className="text-white font-semibold mb-1">Trust by design</p>
                    <p className="text-sm text-zinc-400">A premium interface should also reduce uncertainty.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
            The Road Ahead
          </p>
          <h2 className="font-oswald text-4xl sm:text-5xl uppercase mb-5">
            We are building FitGearzzz
            <span className="block text-zinc-500">for the long run</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            Better products, stronger storytelling, cleaner systems, and a more memorable customer journey — that is the direction. The ambition is not to look big. The ambition is to become undeniable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold transition-colors"
            >
              Explore Products
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 font-semibold transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

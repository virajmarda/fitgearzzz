import React from 'react';
import {
  Truck,
  PackageCheck,
  RefreshCcw,
  Clock3,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Info,
  BadgeCheck,
  Wallet,
  PackageOpen,
  MapPinned,
  Headphones,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const promiseCards = [
  {
    title: 'Free Shipping',
    subtitle: 'Across India',
    description:
      'We keep delivery simple and transparent with free shipping across India so customers can buy with more confidence and fewer surprises.',
    icon: Truck,
    accent: 'orange',
  },
  {
    title: 'Fast Processing',
    subtitle: 'Quick dispatch flow',
    description:
      'Orders are reviewed, packed, and moved into dispatch as quickly as possible so the post-purchase experience feels reliable and sharp.',
    icon: PackageCheck,
    accent: 'blue',
  },
  {
    title: 'Easy Returns',
    subtitle: '7-day policy window',
    description:
      'If something is not right, we want the return process to feel clear, structured, and customer-friendly instead of frustrating.',
    icon: RefreshCcw,
    accent: 'orange',
  },
  {
    title: 'Refund Clarity',
    subtitle: 'Visible timeline',
    description:
      'Refunds are processed after return review, and we communicate timelines clearly so customers know what to expect.',
    icon: Wallet,
    accent: 'blue',
  },
];

const shippingSteps = [
  {
    title: 'Order Confirmed',
    desc: 'Once your purchase is placed, the order enters our processing flow and a confirmation is generated.',
    icon: BadgeCheck,
  },
  {
    title: 'Processing & Packing',
    desc: 'Orders are reviewed, packed securely, and prepared for courier handoff during working cycles.',
    icon: PackageOpen,
  },
  {
    title: 'Dispatched with Tracking',
    desc: 'After dispatch, tracking details are shared so you can monitor movement and expected delivery progress.',
    icon: MapPinned,
  },
  {
    title: 'Delivered to You',
    desc: 'Delivery timelines may vary by destination, but our goal is a smooth and dependable final-mile experience.',
    icon: Truck,
  },
];

const returnBlocks = [
  {
    title: 'Return Window',
    desc: 'Most eligible items can be returned within 7 days of delivery.',
  },
  {
    title: 'Item Condition',
    desc: 'Returned items should be unused, in original condition, and include packaging, tags, and accessories where applicable.',
  },
  {
    title: 'Proof of Purchase',
    desc: 'Order ID, invoice reference, or other valid purchase proof may be required to process the return correctly.',
  },
  {
    title: 'Review Before Refund',
    desc: 'Each return is inspected after it reaches us so refunds can be approved accurately and fairly.',
  },
];

const returnExclusions = [
  'Opened supplements or nutrition products, where hygiene or safety concerns apply.',
  'Customized or personalized items made specifically for the customer.',
  'Products clearly marked as final sale or non-returnable.',
  'Gift cards, digital goods, or any category specifically stated as exempt.',
];

const supportCards = [
  {
    title: 'Contact Support',
    value: 'fitgearzzz@gmail.com',
    sub: 'For returns, delays, delivery help, or refund questions.',
    href: 'mailto:fitgearzzz@gmail.com',
    icon: Headphones,
  },
  {
    title: 'Call Us',
    value: '+91 8668623252',
    sub: 'For direct support during business hours.',
    href: 'tel:+918668623252',
    icon: PhoneFallback,
  },
];

function PhoneFallback(props) {
  return <Headphones {...props} />;
}

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-18">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-5">
                Shipping & Returns
              </p>

              <h1
                className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight uppercase leading-none"
                data-testid="shipping-title"
              >
                Premium delivery confidence.
                <span className="block text-orange-500">Clear return protection.</span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-300 font-manrope max-w-2xl leading-relaxed">
                We want the experience after checkout to feel just as polished as the moment you decide to buy.
                This page explains how FitGearzzz handles shipping, delivery expectations, returns, and refunds with clarity.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  <Truck className="w-4 h-4 text-orange-500" />
                  Free shipping across India
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  <RefreshCcw className="w-4 h-4 text-orange-500" />
                  7-day return policy
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  <Clock3 className="w-4 h-4 text-orange-500" />
                  Refunds processed after inspection
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/75 backdrop-blur-sm p-6 lg:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-5">
                  Policy Snapshot
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">Free</p>
                    <p className="text-sm text-zinc-400">India shipping</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">7 Days</p>
                    <p className="text-sm text-zinc-400">Return window</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">24–48h</p>
                    <p className="text-sm text-zinc-400">Processing goal</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-2xl font-bold text-white mb-1">3–5 Days</p>
                    <p className="text-sm text-zinc-400">Refund processing</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    The goal of this page is simple: remove uncertainty and make post-purchase policies feel clear, trustworthy, and easy to understand.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promise cards */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {promiseCards.map((item, index) => {
              const Icon = item.icon;
              const accent =
                item.accent === 'blue'
                  ? 'border-blue-500/20 bg-blue-500/10 text-blue-400'
                  : 'border-orange-500/20 bg-orange-500/10 text-orange-400';

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[1.8rem] border border-zinc-800 bg-zinc-900 p-6"
                >
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="text-white text-2xl font-semibold mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shipping section */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-orange-500/20 to-transparent" />
            <div className="p-8 sm:p-10">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
                    Shipping Flow
                  </p>
                  <h2 className="font-oswald text-4xl sm:text-5xl uppercase leading-none mb-4">
                    How your order
                    <span className="block text-zinc-500">moves after checkout</span>
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Customers feel more confident when delivery is explained clearly. Here is how the shipping journey is structured at FitGearzzz.
                  </p>
                </div>

                <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
                  {shippingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 }}
                        className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-2xl border border-orange-500/20 bg-orange-500/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-orange-400" />
                          </div>
                          <span className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                          {step.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-5 h-5 text-orange-500" />
                    <h3 className="text-white text-xl font-semibold">Domestic Shipping (India)</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Free shipping is available on all orders across India.',
                      'Most domestic deliveries are expected within 3–7 business days after dispatch, depending on destination and courier movement.',
                      'Orders placed after 2:00 PM IST may move into the next working-day processing cycle.',
                      'Remote or courier-limited service areas may experience extended delivery timelines.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                        <span className="text-zinc-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe2 className="w-5 h-5 text-orange-500" />
                    <h3 className="text-white text-xl font-semibold">International Shipping</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'International shipping may be available to selected countries.',
                      'Shipping charges are calculated at checkout based on destination, serviceability, and package weight.',
                      'Estimated international delivery timeline can range between 7–21 business days.',
                      'Customs duties, taxes, or local import charges, where applicable, are the responsibility of the customer.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                        <span className="text-zinc-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 p-5">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                      Tracking & delays
                    </p>
                    <p className="text-zinc-300 leading-relaxed">
                      Once your order is dispatched, tracking information is shared by email. If your shipment appears delayed beyond the expected timeframe, contact us at{' '}
                      <a href="mailto:fitgearzzz@gmail.com" className="text-orange-400 hover:text-orange-300 font-semibold">
                        fitgearzzz@gmail.com
                      </a>{' '}
                      or call{' '}
                      <a href="tel:+918668623252" className="text-orange-400 hover:text-orange-300 font-semibold">
                        +91 8668623252
                      </a>{' '}
                      and we will help investigate the shipment status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Returns section */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-blue-500/20 to-transparent" />
            <div className="p-8 sm:p-10">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
                    Returns & Refunds
                  </p>
                  <h2 className="font-oswald text-4xl sm:text-5xl uppercase leading-none mb-4">
                    A return policy
                    <span className="block text-zinc-500">designed to reduce hesitation</span>
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Returns should not feel hidden, confusing, or stressful. The policy below is designed to make expectations easier to understand before and after purchase.
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 mb-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                      Plain-English Summary
                    </p>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      Most eligible items can be returned within 7 days of delivery. Returned products are reviewed after receipt, and approved refunds are processed to the original payment method within standard refund timelines.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-6">
                    {returnBlocks.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"
                      >
                        <h3 className="text-white text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <RefreshCcw className="w-5 h-5 text-orange-500" />
                        <h3 className="text-white text-xl font-semibold">How to start a return</h3>
                      </div>
                      <ol className="space-y-3">
                        {[
                          'Contact our support team with your order ID and the reason for your return request.',
                          'Our team reviews the request and confirms eligibility under the applicable return conditions.',
                          'If approved, we share the return instructions and next-step guidance.',
                          'After the return reaches us and is reviewed, the refund process is initiated where applicable.',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-full bg-orange-500/15 text-orange-400 text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">
                              •
                            </span>
                            <span className="text-zinc-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <h3 className="text-white text-xl font-semibold">Items not eligible</h3>
                      </div>
                      <ul className="space-y-3">
                        {returnExclusions.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <BadgeCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                            <span className="text-zinc-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 p-5">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                          Refund timeline
                        </p>
                        <p className="text-zinc-300 leading-relaxed">
                          After a returned item is received and approved, refunds are typically processed within{' '}
                          <span className="text-white font-semibold">3–5 business days</span>. Depending on your payment provider or bank, it may take an additional{' '}
                          <span className="text-white font-semibold">5–10 business days</span> for the amount to reflect in your account.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-5">
                    <p className="text-sm text-zinc-200 leading-relaxed">
                      If you receive a damaged, defective, or incorrect item, please contact us within{' '}
                      <span className="font-semibold text-white">48 hours of delivery</span> with clear photos of the product and packaging so we can review the issue quickly and help with a replacement or refund where applicable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support area */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-[2rem] border border-zinc-800 bg-gradient-to-r from-orange-500/10 via-zinc-900 to-zinc-900 p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-4">
                Need Help?
              </p>
              <h2 className="font-oswald text-4xl sm:text-5xl uppercase leading-none mb-4">
                Policy pages should answer questions.
                <span className="block text-zinc-500">Support should solve the rest.</span>
              </h2>
              <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl mb-8">
                If you need order-specific help, want clarity on a return, or have a delivery concern, our team is available to guide you with the right next steps.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold transition-colors"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/faq"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 font-semibold transition-colors"
                >
                  View FAQs
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
              <a
                href="mailto:fitgearzzz@gmail.com"
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors"
              >
                <Headphones className="w-6 h-6 text-orange-500 mb-4" />
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                  Support Email
                </p>
                <h3 className="text-white text-xl font-semibold mb-2 break-words">
                  fitgearzzz@gmail.com
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Best for shipping, returns, refund questions, and order-related concerns.
                </p>
              </a>

              <a
                href="tel:+918668623252"
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700 transition-colors"
              >
                <Headphones className="w-6 h-6 text-orange-500 mb-4" />
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                  Call Us
                </p>
                <h3 className="text-white text-xl font-semibold mb-2">
                  +91 8668623252
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Direct assistance during business hours for faster clarification.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingReturns;

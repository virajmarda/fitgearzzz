import React from 'react';
import {
  Truck,
  Package,
  RefreshCcw,
  Clock3,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-5">
              Shipping & Returns
            </p>

            <h1
              className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight uppercase"
              data-testid="shipping-title"
            >
              Clear shipping.
              <span className="block text-orange-500">Simple returns.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-manrope max-w-2xl leading-relaxed">
              We want the post-purchase experience to feel as confident as the moment you check out.
              These are the exact rules we operate by for delivery, returns, and refunds.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                <Truck className="w-4 h-4 text-orange-500" />
                Free pan‑India shipping
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                <RefreshCcw className="w-4 h-4 text-orange-500" />
                7‑day return window
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                <Clock3 className="w-4 h-4 text-orange-500" />
                Refunds in 3‑5 business days after inspection
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promise highlights */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-1">
                Free Shipping
              </h3>
              <p className="text-zinc-400 font-manrope text-sm">
                On all orders across India
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-1">
                Fast Processing
              </h3>
              <p className="text-zinc-400 font-manrope text-sm">
                Orders processed within 24–48 hrs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCcw className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-1">
                Easy Returns
              </h3>
              <p className="text-zinc-400 font-manrope text-sm">
                7‑day no‑questions‑asked window
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock3 className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-1">
                Quick Refunds
              </h3>
              <p className="text-zinc-400 font-manrope text-sm">
                Processed in 3–5 business days after approval
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Shipping information */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 lg:p-10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-3">
                  Shipping Information
                </p>
                <h2 className="font-oswald text-3xl sm:text-4xl font-bold uppercase text-white mb-2">
                  How your order moves
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Transparent delivery expectations
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 text-zinc-300 font-manrope">
              <div className="space-y-6">
                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    Domestic Shipping (India)
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>
                      <span className="font-semibold text-white">Free shipping</span> on all
                      orders across India.
                    </li>
                    <li>
                      Typical delivery time: <span className="font-semibold text-white">3–7 business days</span> after dispatch, depending on your pincode.
                    </li>
                    <li>
                      Remote or out‑of‑service areas may experience slightly longer timelines.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    Order Processing
                  </h3>
                  <p className="leading-relaxed">
                    Orders are processed Monday to Saturday (excluding public holidays). Orders
                    placed after 2:00 PM IST will be processed on the next working day. Once your
                    order is dispatched, you will receive a confirmation email with live tracking
                    details.
                  </p>
                </div>

                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    Order Tracking
                  </h3>
                  <p className="leading-relaxed">
                    As soon as your order ships, you will receive a tracking link via email.
                    You can also track your order any time from your FitGearzzz account under{' '}
                    <span className="font-semibold text-white">Orders</span>.
                  </p>
                  <Link
                    to="/track-order"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-orange-400 font-semibold hover:text-orange-300"
                  >
                    Track your order
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    International Shipping
                  </h3>
                  <div className="flex items-start gap-3 mb-2">
                    <Globe2 className="w-5 h-5 text-orange-500 mt-0.5" />
                    <p className="leading-relaxed">
                      International shipping is currently available to select countries.
                      Availability and rates will be shown at checkout based on your location.
                    </p>
                  </div>

                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Shipping rates are calculated at checkout based on destination and weight.</li>
                    <li>Estimated delivery timeframe: <span className="font-semibold text-white">7–21 business days</span>.</li>
                    <li>Any customs duties, import taxes, or additional local fees are the responsibility of the recipient.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 flex gap-3">
                  <Info className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    If your order appears delayed beyond the expected timeframe, please contact us at{' '}
                    <a
                      href="mailto:fitgearzzz@gmail.com"
                      className="text-orange-400 hover:text-orange-300 font-semibold"
                    >
                      fitgearzzz@gmail.com
                    </a>{' '}
                    or call{' '}
                    <a
                      href="tel:+918668623252"
                      className="text-orange-400 hover:text-orange-300 font-semibold"
                    >
                      +91 8668623252
                    </a>{' '}
                    and we will investigate with the courier partner.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Return policy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 lg:p-10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-3">
                  Return Policy
                </p>
                <h2 className="font-oswald text-3xl sm:text-4xl font-bold uppercase text-white mb-2">
                  7‑Day Money‑Back Guarantee
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-300">
                <RefreshCcw className="w-4 h-4 text-orange-500" />
                Hassle‑free, clear return steps
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 text-zinc-300 font-manrope">
              <div className="space-y-6">
                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    When you can return
                  </h3>
                  <p className="leading-relaxed mb-3">
                    We want you to be genuinely satisfied with your purchase. If something is not
                    right, you can return most items within{' '}
                    <span className="font-semibold text-white">7 days of delivery</span> for a
                    refund.
                  </p>
                  <p className="leading-relaxed">
                    Returns are accepted if:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4 mt-2">
                    <li>The item arrived damaged or defective.</li>
                    <li>The product is unused and in its original condition.</li>
                    <li>All original packaging, accessories, and tags are intact.</li>
                    <li>The return request is initiated within 7 days of delivery.</li>
                    <li>Valid proof of purchase (order ID / invoice) is provided.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    Non‑returnable items
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Opened supplements or nutrition products (for hygiene and safety reasons).</li>
                    <li>Customized or personalized products.</li>
                    <li>Items marked as <span className="font-semibold text-white">Final Sale</span> or clearance.</li>
                    <li>Digital products and gift cards.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    How to start a return
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside ml-4">
                    <li>
                      Contact our support team at{' '}
                      <a
                        href="mailto:fitgearzzz@gmail.com"
                        className="text-orange-400 hover:text-orange-300 font-semibold"
                      >
                        fitgearzzz@gmail.com
                      </a>{' '}
                      or call{' '}
                      <a
                        href="tel:+918668623252"
                        className="text-orange-400 hover:text-orange-300 font-semibold"
                      >
                        +91 8668623252
                      </a>
                      .
                    </li>
                    <li>Share your order number, product details, and reason for return.</li>
                    <li>Our team will review and confirm your eligibility.</li>
                    <li>
                      Once approved, you will receive return instructions and (where applicable)
                      a return shipping label.
                    </li>
                    <li>Pack the item securely and drop it at the specified courier location.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    Refunds & timelines
                  </h3>
                  <p className="leading-relaxed mb-2">
                    Once your return reaches us, our team inspects the item. After approval, we
                    initiate your refund within{' '}
                    <span className="font-semibold text-white">3–5 business days</span>.
                  </p>
                  <p className="leading-relaxed mb-2">
                    Refunds are credited back to your original method of payment. Depending on your
                    bank or payment provider, it may take an additional{' '}
                    <span className="font-semibold text-white">5–10 business days</span> for the
                    amount to reflect in your account.
                  </p>
                  <p className="leading-relaxed text-sm text-zinc-400">
                    Shipping fees (if any were charged) may be non‑refundable except in cases where
                    the item was damaged, defective, or incorrectly shipped by us.
                  </p>
                </div>

                <div>
                  <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">
                    Damaged or wrong items
                  </h3>
                  <p className="leading-relaxed">
                    If you receive a damaged, defective, or incorrect item, please contact us
                    within <span className="font-semibold text-white">48 hours</span> of delivery.
                    Include clear photos of the product, packaging, and shipping label so we can
                    resolve the issue quickly with a replacement or refund at no extra cost.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Help CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-[1.8rem] border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-zinc-900 to-zinc-900 px-6 sm:px-10 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h3 className="font-oswald text-2xl uppercase mb-2">
                Need clarity on a specific order?
              </h3>
              <p className="text-zinc-200 text-sm sm:text-base max-w-xl leading-relaxed">
                Share your order ID and question with us and we will respond with precise next
                steps — no generic responses, no guesswork.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold text-sm sm:text-base"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200/20 bg-zinc-950 text-zinc-100 px-5 py-3 text-sm sm:text-base font-semibold"
              >
                View FAQs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShippingReturns;

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Cookie,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const policyHighlights = [
  {
    title: 'Transparent Collection',
    desc: 'We only collect information needed to operate, support, and improve your shopping experience.',
    icon: Eye,
  },
  {
    title: 'Secure Handling',
    desc: 'We use appropriate safeguards to help protect your personal information and transactions.',
    icon: Lock,
  },
  {
    title: 'Your Control',
    desc: 'You can contact us to access, correct, or request deletion of your personal information.',
    icon: UserCheck,
  },
  {
    title: 'No Data Selling',
    desc: 'We do not sell your personal information to third parties.',
    icon: ShieldCheck,
  },
];

const quickLinks = [
  'Information we collect',
  'How we use your information',
  'Sharing and disclosures',
  'Cookies and tracking',
  'Your rights and choices',
  'Contact information',
];

const PrivacyPolicy = () => {
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
            className="grid lg:grid-cols-12 gap-10 items-end"
          >
            <div className="lg:col-span-7">
              <p className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-5">
                Privacy Policy
              </p>

              <h1
                className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight uppercase"
                data-testid="privacy-title"
              >
                Privacy with
                <span className="block text-orange-500">clarity and respect</span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-300 font-manrope max-w-2xl leading-relaxed">
                Your trust matters. This Privacy Policy explains what information we collect,
                why we collect it, how we use it, and the choices you have when using FitGearzzz.
              </p>

              <p className="text-zinc-500 font-manrope mt-6 text-sm">
                Last updated: May 2026
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/75 backdrop-blur-sm p-6 lg:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-5">
                  Quick Overview
                </p>

                <div className="space-y-3">
                  {quickLinks.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                    >
                      <span className="text-zinc-300 text-sm">{item}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {policyHighlights.map((item, index) => {
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
                  <h3 className="text-white text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy body */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                Policy Intent
              </p>
              <p className="text-zinc-400 leading-relaxed">
                We aim to explain our data practices in plain language so you can understand
                what information is collected, how it is used, and how you can manage your choices.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                Important Note
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                This page is intended to communicate FitGearzzz privacy practices clearly.
                You should still review it with a legal professional before publishing as your final production policy.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                Related Pages
              </p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 hover:border-zinc-700 transition-colors"
                >
                  <span className="text-zinc-300">Contact Us</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </Link>
                <Link
                  to="/shipping-returns"
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 hover:border-zinc-700 transition-colors"
                >
                  <span className="text-zinc-300">Shipping & Returns</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main sections */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 sm:p-10 space-y-10"
            >
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    1. Information We Collect
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>
                    We may collect personal information that you provide directly when you place
                    an order, create an account, contact support, subscribe to updates, or otherwise
                    interact with FitGearzzz.
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Name, email address, phone number, billing address, and shipping address.</li>
                    <li>Order details, purchase history, and basic customer service records.</li>
                    <li>Account details such as login credentials and saved preferences.</li>
                    <li>Communications you send to us through email, forms, or support channels.</li>
                    <li>Technical and usage information such as IP address, device/browser information, and on-site activity collected through cookies or analytics tools.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    2. How We Use Your Information
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>We use collected information to operate and improve the FitGearzzz experience.</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Process orders, payments, deliveries, returns, and refunds.</li>
                    <li>Send order confirmations, shipping updates, and service-related messages.</li>
                    <li>Respond to inquiries, support requests, and product-related questions.</li>
                    <li>Improve website performance, store experience, catalog quality, and customer service.</li>
                    <li>Send promotional or marketing communication where permitted or where you have opted in.</li>
                    <li>Prevent fraud, misuse, unauthorized access, and other security issues.</li>
                    <li>Comply with legal, tax, regulatory, or enforcement requirements.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    3. Sharing and Disclosures
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>
                    We do not sell your personal information. We may share information only where needed
                    to operate our business or comply with legal obligations.
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Payment processors that securely handle transactions.</li>
                    <li>Shipping, logistics, and fulfillment partners involved in delivering your order.</li>
                    <li>Service providers that support website analytics, communications, customer service, or infrastructure.</li>
                    <li>Legal, regulatory, or enforcement bodies when required by law or to protect our rights.</li>
                    <li>Professional advisers or business partners where necessary for legitimate business operations and only within appropriate limits.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    4. Data Security
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>
                    We use reasonable technical and organizational safeguards to help protect your
                    personal information from unauthorized access, misuse, alteration, or disclosure.
                  </p>
                  <p>
                    While we work to maintain appropriate security controls, no website, platform,
                    or internet transmission can be guaranteed to be completely secure.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    5. Your Rights and Choices
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>Depending on applicable law, you may have rights regarding your personal information.</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Request access to the personal information we hold about you.</li>
                    <li>Request correction of inaccurate or incomplete information.</li>
                    <li>Request deletion of your personal information, subject to legal and operational limitations.</li>
                    <li>Opt out of marketing emails by using the unsubscribe link or contacting us directly.</li>
                    <li>Ask questions about how your information is collected, used, or retained.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    6. Cookies and Tracking Technologies
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>
                    We may use cookies, pixels, analytics tools, and similar technologies to keep the site functioning,
                    understand usage trends, improve performance, and support marketing or personalization efforts.
                  </p>
                  <p>
                    You can manage cookie preferences through your browser settings. Please note that disabling certain
                    cookies may affect parts of the website experience.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    7. Children’s Privacy
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>
                    FitGearzzz is not intended for children, and we do not knowingly collect personal
                    information from children below the age required by applicable law.
                  </p>
                  <p>
                    If you believe that a child has submitted personal information to us, please contact
                    us so we can review and take appropriate action.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    8. Changes to This Policy
                  </h2>
                </div>
                <div className="text-zinc-300 space-y-4 leading-relaxed">
                  <p>
                    We may update this Privacy Policy from time to time to reflect operational,
                    legal, or regulatory changes.
                  </p>
                  <p>
                    When we make updates, we will revise the “Last updated” date on this page.
                    Continued use of the website after changes may indicate acceptance of the revised policy,
                    where permitted by law.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase">
                    9. Contact Us
                  </h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <a
                    href="mailto:fitgearzzz@gmail.com"
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-700 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-orange-500 mb-3" />
                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                      Email
                    </p>
                    <p className="text-white font-semibold break-words">
                      fitgearzzz@gmail.com
                    </p>
                  </a>

                  <a
                    href="tel:+918668623252"
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-700 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-orange-500 mb-3" />
                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                      Phone
                    </p>
                    <p className="text-white font-semibold">
                      +91 8668623252
                    </p>
                  </a>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <MapPin className="w-5 h-5 text-orange-500 mb-3" />
                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                      Location
                    </p>
                    <p className="text-white font-semibold">
                      Solapur, Maharashtra, India
                    </p>
                  </div>
                </div>

                <p className="text-zinc-400 leading-relaxed mt-5">
                  If you have questions about this Privacy Policy or how your information is handled,
                  please contact the FitGearzzz team using the details above.
                </p>
              </section>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

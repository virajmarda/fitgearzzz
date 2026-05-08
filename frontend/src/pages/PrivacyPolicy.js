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
  Info,
  BadgeCheck,
  FileText,
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

const privacySections = [
  {
    number: '01',
    icon: Database,
    title: 'Information We Collect',
    summary:
      'We collect only the information needed to process orders, support customers, operate accounts, improve the store experience, and keep the platform secure.',
    accent: 'orange',
    groups: [
      {
        heading: 'Information you provide directly',
        items: [
          'Name, email address, phone number, billing address, and shipping address.',
          'Account details such as login credentials, saved preferences, and profile information.',
          'Messages, questions, or support requests submitted through contact forms, email, or other communication channels.',
        ],
      },
      {
        heading: 'Transaction and order information',
        items: [
          'Products ordered, order history, payment-related references, return requests, and refund details.',
          'Basic customer service records associated with your purchases and account activity.',
        ],
      },
      {
        heading: 'Technical and usage information',
        items: [
          'IP address, browser type, device information, and approximate location information derived from technical signals.',
          'On-site activity such as pages viewed, session behavior, and interactions collected through cookies, analytics, or similar technologies.',
        ],
      },
    ],
    note:
      'In simple terms: if the information helps us fulfill your order, support your account, improve the website, or protect the platform, it may be collected in a limited and relevant way.',
  },
  {
    number: '02',
    icon: Eye,
    title: 'How We Use Your Information',
    summary:
      'We use your information to fulfill purchases, communicate important updates, improve services, protect the platform, and provide a better customer experience.',
    accent: 'blue',
    groups: [
      {
        heading: 'To operate the store',
        items: [
          'Process orders, confirm purchases, manage payments, coordinate shipping, and handle returns or refunds.',
          'Maintain customer accounts and support account-related functionality.',
        ],
      },
      {
        heading: 'To communicate with you',
        items: [
          'Send order confirmations, shipping updates, delivery-related notifications, and service messages.',
          'Respond to product questions, support requests, and other customer care inquiries.',
        ],
      },
      {
        heading: 'To improve and protect the experience',
        items: [
          'Analyze store usage, improve catalog quality, optimize design and functionality, and improve customer support systems.',
          'Detect fraud, prevent abuse, investigate suspicious activity, and maintain operational security.',
        ],
      },
      {
        heading: 'For marketing where permitted',
        items: [
          'Send promotional content, offers, or updates when you have opted in or where communication is otherwise permitted by applicable law.',
        ],
      },
    ],
    note:
      'We do not use customer information casually. Each use should support store operations, customer service, security, legal compliance, or responsible business improvement.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Sharing and Disclosures',
    summary:
      'We do not sell your personal information. We only share information where it is necessary to run the business, fulfill services, or comply with legal obligations.',
    accent: 'orange',
    groups: [
      {
        heading: 'Service providers and operational partners',
        items: [
          'Payment processors that securely handle transactions.',
          'Shipping, courier, fulfillment, and logistics providers involved in delivery or returns.',
          'Technology, communication, analytics, customer support, or infrastructure vendors who help us operate the business.',
        ],
      },
      {
        heading: 'Legal or protective disclosures',
        items: [
          'Authorities, regulators, courts, or law enforcement where disclosure is required by law or necessary to protect our rights, customers, or platform.',
        ],
      },
    ],
    note:
      'We share only what is reasonably required for the relevant business purpose and do not share information as a product for sale.',
  },
  {
    number: '04',
    icon: Lock,
    title: 'Data Security',
    summary:
      'We use reasonable technical and organizational safeguards to help protect your information from unauthorized access, misuse, or disclosure.',
    accent: 'blue',
    groups: [
      {
        heading: 'How we approach security',
        items: [
          'We work to maintain appropriate security controls for systems, account access, and operational handling of personal information.',
          'Sensitive transaction flows are handled through secure service providers and payment infrastructure where applicable.',
        ],
      },
      {
        heading: 'Important limitation',
        items: [
          'No website, online platform, or internet transmission can be guaranteed to be completely secure, so absolute security cannot be promised.',
        ],
      },
    ],
    note:
      'Security is an ongoing responsibility, not a one-time feature. We aim to use reasonable measures and trusted systems wherever appropriate.',
  },
  {
    number: '05',
    icon: UserCheck,
    title: 'Your Rights and Choices',
    summary:
      'Depending on applicable law, you may have rights to access, correct, delete, or manage certain uses of your personal information.',
    accent: 'orange',
    groups: [
      {
        heading: 'What you may request',
        items: [
          'Access to the personal information we hold about you.',
          'Correction of inaccurate or incomplete information.',
          'Deletion of personal information, subject to legal, fraud-prevention, tax, or operational limitations.',
          'Opt-out from marketing emails by using unsubscribe options or contacting us directly.',
        ],
      },
      {
        heading: 'How to exercise your choices',
        items: [
          'You can contact us using the details listed in the Contact section below and we will review your request in line with applicable legal and operational requirements.',
        ],
      },
    ],
    note:
      'Some requests may require identity verification and some information may need to be retained for compliance, fraud prevention, or order records.',
  },
  {
    number: '06',
    icon: Cookie,
    title: 'Cookies and Tracking Technologies',
    summary:
      'We may use cookies, pixels, analytics tools, and similar technologies to support website functionality, understand usage, and improve performance or marketing relevance.',
    accent: 'blue',
    groups: [
      {
        heading: 'Why these technologies are used',
        items: [
          'To keep parts of the site functioning correctly.',
          'To understand visitor behavior and improve user experience.',
          'To measure site performance, content engagement, and campaign effectiveness.',
        ],
      },
      {
        heading: 'Your choices',
        items: [
          'You can manage certain cookie settings through your browser preferences or device settings.',
          'Disabling some technologies may affect how parts of the website function.',
        ],
      },
    ],
    note:
      'These tools help us understand what is working, what needs improvement, and how to provide a smoother store experience.',
  },
  {
    number: '07',
    icon: ShieldCheck,
    title: 'Children’s Privacy',
    summary:
      'FitGearzzz is not intended for children, and we do not knowingly collect personal information from children where prohibited by applicable law.',
    accent: 'orange',
    groups: [
      {
        heading: 'Our position',
        items: [
          'The website and services are intended for a general audience and not directed to children.',
          'If you believe a child has submitted personal information to us, please contact us so we can review and take appropriate action.',
        ],
      },
    ],
    note:
      'If a valid concern is raised, we will review the matter and respond appropriately.',
  },
  {
    number: '08',
    icon: FileText,
    title: 'Changes to This Policy',
    summary:
      'We may update this Privacy Policy from time to time to reflect changes in operations, technology, legal requirements, or business practices.',
    accent: 'blue',
    groups: [
      {
        heading: 'How updates are handled',
        items: [
          'When changes are made, we will revise the “Last updated” date on this page.',
          'Continued use of the website after policy updates may indicate acceptance of the revised policy where permitted by law.',
        ],
      },
    ],
    note:
      'We encourage users to review this page periodically to stay informed about how information is handled.',
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
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

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8">
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

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="space-y-6"
            >
              {privacySections.map((section, index) => {
                const Icon = section.icon;
                const accentClasses =
                  section.accent === 'blue'
                    ? {
                        soft: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                        line: 'from-blue-500/20 to-transparent',
                        badge: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
                      }
                    : {
                        soft: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
                        line: 'from-orange-500/20 to-transparent',
                        badge: 'text-orange-400 border-orange-500/20 bg-orange-500/10',
                      };

                return (
                  <motion.section
                    key={section.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[2rem] border border-zinc-800 bg-zinc-900 overflow-hidden"
                  >
                    <div className={`h-px w-full bg-gradient-to-r ${accentClasses.line}`} />

                    <div className="p-8 sm:p-10">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${accentClasses.soft}`}>
                            <Icon className="w-6 h-6" />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold ${accentClasses.badge}`}>
                                Section {section.number}
                              </span>
                            </div>

                            <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-white uppercase leading-none">
                              {section.title}
                            </h2>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 mb-6">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                          Plain-English Summary
                        </p>
                        <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                          {section.summary}
                        </p>
                      </div>

                      <div className="space-y-5">
                        {section.groups.map((group) => (
                          <div
                            key={group.heading}
                            className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5"
                          >
                            <h3 className="text-white text-lg font-semibold mb-3">
                              {group.heading}
                            </h3>
                            <ul className="space-y-3">
                              {group.items.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <BadgeCheck className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                  <span className="text-zinc-300 leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 p-5">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                              Why this matters
                            </p>
                            <p className="text-zinc-300 leading-relaxed">
                              {section.note}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                );
              })}

              <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="h-px w-full bg-gradient-to-r from-orange-500/20 to-transparent" />
                <div className="p-8 sm:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl border border-orange-500/20 bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold text-orange-400 mb-3">
                        Section 09
                      </span>
                      <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-white uppercase leading-none">
                        Contact Us
                      </h2>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 mb-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                      Plain-English Summary
                    </p>
                    <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                      If you have questions about this Privacy Policy or how your information is handled,
                      you can contact the FitGearzzz team directly using the details below.
                    </p>
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

                  <div className="mt-6 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 p-5">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-2">
                          Final note
                        </p>
                        <p className="text-zinc-300 leading-relaxed">
                          This page is designed to communicate FitGearzzz privacy practices clearly,
                          but for live legal deployment it should be reviewed and finalized by a qualified legal professional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

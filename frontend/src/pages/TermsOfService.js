import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  Truck,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  Scale,
  Mail,
} from 'lucide-react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    icon: FileText,
    content: [
      'By accessing, browsing, or purchasing from FitGearzzz, you agree to be bound by these Terms of Service, along with our Privacy Policy, Shipping Policy, Return Policy, and any other policies published on this website.',
      'If you do not agree with any part of these terms, please do not use our website or services.',
    ],
  },
  {
    title: '2. Eligibility and Use of Website',
    icon: ShieldCheck,
    content: [
      'You agree to use this website only for lawful purposes and in a way that does not violate any applicable laws, regulations, or the rights of others.',
      'You must not misuse the website, attempt unauthorized access, interfere with security, distribute malicious code, scrape content without permission, or engage in fraudulent or abusive activity.',
    ],
  },
  {
    title: '3. Product Information and Availability',
    icon: FileText,
    content: [
      'We aim to ensure that product descriptions, images, pricing, specifications, and availability are presented as accurately as possible. However, minor errors, delays in updates, or variations in display may occur.',
      'FitGearzzz reserves the right to correct any errors, update information, modify product listings, or discontinue products at any time without prior notice.',
    ],
  },
  {
    title: '4. Orders and Acceptance',
    icon: CreditCard,
    content: [
      'Placing an order on our website does not guarantee acceptance. All orders are subject to verification, product availability, and payment confirmation.',
      'We reserve the right to refuse, limit, or cancel any order at our sole discretion, including in cases involving suspected fraud, pricing errors, duplicate transactions, operational issues, or misuse of promotional offers.',
    ],
  },
  {
    title: '5. Pricing and Payments',
    icon: CreditCard,
    content: [
      'All prices shown on FitGearzzz are displayed in the applicable currency listed on the website unless otherwise stated. Prices may change at any time without prior notice.',
      'You agree to provide current, complete, and accurate billing and payment information for all purchases. Orders may be processed only after successful payment authorization or confirmation, depending on the payment method selected.',
    ],
  },
  {
    title: '6. Shipping and Delivery',
    icon: Truck,
    content: [
      'Shipping timelines displayed on the website are estimates and may vary depending on product type, location, courier operations, public holidays, weather conditions, or other operational factors.',
      'FitGearzzz is not liable for delays caused by third-party logistics providers, force majeure events, or circumstances outside our reasonable control. Delivery timelines should not be treated as guaranteed unless explicitly stated.',
    ],
  },
  {
    title: '7. Returns, Refunds, and Cancellations',
    icon: RotateCcw,
    content: [
      'Returns, cancellations, exchanges, and refunds are governed by our separate Return and Refund Policy. Please review that policy carefully before placing an order.',
      'Refund eligibility, approval timelines, non-returnable items, and cancellation terms may vary depending on the product category, order stage, and condition of the returned item.',
    ],
  },
  {
    title: '8. Accounts and User Responsibility',
    icon: ShieldCheck,
    content: [
      'If you create an account on FitGearzzz, you are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account.',
      'You agree to notify us promptly if you suspect unauthorized access, fraudulent use, or any security breach related to your account.',
    ],
  },
  {
    title: '9. Intellectual Property',
    icon: FileText,
    content: [
      'All website content, including but not limited to logos, product copy, graphics, branding elements, layouts, icons, text, images, videos, and design assets, is owned by or licensed to FitGearzzz and is protected by applicable intellectual property laws.',
      'You may not reproduce, republish, copy, distribute, modify, reverse engineer, or commercially exploit any part of this website without prior written permission from us.',
    ],
  },
  {
    title: '10. Promotions and Discount Offers',
    icon: CreditCard,
    content: [
      'From time to time, FitGearzzz may offer discount codes, limited-time promotions, launch offers, or bundled deals. Such offers are subject to their own specific terms and may be withdrawn or modified at any time.',
      'Promotional offers cannot be combined unless explicitly stated, may be limited by product category, and may be cancelled in cases of misuse, abuse, or technical error.',
    ],
  },
  {
    title: '11. Third-Party Services',
    icon: AlertTriangle,
    content: [
      'Our website may use or link to third-party platforms, payment gateways, logistics services, communication tools, or social media integrations. We are not responsible for the independent policies, performance, or content of third-party services.',
      'Your use of those services may also be governed by their respective terms and privacy policies.',
    ],
  },
  {
    title: '12. Disclaimer of Warranties',
    icon: AlertTriangle,
    content: [
      'This website and all products and services made available through it are provided on an “as is” and “as available” basis, to the fullest extent permitted by law.',
      'FitGearzzz does not guarantee uninterrupted access, error-free operation, or that the website will always be free from technical issues, inaccuracies, or service interruptions.',
    ],
  },
  {
    title: '13. Limitation of Liability',
    icon: Scale,
    content: [
      'To the maximum extent permitted by applicable law, FitGearzzz shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website, products, or services.',
      'Our total liability, where legally applicable, shall not exceed the amount paid by you for the relevant order giving rise to the claim.',
    ],
  },
  {
    title: '14. Indemnification',
    icon: ShieldCheck,
    content: [
      'You agree to indemnify, defend, and hold harmless FitGearzzz, its owners, affiliates, team members, partners, and service providers from any claims, liabilities, losses, damages, or expenses arising from your misuse of the website, breach of these terms, or violation of applicable law.',
    ],
  },
  {
    title: '15. Governing Law and Jurisdiction',
    icon: Scale,
    content: [
      'These Terms of Service shall be governed by and interpreted in accordance with the laws of India.',
      'Any disputes arising in connection with these terms, the website, or any transaction with FitGearzzz shall be subject to the jurisdiction of the appropriate courts in India, unless otherwise required by applicable law.',
    ],
  },
  {
    title: '16. Changes to These Terms',
    icon: FileText,
    content: [
      'We may update, modify, or replace these Terms of Service at any time to reflect operational, legal, or business changes. Updated terms will be posted on this page with the revised effective date.',
      'Your continued use of the website after such changes constitutes acceptance of the updated Terms of Service.',
    ],
  },
  {
    title: '17. Contact Information',
    icon: Mail,
    content: [
      'For questions regarding these Terms of Service, order-related policy matters, or legal concerns, please contact us using the official support details listed on our Contact page or store support channels.',
      'You should replace the placeholder below with your actual business email, phone number, and registered business or operational address before publishing this page.',
    ],
  },
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 mb-5">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-manrope text-orange-300 tracking-wide uppercase">
              Legal Information
            </span>
          </div>

          <h1
            className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-5 tracking-tight uppercase leading-none"
            data-testid="terms-title"
          >
            Terms of Service
          </h1>

          <p className="text-lg text-zinc-300 font-manrope max-w-3xl leading-relaxed mb-4">
            These terms govern your access to and use of FitGearzzz, including browsing the website,
            placing orders, creating accounts, and interacting with any products, services, or support channels we provide.
          </p>

          <p className="text-sm text-zinc-500 font-manrope">
            Last updated: May 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm overflow-hidden shadow-2xl"
        >
          <div className="border-b border-zinc-800 px-6 sm:px-8 py-6 bg-gradient-to-r from-zinc-900 via-zinc-900 to-orange-500/5">
            <h2 className="font-oswald text-2xl sm:text-3xl text-white uppercase mb-2">
              Please Read Carefully
            </h2>
            <p className="text-zinc-400 font-manrope leading-relaxed max-w-3xl">
              This page is designed to give customers clear, readable terms in plain language.
              You should still customize it to match your exact operations, payment methods, returns workflow, and legal business details before publishing.
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-2xl border border-orange-500/20 bg-orange-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-oswald text-2xl font-bold text-white mb-4 uppercase leading-snug">
                        {section.title}
                      </h3>

                      <div className="space-y-3 text-zinc-300 font-manrope leading-relaxed">
                        {section.content.map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.section>
              );
            })}

            <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6 sm:p-7">
              <h3 className="font-oswald text-2xl text-white uppercase mb-3">
                Replace Before Publishing
              </h3>
              <div className="text-zinc-200 font-manrope leading-relaxed space-y-2">
                <p>Email: support@fitgearzzz.com</p>
                <p>Phone: +91 XXXXXXXXXX</p>
                <p>Address: Your official business / operational address</p>
                <p>Jurisdiction: Replace with your actual legal and operational setup if needed</p>
                <p>Returns / refunds: Ensure this page matches your live Return Policy exactly</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;

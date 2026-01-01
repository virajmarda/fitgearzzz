import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight uppercase" data-testid="privacy-title">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 font-manrope mb-8">Last updated: December 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 shadow-lg space-y-8"
        >
          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">1. Information We Collect</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through our payment processor)</li>
                <li>Order history and product preferences</li>
                <li>Communication preferences and customer support interactions</li>
                <li>Account credentials and profile information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">2. How We Use Your Information</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">3. Information Sharing</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service providers who assist in our operations (shipping, payment processing, etc.)</li>
                <li>Law enforcement when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">4. Data Security</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">5. Your Rights</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">6. Cookies and Tracking</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">7. Children's Privacy</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">8. Changes to This Policy</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">9. Contact Us</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-orange-500">
                Email: privacy@fitgear.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Fitness Street, Gym City, CA 90210
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

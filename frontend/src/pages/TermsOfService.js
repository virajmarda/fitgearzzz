import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight uppercase" data-testid="terms-title">
            Terms of Service
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
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">1. Acceptance of Terms</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                By accessing and using FitGear's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">2. Use of Services</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>You agree to use our services only for lawful purposes. You must not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services to harm others or disrupt operations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">3. Account Registration</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                To access certain features, you may need to create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">4. Orders and Payments</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Prices are subject to change without notice. Payment must be received before order processing.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">5. Shipping and Delivery</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We aim to ship orders within 1-3 business days. Delivery times vary by location. Risk of loss passes to you upon delivery to the carrier. We are not responsible for delays caused by carriers or customs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">6. Returns and Refunds</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We accept returns within 30 days of delivery for most products. Items must be unused and in original packaging. Refunds will be processed within 5-10 business days of receiving the return. Some items may be non-returnable. See our Shipping & Returns page for details.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">7. Intellectual Property</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of FitGear or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">8. Disclaimers and Limitations</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                Our services are provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service. To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">9. Indemnification</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                You agree to indemnify and hold FitGear harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">10. Governing Law</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                These terms are governed by the laws of California, United States, without regard to conflict of law principles. Any disputes will be resolved in the courts of California.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">11. Changes to Terms</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">12. Contact Information</h2>
            <div className="text-zinc-300 font-manrope space-y-3 leading-relaxed">
              <p>
                For questions about these Terms of Service, contact us at:
              </p>
              <p className="text-orange-500">
                Email: legal@fitgear.com<br />
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

export default TermsOfService;

import React from 'react';
import { Truck, Package, RefreshCcw, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ShippingReturns = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight uppercase" data-testid="shipping-title">
            Shipping & Returns
          </h1>
          <p className="text-xl text-zinc-400 font-manrope mb-12 leading-relaxed">
            Fast shipping and hassle-free returns
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Free Shipping</h3>
            <p className="text-zinc-400 font-manrope text-sm">On orders over $100</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Fast Processing</h3>
            <p className="text-zinc-400 font-manrope text-sm">Ships within 1-3 days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCcw className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Easy Returns</h3>
            <p className="text-zinc-400 font-manrope text-sm">30-day return policy</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Quick Refunds</h3>
            <p className="text-zinc-400 font-manrope text-sm">5-10 business days</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card rounded-3xl p-8 mb-8 shadow-lg"
        >
          <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase">Shipping Information</h2>
          
          <div className="space-y-6 text-zinc-300 font-manrope">
            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Domestic Shipping (United States)</h3>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li><strong>Standard Shipping:</strong> $4.99 (5-7 business days)</li>
                <li><strong>Express Shipping:</strong> $9.99 (2-3 business days)</li>
                <li><strong>Overnight Shipping:</strong> $19.99 (1 business day)</li>
                <li><strong>Free Shipping:</strong> Available on all orders over $100</li>
              </ul>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">International Shipping</h3>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Available to select countries</li>
                <li>Rates calculated at checkout based on destination and weight</li>
                <li>Delivery time: 7-21 business days</li>
                <li>Customs fees and import duties are the responsibility of the recipient</li>
              </ul>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Order Processing</h3>
              <p>
                Orders are processed Monday through Friday (excluding holidays). Orders placed after 2 PM PST will be processed the next business day. You will receive a confirmation email with tracking information once your order ships.
              </p>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Order Tracking</h3>
              <p>
                Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card rounded-3xl p-8 shadow-lg"
        >
          <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase">Return Policy</h2>
          
          <div className="space-y-6 text-zinc-300 font-manrope">
            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">30-Day Money-Back Guarantee</h3>
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return most items within 30 days of delivery for a full refund.
              </p>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Return Requirements</h3>
              <p>To be eligible for a return:</p>
              <ul className="space-y-2 list-disc list-inside ml-4 mt-2">
                <li>Items must be unused and in original condition</li>
                <li>Items must be in original packaging with all tags attached</li>
                <li>Return must be initiated within 30 days of delivery</li>
                <li>Proof of purchase is required</li>
              </ul>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Non-Returnable Items</h3>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Opened supplements and nutrition products (for health and safety reasons)</li>
                <li>Customized or personalized items</li>
                <li>Sale or clearance items marked as final sale</li>
                <li>Gift cards</li>
              </ul>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">How to Return</h3>
              <ol className="space-y-2 list-decimal list-inside ml-4">
                <li>Contact our customer service team at support@fitgear.com or call +1 (555) 123-4567</li>
                <li>Provide your order number and reason for return</li>
                <li>We'll send you a prepaid return shipping label</li>
                <li>Pack the item securely in original packaging</li>
                <li>Attach the return label and drop off at any authorized carrier location</li>
              </ol>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Refund Processing</h3>
              <p>
                Once we receive your return, we'll inspect it and process your refund within 3-5 business days. The refund will be issued to your original payment method and may take an additional 5-10 business days to appear in your account.
              </p>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Exchanges</h3>
              <p>
                We currently don't offer direct exchanges. If you need a different size or color, please return your original item and place a new order.
              </p>
            </div>

            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Damaged or Defective Items</h3>
              <p>
                If you receive a damaged or defective item, please contact us within 48 hours of delivery. We'll arrange for a replacement or full refund at no additional cost to you. Please include photos of the damage when contacting us.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingReturns;

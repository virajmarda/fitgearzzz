import React, { useState } from 'react';
import { ChevronDown, ShoppingBag, Truck, CreditCard, Package, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    {
      name: 'Orders & Payment',
      icon: ShoppingBag,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and various digital wallets. All payments are processed securely through industry-standard encryption.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 1 hour of placing it by contacting our customer service. After processing begins, we cannot modify orders, but you can use our return policy once you receive the items.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Currently, we accept full payment at checkout. However, some payment providers like PayPal offer their own payment plan options that you can use during checkout.'
        },
        {
          question: 'How do I apply a discount code?',
          answer: 'Enter your discount code at checkout in the "Discount Code" field and click "Apply". The discount will be reflected in your order total before you complete the purchase.'
        }
      ]
    },
    {
      name: 'Shipping & Delivery',
      icon: Truck,
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Overnight shipping delivers within 1 business day. International shipping varies by location (7-21 business days).'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to select countries worldwide. Shipping costs and delivery times vary by destination. International customers are responsible for any customs fees or import duties.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can also log into your account and view tracking information in your order history.'
        },
        {
          question: 'What if my package is lost or damaged?',
          answer: 'Contact us immediately if your package is lost or arrives damaged. We\'ll work with the carrier to resolve the issue and ensure you receive a replacement or full refund.'
        }
      ]
    },
    {
      name: 'Returns & Refunds',
      icon: Package,
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy on most items. Products must be unused, in original condition, and in original packaging. Some items like opened supplements are non-returnable for health and safety reasons.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Contact our customer service team with your order number and reason for return. We\'ll provide you with a prepaid return shipping label and instructions.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 3-5 business days after we receive and inspect your return. It may take an additional 5-10 business days for the refund to appear in your account.'
        },
        {
          question: 'Can I exchange an item?',
          answer: 'We don\'t offer direct exchanges. Please return your original item for a refund and place a new order for the item you want.'
        }
      ]
    },
    {
      name: 'Products',
      icon: CreditCard,
      faqs: [
        {
          question: 'Are your products authentic?',
          answer: 'Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and distributors. We guarantee the quality and authenticity of every item we sell.'
        },
        {
          question: 'Do you offer product warranties?',
          answer: 'Many of our products come with manufacturer warranties. Specific warranty information is available on individual product pages or by contacting customer service.'
        },
        {
          question: 'Can I see the product before buying?',
          answer: 'While we can\'t offer in-person viewing, we provide detailed product descriptions, multiple high-quality images, and customer reviews to help you make an informed decision.'
        },
        {
          question: 'How do I know what size to order?',
          answer: 'Each apparel product page includes a detailed size chart. We recommend measuring yourself and comparing to our charts. If you\'re between sizes, we typically recommend sizing up.'
        }
      ]
    },
    {
      name: 'Account & Support',
      icon: HelpCircle,
      faqs: [
        {
          question: 'Do I need an account to place an order?',
          answer: 'While you can checkout as a guest, creating an account allows you to track orders, save addresses, view order history, and enjoy faster checkout in the future.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Login" and then "Forgot Password". Enter your email address and we\'ll send you instructions to reset your password.'
        },
        {
          question: 'How can I contact customer service?',
          answer: 'You can reach us via email at support@fitgear.com, call us at +1 (555) 123-4567 (Mon-Fri 9am-6pm PST), or use our contact form. We typically respond within 24 hours.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent. See our Privacy Policy for details.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight uppercase" data-testid="faq-title">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-zinc-400 font-manrope mb-12 leading-relaxed">
            Find answers to common questions about our products and services
          </p>
        </motion.div>

        <div className="space-y-8">
          {categories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="font-oswald text-2xl font-bold text-white uppercase">{category.name}</h2>
                </div>

                <div className="glass-card rounded-3xl overflow-hidden shadow-lg">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={faqIndex}
                        className="border-b border-zinc-800/50 last:border-b-0"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full text-left p-6 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
                          data-testid={`faq-question-${globalIndex}`}
                        >
                          <span className="font-manrope font-semibold text-white pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform duration-200 ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-zinc-300 font-manrope leading-relaxed" data-testid={`faq-answer-${globalIndex}`}>
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-card rounded-3xl p-8 mt-12 text-center shadow-lg"
        >
          <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">Still Have Questions?</h2>
          <p className="text-zinc-300 font-manrope mb-6">
            Our customer support team is here to help you with any questions or concerns.
          </p>
          <a href="/contact">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full px-8 py-3 transition-colors">
              Contact Support
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

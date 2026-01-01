import React from 'react';
import { Target, Award, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight uppercase" data-testid="about-title">
            About FitGear
          </h1>
          <p className="text-xl text-zinc-400 font-manrope mb-12 leading-relaxed">
            Your trusted partner in fitness excellence since 2020
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 mb-12 shadow-lg"
        >
          <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase">Our Story</h2>
          <div className="space-y-4 text-zinc-300 font-manrope leading-relaxed">
            <p>
              FitGear was born from a simple belief: everyone deserves access to premium fitness equipment that helps them achieve their goals. Founded by fitness enthusiasts who were tired of overpriced, low-quality gear, we set out to change the industry.
            </p>
            <p>
              What started as a small garage operation has grown into a trusted brand serving thousands of customers worldwide. We've built our reputation on three core principles: quality, affordability, and exceptional customer service.
            </p>
            <p>
              Today, FitGear offers a comprehensive range of fitness equipment, supplements, and apparel, all carefully selected and tested by our team of fitness professionals. We partner with leading manufacturers to bring you products that deliver results without breaking the bank.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Our Mission</h3>
            <p className="text-zinc-400 font-manrope text-sm">
              Empower everyone to reach their fitness potential with quality equipment at fair prices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Quality First</h3>
            <p className="text-zinc-400 font-manrope text-sm">
              Every product tested and approved by certified fitness professionals
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-zinc-400 font-manrope text-sm">
              Join 50,000+ satisfied customers on their fitness journey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card rounded-3xl p-6 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Customer Care</h3>
            <p className="text-zinc-400 font-manrope text-sm">
              Dedicated support team ready to help you succeed
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card rounded-3xl p-8 shadow-lg"
        >
          <h2 className="font-oswald text-3xl font-bold text-white mb-6 uppercase">Why Choose FitGear?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Premium Quality</h3>
              <p className="text-zinc-300 font-manrope">
                We source from the best manufacturers and rigorously test every product to ensure it meets our high standards.
              </p>
            </div>
            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Expert Guidance</h3>
              <p className="text-zinc-300 font-manrope">
                Our team includes certified trainers and nutritionists who curate our selection and provide expert advice.
              </p>
            </div>
            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Fast Shipping</h3>
              <p className="text-zinc-300 font-manrope">
                Free shipping on orders over $100 and fast delivery to get you training sooner.
              </p>
            </div>
            <div>
              <h3 className="font-oswald text-xl font-semibold text-orange-500 mb-3">Satisfaction Guarantee</h3>
              <p className="text-zinc-300 font-manrope">
                30-day return policy on all products. If you're not satisfied, neither are we.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

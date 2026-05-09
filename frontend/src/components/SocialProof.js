import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Users, Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Raj Sharma',
    role: 'Fitness Enthusiast',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Best fitness equipment I\'ve ever purchased! Quality is exceptional and delivery was super fast.'
  },
  {
    name: 'Priya Patel',
    role: 'Yoga Instructor',
    image: 'https://i.pravatar.cc/150?img=25',
    rating: 5,
    text: 'Authentic products at great prices. The customer service team is incredibly helpful!'
  },
  {
    name: 'Arjun Mehta',
    role: 'Gym Owner',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    text: 'Equipped my entire gym from FitGearzzz. Professional quality, amazing deals!'
  }
];

const SocialProof = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-zinc-950 to-zinc-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-orange-500 font-semibold text-sm uppercase tracking-wider mb-3">
              Trusted by Thousands
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">50,000+</div>
            <div className="text-zinc-400">Happy Customers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-zinc-400">Average Rating</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">15,000+</div>
            <div className="text-zinc-400">5-Star Reviews</div>
          </motion.div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12">
                    <Quote className="w-12 h-12 text-orange-500 mb-6" />
                    <p className="text-xl lg:text-2xl text-zinc-300 leading-relaxed mb-8">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-orange-500"
                      />
                      <div>
                        <div className="font-bold text-white text-lg">{testimonial.name}</div>
                        <div className="text-zinc-400 text-sm">{testimonial.role}</div>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'bg-orange-500 w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

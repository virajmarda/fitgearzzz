import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Raj Sharma',
    role: 'Fitness Enthusiast',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Best fitness equipment I\'ve ever purchased! Quality is exceptional and delivery was super fast.',
    location: 'Mumbai'
  },
  {
    name: 'Priya Patel',
    role: 'Yoga Instructor',
    image: 'https://i.pravatar.cc/150?img=25',
    rating: 5,
    text: 'Authentic products at great prices. The customer service team is incredibly helpful!',
    location: 'Bangalore'
  },
  {
    name: 'Arjun Mehta',
    role: 'Gym Owner',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    text: 'Equipped my entire gym from FitGearzzz. Professional quality at unbeatable prices.',
    location: 'Delhi'
  },
];

const SocialProof = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            <span>TRUSTED BY THOUSANDS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-zinc-400">
            Real reviews from real athletes who trust FitGearzzz
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 lg:p-12 border border-zinc-700/50 shadow-2xl"
              >
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-orange-500 mb-6" />
                
                {/* Testimonial Text */}
                <p className="text-xl lg:text-2xl text-zinc-100 mb-8 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover"
                  />
                  <div>
                    <div className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-zinc-400 text-sm">
                      {testimonials[currentIndex].role} · {testimonials[currentIndex].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-orange-500'
                        : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section - Now integrated within SocialProof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <div className="text-center p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 rounded-2xl border border-zinc-700/30 backdrop-blur-sm">
            <div className="text-5xl font-bold text-white mb-2">50,000+</div>
            <div className="text-zinc-400 text-lg">Happy Customers</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 rounded-2xl border border-zinc-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-5xl font-bold text-white">4.9</div>
              <Star className="w-8 h-8 text-orange-400 fill-orange-400" />
            </div>
            <div className="text-zinc-400 text-lg">Average Rating</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 rounded-2xl border border-zinc-700/30 backdrop-blur-sm">
            <div className="text-5xl font-bold text-white mb-2">15,000+</div>
            <div className="text-zinc-400 text-lg">5-Star Reviews</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;

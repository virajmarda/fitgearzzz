import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Pill, Shirt, Watch, Sparkles } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Gym Equipment',
    description: 'Professional-grade equipment',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&fit=crop',
    link: '/products?category=gym-equipment',
    products: '150+',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 2,
    name: 'Supplements',
    description: 'Premium nutrition for peak performance',
    icon: Pill,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=2071&fit=crop',
    link: '/products?category=supplements',
    products: '80+',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 3,
    name: 'Apparel',
    description: 'Performance wear',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1556906781-9cba4a6bc3c3?q=80&w=2787&fit=crop',
    link: '/products?category=apparel',
    products: '200+',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 4,
    name: 'Accessories',
    description: 'Essential gear',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&fit=crop',
    link: '/products?category=accessories',
    products: '120+',
    color: 'from-amber-500 to-orange-600',
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>SHOP BY CATEGORY</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
            Find Your Perfect Gear
          </h2>
          <p className="text-xl text-zinc-600">
            Explore our curated collection of premium fitness products
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={category.link}
                  className="group relative block h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${category.image}')` }}
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    {/* Icon Badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Product Count Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium">
                        {category.products} Products
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        {category.name}
                      </h3>
                      <p className="text-zinc-300 text-sm">
                        {category.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 inline-flex items-center gap-2 text-white font-semibold">
                      <span>Shop Now</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Hover Border Glow */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500`} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

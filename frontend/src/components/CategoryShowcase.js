import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Pill, Shirt, Watch } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Gym Equipment',
    description: 'Professional-grade equipment for serious training',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop',
    gradient: 'from-orange-600 to-red-600',
    link: '/products?category=gym-equipment',
    products: '150+'
  },
  {
    id: 2,
    name: 'Supplements',
    description: 'Premium nutrition for peak performance',
    icon: Pill,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&h=800&fit=crop',
    gradient: 'from-green-600 to-teal-600',
    link: '/products?category=supplements',
    products: '80+'
  },
  {
    id: 3,
    name: 'Apparel',
    description: 'Performance wear for every workout',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1556906781-9cba4a26fb96?w=600&h=800&fit=crop',
    gradient: 'from-blue-600 to-purple-600',
    link: '/products?category=apparel',
    products: '200+'
  },
  {
    id: 4,
    name: 'Accessories',
    description: 'Essential gear for your fitness journey',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1611032374111-7f0aa53acca6?w=600&h=800&fit=crop',
    gradient: 'from-pink-600 to-rose-600',
    link: '/products?category=accessories',
    products: '120+'
  }
];

const CategoryShowcase = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-orange-500 font-semibold text-sm uppercase tracking-wider mb-3">
              Shop by Category
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
              Find Your Perfect Gear
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Explore our curated collection of premium fitness products
            </p>
          </motion.div>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Link to={category.link}>
                  <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 h-[400px] cursor-pointer">
                    {/* Background Image with Parallax Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-6">
                      {/* Top: Icon & Product Count */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
                          {category.products} Products
                        </span>
                      </div>

                      {/* Bottom: Title & Description */}
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white">
                          {category.name}
                        </h3>
                        <p className="text-zinc-200 text-sm leading-relaxed">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                          <span>Shop Now</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
                  </div>
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

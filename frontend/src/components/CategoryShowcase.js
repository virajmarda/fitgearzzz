import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// TODO: Replace these with your own CDN assets when ready
const CATEGORIES = [
  {
    name: 'Gym Equipment',
    sub: 'Barbells, dumbbells, racks & more',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&fit=crop',
    to: '/products?category=Gym%20Equipment',
  },
  {
    name: 'Supplements',
    sub: 'Protein, pre-workout & recovery',
    image:
      'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=2071&fit=crop',
    to: '/products?category=Supplements',
  },
  {
    name: 'Apparel',
    sub: 'Training wear built for movement',
    image:
      'https://images.unsplash.com/photo-1556906781-9cba4a6bc3c3?q=80&w=2787&fit=crop',
    to: '/products?category=Apparel',
  },
  {
    name: 'Accessories',
    sub: 'Straps, belts, grips & essentials',
    image:
      'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&fit=crop',
    to: '/products?category=Accessories',
  },
];

const CategoryShowcase = () => (
  <section className="bg-zinc-950 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            Shop by category
          </p>
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
            Find gear for every goal
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-md">
            Start with the category that matches your trainingwhether its building a home
            gym, recovering better, or upgrading your daily apparel.
          </p>
        </div>
        <Link
          to="/catalog"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-orange-500 transition-colors"
        >
          View full catalog
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIES.map(({ name, sub, image, to }) => (
          <Link
            key={name}
            to={to}
            className="group relative block rounded-xl overflow-hidden bg-zinc-800 aspect-[3/4] border border-zinc-800 hover:border-zinc-600 transition-colors"
          >
            {/* Image */}
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-oswald font-bold text-lg uppercase leading-tight mb-0.5">
                {name}
              </p>
              <p className="text-zinc-300 text-xs leading-snug mb-3">{sub}</p>
              <span className="inline-flex items-center gap-1 text-orange-400 text-xs font-semibold uppercase tracking-wide">
                Shop {name}
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryShowcase;

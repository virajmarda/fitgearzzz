import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Replace placeholder Unsplash images with brand photography before launch.
const CATEGORIES = [
  {
    name: 'Gym Equipment',
    sub: 'Barbells, dumbbells, racks, benches',
    note: 'Free delivery on orders ₹999+',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&fit=crop',
    to: '/products?category=Gym%20Equipment',
  },
  {
    name: 'Supplements',
    sub: 'Protein, creatine, pre-workout',
    note: 'Lab-tested, authentic brands',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=2071&fit=crop',
    to: '/products?category=Supplements',
  },
  {
    name: 'Apparel',
    sub: 'Dry-fit, compression, everyday training',
    note: 'Ships same day',
    image: 'https://images.unsplash.com/photo-1556906781-9cba4a6bc3c3?q=80&w=2787&fit=crop',
    to: '/products?category=Apparel',
  },
  {
    name: 'Accessories',
    sub: 'Straps, belts, gloves, grips',
    note: 'COD available',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&fit=crop',
    to: '/products?category=Accessories',
  },
];

const CategoryShowcase = () => (
  <section className="bg-zinc-950 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="block w-5 h-px bg-orange-500" />
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
              Browse by category
            </p>
          </div>
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
            What are you training for?
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1.5 max-w-sm">
            Four categories. Every one of them sourced, inspected, and delivered pan-India.
          </p>
        </div>
        <Link
          to="/products"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-orange-500 transition-colors"
        >
          See all
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIES.map(({ name, sub, note, image, to }) => (
          <Link
            key={name}
            to={to}
            className="group relative block overflow-hidden bg-zinc-900 aspect-[3/4] rounded-sm border border-zinc-800 hover:border-zinc-600 transition-colors"
          >
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            {/* Bottom-up vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            {/* Category info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-oswald font-bold text-lg uppercase leading-tight mb-0.5">
                {name}
              </p>
              <p className="text-zinc-400 text-xs leading-snug mb-2.5">{sub}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-600 uppercase tracking-wide">{note}</span>
                <span className="inline-flex items-center gap-1 text-orange-400 text-xs font-semibold uppercase tracking-wide">
                  Browse
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryShowcase;

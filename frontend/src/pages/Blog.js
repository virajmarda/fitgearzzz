import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Clock3,
  BookOpen,
  TrendingUp,
  Flame,
  Sparkles,
  Tag,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const categories = [
  'All',
  'Training',
  'Nutrition',
  'Recovery',
  'Gear Guides',
  'Weight Loss',
  'Lifestyle',
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(102,126,234,0.12),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-6"
              >
                FitGear Blog
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-bold leading-[1.1] mb-8"
              >
                Fitness Insights &<br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Expert Guidance
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-zinc-400 max-w-2xl leading-relaxed"
              >
                Evidence-based articles on training, nutrition, and recovery to help you achieve your fitness goals.
              </motion.p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mt-20">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="flex items-center gap-3 mb-12">
            <Flame className="text-orange-500" size={28} />
            <h2 className="text-3xl font-bold">Featured Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-10">
                  <span className="inline-block px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm font-semibold mb-5">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <span className="flex items-center gap-2 text-sm text-zinc-500">
                      <Clock3 size={16} /> {post.readTime}
                    </span>
                    <span className="text-sm text-zinc-500">{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="flex items-center gap-3 mb-12">
          <BookOpen className="text-zinc-400" size={28} />
          <h2 className="text-3xl font-bold">All Articles</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-zinc-700 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-semibold mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-5 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-zinc-500 pt-4 border-t border-zinc-800">
                  <span className="flex items-center gap-1">
                    <Clock3 size={14} /> {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl text-zinc-500">No articles found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-pink-500/10 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <Sparkles className="mx-auto text-orange-500 mb-8" size={48} />
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
            Get the latest fitness tips and articles delivered to your inbox weekly.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Subscribe <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;

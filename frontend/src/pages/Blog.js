import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Clock3,
  BookOpen,
  Flame,
  Sparkles,
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm uppercase tracking-[0.22em] text-orange-400 mb-6 font-semibold"
              >
                Stay Updated
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Fitness <span className="text-orange-500">Tips & Articles</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl text-zinc-400 max-w-2xl mb-8"
              >
                Expert advice on training, nutrition, and gear to help you reach your fitness goals.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative max-w-2xl"
              >
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </motion.div>
            </div>

            {/* Stats */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <BookOpen className="mx-auto text-orange-500 mb-3" size={28} />
                  <div className="text-3xl font-bold mb-1">{blogPosts.length}+</div>
                  <div className="text-sm text-zinc-500">Articles</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <Flame className="mx-auto text-orange-500 mb-3" size={28} />
                  <div className="text-3xl font-bold mb-1">{categories.length - 1}</div>
                  <div className="text-sm text-zinc-500">Categories</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <Clock3 className="mx-auto text-orange-500 mb-3" size={28} />
                  <div className="text-3xl font-bold mb-1">2x</div>
                  <div className="text-sm text-zinc-500">Weekly</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === 'All' && featuredPosts.length > 0 && (
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-orange-500" size={24} />
              <h2 className="text-2xl font-bold">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-orange-500 transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                      <span className="text-zinc-500 text-sm">{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-orange-500 font-semibold">
                      Read Article
                      <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-orange-500 transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className="text-zinc-500 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-orange-500 font-semibold text-sm">
                      Read More
                      <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-zinc-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden">
            <div className="relative max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 py-20 text-center">
              <Sparkles className="mx-auto text-orange-500 mb-8" size={40} />
              <h2 className="text-4xl font-bold mb-6 uppercase tracking-[0.12em]">Stay Updated</h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                Get the latest fitness tips and articles delivered to your inbox weekly.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold transition-colors flex items-center justify-center"
                >
                  Subscribe <ChevronRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

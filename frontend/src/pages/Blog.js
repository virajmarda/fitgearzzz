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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-5"
              >
                Blog
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="font-oswald text-5xl sm:text-6xl lg:text-7xl leading-none uppercase tracking-tight mb-6"
              >
                Fitness knowledge,
                <span className="block text-orange-500">gear guides, and better habits</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed"
              >
                Explore practical articles on training, nutrition, recovery, product buying guides, and everyday fitness decisions that actually matter.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-4">
                  Explore Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500 hover:text-white transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="relative mt-5">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full rounded-full border border-zinc-700 bg-zinc-950 text-white placeholder-zinc-500 pl-11 pr-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-orange-400 font-semibold mb-3">
                Featured Reads
              </p>
              <h2 className="font-oswald text-4xl uppercase">Start with the essentials</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-zinc-400 text-sm">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Editorial picks for high-intent readers
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mb-4">
                      <span className="inline-flex items-center gap-2 text-orange-400">
                        <Flame className="w-4 h-4" />
                        Featured
                      </span>
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-zinc-400 text-sm">
                Showing <span className="text-white font-semibold">{regularPosts.length}</span> articles
              </div>
              <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-sm">
                <BookOpen className="w-4 h-4" />
                Editorial archive
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {regularPosts.length > 0 ? (
                regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="group rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="aspect-[16/11] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-500 font-semibold mb-4">
                          <span className="text-orange-400">{post.category}</span>
                          <span>{post.date}</span>
                        </div>

                        <h3 className="text-white text-xl font-semibold leading-snug mb-3">
                          {post.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed mb-5">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                            <Clock3 className="w-4 h-4" />
                            {post.readTime}
                          </span>
                          <div className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                            Read More
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))
              ) : (
                <div className="md:col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                  <Sparkles className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    No matching articles found
                  </h3>
                  <p className="text-zinc-400 max-w-xl mx-auto mb-6">
                    Try another keyword or switch to a different category to explore more content from the FitGearzzz editorial archive.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-4">
                Popular Topics
              </p>
              <div className="space-y-3">
                {['Home Workouts', 'Fat Loss', 'Protein Basics', 'Recovery Gear', 'Strength Training'].map((topic) => (
                  <button
                    key={topic}
                    className="w-full flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-left hover:border-orange-500/40 hover:bg-zinc-800 transition-colors"
                  >
                    <span className="text-zinc-300">{topic}</span>
                    <Tag className="w-4 h-4 text-zinc-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-orange-500/10 to-zinc-900 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-orange-400 font-semibold mb-4">
                Newsletter
              </p>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Get fitness insights in your inbox
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-5">
                Subscribe for product guides, new article drops, smarter buying advice, and practical fitness content.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-zinc-700 bg-zinc-950 text-white placeholder-zinc-500 px-4 py-3 focus:outline-none focus:border-orange-500"
                />
                <button className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-4">
                Why This Blog Exists
              </p>
              <p className="text-zinc-400 leading-relaxed">
                The FitGearzzz blog is built to help customers make smarter fitness decisions — from choosing gear and supplements to building routines that last.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Blog;

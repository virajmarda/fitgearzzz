import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPostBySlug, getRelatedPosts } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-xl text-zinc-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-lg text-zinc-300 leading-relaxed mb-6">
            {contentItem.text}
          </p>
        );
      case 'heading':
        return (
          <h2 key={index} className="text-3xl font-bold text-white mt-12 mb-6 leading-tight">
            {contentItem.text}
          </h2>
        );
      case 'list':
        return (
          <ul key={index} className="space-y-3 mb-8 ml-6">
            {contentItem.items.map((item, idx) => (
              <li key={idx} className="text-lg text-zinc-300 leading-relaxed relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold before:text-xl">
                {item}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-semibold mb-6">
              {post.category}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-400">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-video rounded-3xl overflow-hidden border border-zinc-800"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {/* Excerpt */}
              <div className="mb-12 pb-12 border-b border-zinc-800">
                <p className="text-2xl text-zinc-300 leading-relaxed font-light italic">
                  {post.excerpt}
                </p>
              </div>

              {/* Article Body */}
              <div className="prose prose-invert prose-lg max-w-none">
                {post.content.map((item, index) => renderContent(item, index))}
              </div>

              {/* Tags */}
              <div className="mt-16 pt-12 border-t border-zinc-800">
                <p className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-4">
                  Tags
                </p>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300 hover:border-orange-500/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-8 rounded-3xl border border-zinc-800 bg-zinc-900">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                      About the Author
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3">{post.author}</h3>
                    <p className="text-zinc-400 leading-relaxed">{post.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="mt-12 flex items-center justify-between p-6 rounded-3xl border border-zinc-800 bg-zinc-900">
                <div>
                  <p className="text-lg font-semibold text-white mb-1">Found this helpful?</p>
                  <p className="text-zinc-400">Share it with your fitness community</p>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold transition-colors"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                  <p className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-4">
                    In This Article
                  </p>
                  <ul className="space-y-3">
                    {post.content
                      .filter((item) => item.type === 'heading')
                      .map((heading, idx) => (
                        <li key={idx}>
                          <a
                            href={`#${heading.text.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-zinc-300 hover:text-orange-400 transition-colors block py-1"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-orange-500/10 to-zinc-900 p-6">
                  <p className="text-sm uppercase tracking-wider text-orange-400 font-semibold mb-3">
                    Newsletter
                  </p>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Get More Content
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    Subscribe for weekly fitness tips and gear guides.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-full border border-zinc-700 bg-zinc-950 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 mb-3"
                  />
                  <button className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-sm transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-zinc-900 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-orange-500 transition-colors"
                >
                  <div className="aspect-[16/11] overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-semibold mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white leading-snug mb-2 group-hover:text-orange-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Clock size={14} />
                      {relatedPost.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;

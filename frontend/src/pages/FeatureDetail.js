import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeatureBySlug, getRelatedFeatures, getAdjacentFeatures } from '../data/features';

// Feature detail page: /features/:slug
// Premium editorial article view. Typography-first, content-heavy.
// Clean reading experience with adjacent navigation and related features.

const FeatureDetail = () => {
  const { slug } = useParams();
  const feature = getFeatureBySlug(slug);
  const relatedFeatures = feature ? getRelatedFeatures(slug, feature.category, 3) : [];
  const { prev, next } = feature ? getAdjacentFeatures(slug) : { prev: null, next: null };

  useEffect(() => {
    if (feature) {
      window.scrollTo(0, 0);
      document.title = `${feature.title} — Features — FitGearzzz`;
    }
  }, [feature]);

  // 404 handling for invalid slugs
  if (!feature) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-oswald text-4xl font-bold uppercase text-white mb-4">
            Feature not found
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            This feature doesn’t exist or has been removed.
          </p>
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm uppercase tracking-[0.2em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All features
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero section with full-bleed image */}
      <section className="relative h-[60vh] sm:h-[70vh] bg-zinc-950">
        <img
          src={feature.heroImage}
          alt={feature.heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Back link */}
        <Link
          to="/features"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Features
        </Link>

        {/* Title and meta overlaid on hero */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 sm:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Meta row */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.28em] text-orange-400 font-semibold">
                {feature.kicker}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                {feature.issue}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-tight text-white mb-5">
              {feature.title}
            </h1>

            {/* Secondary meta */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/50">
              <span>{feature.location}</span>
              <span>·</span>
              <span>{feature.readTime}</span>
              <span>·</span>
              <span>{feature.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-black py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excerpt/deck */}
          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mb-12 pb-12 border-b border-zinc-900">
            {feature.excerpt}
          </p>

          {/* Pull quote */}
          {feature.pullQuote && (
            <blockquote className="my-14 py-8 px-6 border-l-2 border-orange-500 bg-zinc-950/50">
              <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed italic mb-4">
                “{feature.pullQuote}”
              </p>
              {feature.pullQuoteBy && (
                <cite className="text-zinc-600 text-xs uppercase tracking-[0.2em] not-italic">
                  — {feature.pullQuoteBy}
                </cite>
              )}
            </blockquote>
          )}

          {/* Body content */}
          <div className="space-y-6">
            {feature.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={index}
                    className="font-oswald text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-tight text-white mt-12 mb-6"
                  >
                    {block.body}
                  </h2>
                );
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                    {block.body}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </article>

      {/* Author/category footer */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.2em] text-zinc-600">
            <span>
              <span className="text-zinc-700">Category:</span>{' '}
              <span className="text-zinc-500">{feature.category}</span>
            </span>
            <span>·</span>
            <span>
              <span className="text-zinc-700">By:</span>{' '}
              <span className="text-zinc-500">{feature.author}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Prev/Next navigation */}
      {(prev || next) && (
        <section className="bg-black border-b border-zinc-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous */}
            {prev ? (
              <Link
                to={`/features/${prev.slug}`}
                className="group p-6 border border-zinc-900 rounded-sm hover:border-zinc-800 hover:bg-zinc-950 transition-all"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-3">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous
                </div>
                <h3 className="font-oswald text-lg font-bold uppercase leading-tight text-white group-hover:text-orange-400 transition-colors">
                  {prev.title}
                </h3>
              </Link>
            ) : (
              <div className="p-6 border border-zinc-900/40 rounded-sm">
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-800">
                  No previous feature
                </div>
              </div>
            )}

            {/* Next */}
            {next ? (
              <Link
                to={`/features/${next.slug}`}
                className="group p-6 border border-zinc-900 rounded-sm hover:border-zinc-800 hover:bg-zinc-950 transition-all text-right"
              >
                <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.25em] text-zinc-600 mb-3">
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-oswald text-lg font-bold uppercase leading-tight text-white group-hover:text-orange-400 transition-colors">
                  {next.title}
                </h3>
              </Link>
            ) : (
              <div className="p-6 border border-zinc-900/40 rounded-sm text-right">
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-800">
                  No next feature
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related features */}
      {relatedFeatures.length > 0 && (
        <section className="bg-black py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-oswald text-2xl font-bold uppercase text-white mb-8">
              Related Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedFeatures.map((related) => (
                <Link
                  key={related.id}
                  to={`/features/${related.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-zinc-900 mb-4">
                    <img
                      src={related.heroImage}
                      alt={related.heroAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-2">
                    <span className="text-orange-500">{related.kicker}</span>
                  </div>
                  <h3 className="font-oswald text-lg font-bold uppercase leading-tight text-white group-hover:text-orange-400 transition-colors mb-2">
                    {related.title}
                  </h3>
                  <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-zinc-950 border-t border-zinc-900 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            View all features
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FeatureDetail;

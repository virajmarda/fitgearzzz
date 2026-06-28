import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight } from 'lucide-react';
import { stories } from '../data/storiesData';

// Editorial home-page spotlight that links into the Stories index.
// Restrained, magazine-style. No glow, no excessive gradients.

const BrandStorySpotlight = () => {
  const feature = stories[0];

  return (
    <section className="bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image — cinematic frame */}
          <Link
            to={`/stories/${feature.slug}`}
            className="lg:col-span-7 group relative block overflow-hidden rounded-sm aspect-[16/10] bg-zinc-900"
            aria-label={`Watch the story: ${feature.title}`}
          >
            <img
              src={feature.heroImage}
              alt={feature.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/15 to-transparent" />

            {/* Play badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/25 group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors">
                <Play className="w-8 h-8 text-white translate-x-0.5" strokeWidth={1.5} />
                <span className="absolute -inset-2 rounded-full border border-white/15 group-hover:border-orange-500/40 transition-colors" />
              </span>
            </div>

            {/* Bottom strip */}
            <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between text-white">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/70 mb-2">
                  The FitGearzzz Quarterly · Vol. 01
                </p>
                <p className="font-oswald text-xl sm:text-2xl uppercase tracking-tight leading-tight max-w-md">
                  {feature.title}
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] text-white/70">
                {feature.location} · {feature.year}
              </span>
            </div>
          </Link>

          {/* Copy */}
          <div className="lg:col-span-5">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.28em] mb-5">
              Watch the story
            </p>
            <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-[0.98] tracking-tight text-white mb-6">
              Every product on this site has a story behind it.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-md">
              From the forge in Ludhiana to the 3 a.m. customer who taught us what
              service really means — five long-form pieces about the people, the
              craft, and the standards behind FitGearzzz.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm uppercase tracking-[0.18em] px-6 py-3.5 rounded-full transition-colors"
              >
                <Play className="w-4 h-4" />
                Watch the story
              </Link>
              <Link
                to={`/stories/${feature.slug}`}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/60 text-white font-semibold text-sm uppercase tracking-[0.18em] px-6 py-3.5 rounded-full transition-colors"
              >
                Read this one
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 divide-x divide-zinc-800 border-y border-zinc-800">
              {stories.slice(0, 3).map((s, i) => (
                <Link
                  key={s.id}
                  to={`/stories/${s.slug}`}
                  className="py-5 px-4 first:pl-0 last:pr-0 group/inner"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
                    No. 0{i + 1}
                  </p>
                  <p className="text-white text-sm font-semibold leading-snug group-hover/inner:text-orange-400 transition-colors line-clamp-2">
                    {s.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySpotlight;

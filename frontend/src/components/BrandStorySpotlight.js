import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { stories } from '../data/storiesData';

// Brand editorial spotlight — links to the Stories index.
// Magazine-weight layout. Dark, spare, authored. Not decorated.

const BrandStorySpotlight = () => {
  const feature = stories[0];
  const supporting = stories.slice(1, 4);

  return (
    <section className="bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        {/* Section label */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <span className="block w-6 h-px bg-orange-500" />
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.28em]">
              From the brand
            </p>
          </div>
          <Link
            to="/stories"
            className="hidden sm:inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors"
          >
            All features <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">

          {/* Feature image — full weight, no play button theatre */}
          <Link
            to={`/stories/${feature.slug}`}
            className="lg:col-span-7 group relative block overflow-hidden rounded-sm aspect-[16/10] bg-zinc-900"
            aria-label={`Read: ${feature.title}`}
          >
            <img
              src={feature.heroImage}
              alt={feature.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
            {/* Controlled vignette — reads bottom-up */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Caption strip */}
            <div className="absolute left-5 right-5 bottom-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 font-mono">
                {feature.category} &nbsp;&middot;&nbsp; {feature.location} &nbsp;&middot;&nbsp; {feature.readTime}
              </p>
              <p className="font-oswald text-xl sm:text-2xl uppercase tracking-tight leading-tight text-white max-w-md">
                {feature.title}
              </p>
            </div>
          </Link>

          {/* Editorial copy — authored voice, no slogans */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-oswald text-3xl sm:text-4xl lg:text-[2.75rem] font-bold uppercase leading-[1.0] tracking-tight text-white mb-5">
                The gear has a<br />
                <span className="text-orange-500">paper trail.</span>
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-3 max-w-sm">
                Every item we stock has been sourced, questioned, and cleared before it reaches a customer. That process — who makes it, where, at what standard — is what these features are about.
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-sm">
                Not marketing. Not testimonials. Reported pieces on the decisions behind the catalog.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="mt-8">
              <Link
                to={`/stories/${feature.slug}`}
                className="inline-flex items-center gap-2.5 bg-white text-zinc-900 hover:bg-orange-500 hover:text-white font-semibold text-sm uppercase tracking-[0.16em] px-6 py-3.5 rounded-sm transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4" />
                Open this feature
              </Link>
            </div>

            {/* Supporting story index */}
            <div className="mt-10 border-t border-zinc-800 pt-8 grid grid-cols-1 gap-px bg-zinc-800">
              {supporting.map((s, i) => (
                <Link
                  key={s.id}
                  to={`/stories/${s.slug}`}
                  className="bg-zinc-950 py-4 flex items-start justify-between gap-4 group/row hover:bg-zinc-900 transition-colors px-1"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] font-mono text-zinc-600 mt-0.5 shrink-0 pt-px">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium leading-snug group-hover/row:text-orange-400 transition-colors line-clamp-1">
                        {s.title}
                      </p>
                      <p className="text-zinc-600 text-xs mt-0.5">
                        {s.category} &nbsp;&middot;&nbsp; {s.readTime}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover/row:text-orange-500 transition-colors shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>

            <Link
              to="/stories"
              className="mt-6 inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors sm:hidden"
            >
              All features <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySpotlight;

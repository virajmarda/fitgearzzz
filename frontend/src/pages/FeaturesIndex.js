import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { features } from '../data/features';

// Features listing page: /features
// Premium editorial index. Dark, minimal, confident.
// Not a blog grid. This is a magazine contents page.

const FeaturesIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Features — FitGearzzz';
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero section */}
      <section className="bg-zinc-950 border-b border-zinc-900 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-orange-500" />
            <p className="text-orange-500 text-[10px] font-semibold uppercase tracking-[0.3em]">
              Editorial
            </p>
          </div>
          <h1 className="font-oswald text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase leading-[0.95] tracking-tight text-white mb-6">
            Features
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-2">
            How we source, what we reject, and why certain decisions matter more than others.
          </p>
          <p className="text-zinc-600 text-sm leading-relaxed max-w-2xl">
            Reported pieces on the mechanics of running a deliberate commerce brand.
          </p>
        </div>
      </section>

      {/* Feature listing */}
      <section className="bg-black py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-px bg-zinc-900">
            {features.map((feature, index) => (
              <Link
                key={feature.id}
                to={`/features/${feature.slug}`}
                className="bg-black hover:bg-zinc-950 transition-colors group block"
              >
                <article className="p-6 sm:p-8 lg:p-10">
                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
                    {/* Index number */}
                    <div className="lg:col-span-1 flex items-start">
                      <span className="font-mono text-xs text-zinc-700 group-hover:text-orange-500 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Hero image */}
                    <div className="lg:col-span-5">
                      <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-zinc-900">
                        <img
                          src={feature.heroImage}
                          alt={feature.heroAlt}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] uppercase tracking-[0.25em] text-orange-500 font-semibold">
                            {feature.kicker}
                          </span>
                          <span className="text-zinc-700">·</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                            {feature.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-oswald text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-tight text-white mb-3 group-hover:text-orange-400 transition-colors">
                          {feature.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                          {feature.excerpt}
                        </p>
                      </div>

                      {/* Footer meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                          <span>{feature.location}</span>
                          <span>·</span>
                          <span>{feature.date}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-orange-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-zinc-950 border-t border-zinc-900 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-600 text-sm mb-6">
            New features published monthly
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors group"
          >
            Browse the catalog
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FeaturesIndex;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { features } from '../data/features';

const BrandStorySpotlight = () => {
  const feature = features[0];
  const supporting = features.slice(1, 4);

  return (
    <section className="border-y border-zinc-900 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="block h-px w-6 bg-orange-500" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
              Field Report
            </p>
          </div>

          <Link
            to="/features"
            className="hidden items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-white sm:inline-flex"
          >
            All features
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <Link
            to={`/features/${feature.slug}`}
            className="group relative overflow-hidden rounded-[2rem] border border-zinc-900 lg:col-span-7"
            aria-label={`Open feature: ${feature.title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
            <img
              src={feature.heroImage}
              alt={feature.heroAlt}
              className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[520px]"
            />

            <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-zinc-300">
                <span>{feature.kicker}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-500" />
                <span>{feature.issue}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-500" />
                <span>{feature.readTime}</span>
              </div>

              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                {feature.title}
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
                {feature.excerpt}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                Open this feature
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="mb-8 max-w-md">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                <BookOpen className="h-3.5 w-3.5" />
                FitGearzzz Features
              </div>

              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                Reporting from the warehouse floor, the sourcing trail, and the rooms where people actually train.
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
                Not trend content. Not recycled motivation. These are the stories behind the standards, products, and decisions that shape FitGearzzz.
              </p>
            </div>

            <div className="space-y-4">
              {supporting.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/features/${item.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70"
                >
                  <div className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                    RPT.{String(index + 2).padStart(2, '0')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      <span>{item.category}</span>
                      <span className="h-1 w-1 rounded-full bg-zinc-700" />
                      <span>{item.readTime}</span>
                    </div>

                    <h4 className="text-lg font-medium tracking-[-0.02em] text-white transition-colors group-hover:text-orange-400">
                      {item.title}
                    </h4>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
                      {item.excerpt}
                    </p>
                  </div>

                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              ))}
            </div>

            <Link
              to="/features"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white sm:hidden"
            >
              Browse all features
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySpotlight;

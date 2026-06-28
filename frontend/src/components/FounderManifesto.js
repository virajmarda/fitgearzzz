import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Founder note — short editorial strip with a portrait and a signature.
const FounderManifesto = () => (
  <section className="bg-zinc-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-zinc-900">
            <img
              src="https://images.unsplash.com/photo-1709315957145-a4bad1feef28?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
              alt="Aniket Joshi, Founder of FitGearzzz, in the workshop"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="font-oswald text-xl uppercase tracking-tight leading-tight">
                  Aniket Joshi
                </p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/70 mt-1">
                  Founder · Pune
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                Photographed 2025
              </span>
            </div>
          </div>
        </div>

        {/* Letter */}
        <div className="lg:col-span-7">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.32em] mb-6">
            A note from the founder
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-[0.98] tracking-tight text-white mb-8 max-w-2xl">
            We didn’t set out to launch a brand. We set out to fix the gear we owned.
          </h2>
          <div className="space-y-5 text-zinc-300 text-lg leading-relaxed max-w-xl">
            <p>
              Six years ago, every piece of fitness equipment in my house was made
              somewhere I couldn’t pronounce and serviced somewhere I couldn’t reach.
              FitGearzzz started as a list of forty-one complaints in a notebook.
            </p>
            <p>
              Today, every product on this site has been built, tested and approved by
              someone who trains on it themselves. We do not chase trends. We do not
              ship a product to meet a sale date. The catalogue moves slowly on
              purpose.
            </p>
            <p className="text-zinc-400">
              If something we shipped is not right, write to me directly. The address
              below reaches my inbox before anyone else’s.
            </p>
          </div>

          {/* Signature row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <div>
              <p className="font-oswald text-2xl text-white tracking-tight leading-none">
                A. Joshi
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 mt-2">
                aniket@fitgearzzz.com
              </p>
            </div>
            <Link
              to="/stories/built-in-the-heat"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-semibold uppercase tracking-[0.22em] transition-colors"
            >
              Read the founder story
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FounderManifesto;

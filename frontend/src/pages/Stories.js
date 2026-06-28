import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, ChevronRight } from 'lucide-react';
import { stories } from '../data/storiesData';

// Editorial listing of brand stories. No motion library noise, no AI-feel gradients —
// the rhythm and typography do the work.

const Stories = () => {
  const [feature, ...rest] = stories;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Editorial header */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.32em] mb-6">
                The FitGearzzz Quarterly · Vol. 01
              </p>
              <h1 className="font-oswald text-[clamp(2.6rem,5.4vw,4.8rem)] font-bold leading-[0.95] tracking-tight uppercase text-white">
                Five stories from
                <br />
                inside the brand.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-zinc-400 text-base leading-relaxed">
                Long-form pieces about how this company was built — the forge, the founder,
                the customers and the rules that keep us honest. Each story is written once,
                edited carefully, and laid out the way the subject deserves.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-zinc-500">
                <span>{stories.length} stories</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>Updated quarterly</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>No paid placements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured story — cinematic */}
      <section className="border-b border-zinc-900">
        <Link
          to={`/stories/${feature.slug}`}
          className="group block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
        >
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative overflow-hidden rounded-sm aspect-[16/10] bg-zinc-900">
              <img
                src={feature.heroImage}
                alt={feature.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                <Play className="w-3 h-3" /> Featured story
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.24em] text-zinc-300">
                {feature.location} · {feature.year}
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.28em] mb-5">
                {feature.category} · {feature.readTime}
              </p>
              <h2 className="font-oswald text-3xl sm:text-5xl font-bold leading-[0.98] tracking-tight uppercase text-white mb-5">
                {feature.title}
              </h2>
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-lg">
                {feature.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-orange-400 group-hover:text-orange-300 transition-colors text-sm font-semibold uppercase tracking-[0.18em]">
                Read the story
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* The rest of the issue */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.28em] mb-3">
                Also in this issue
              </p>
              <h3 className="font-oswald text-3xl sm:text-4xl uppercase tracking-tight text-white">
                Four more long reads.
              </h3>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 hover:text-orange-400 transition-colors"
            >
              Shop the catalogue <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
            {rest.map((story, i) => (
              <Link
                key={story.id}
                to={`/stories/${story.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-zinc-900 mb-6">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 text-[10px] font-mono text-white/70 tracking-[0.22em]">
                    NO. 0{i + 2}
                  </div>
                </div>
                <p className="text-orange-500 text-[11px] font-semibold uppercase tracking-[0.28em] mb-3">
                  {story.category} · {story.readTime}
                </p>
                <h4 className="font-oswald text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-tight text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {story.title}
                </h4>
                <p className="text-zinc-400 leading-relaxed text-base mb-4">
                  {story.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300 group-hover:text-orange-400 transition-colors">
                  Continue reading
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial colophon */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500 mb-4">
            Colophon
          </p>
          <p className="text-zinc-400 leading-relaxed text-base">
            Stories are reported and written in-house. Photography is captured on location.
            No press release was used in the making of this issue. If you have a story you
            think we should tell next,{' '}
            <Link to="/contact" className="text-orange-400 hover:text-orange-300 underline-offset-4 hover:underline">
              write to the editor
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Stories;

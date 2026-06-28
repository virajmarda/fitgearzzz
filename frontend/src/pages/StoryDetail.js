import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen, Quote } from 'lucide-react';
import { getStoryBySlug, getOtherStories } from '../data/storiesData';

// ---------- Variant layouts ----------

const Eyebrow = ({ story }) => (
  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
    <span className="text-orange-500">{story.category}</span>
    <span className="w-1 h-1 rounded-full bg-zinc-700" />
    <span>{story.location}</span>
    <span className="w-1 h-1 rounded-full bg-zinc-700" />
    <span>{story.year}</span>
    <span className="w-1 h-1 rounded-full bg-zinc-700" />
    <span>{story.readTime}</span>
  </div>
);

const FactStrip = ({ facts }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
    {facts.map((f) => (
      <div key={f.label} className="bg-zinc-950 px-6 py-7 text-center">
        <p className="font-oswald text-3xl sm:text-4xl text-orange-500 leading-none mb-2">
          {f.value}
        </p>
        <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">{f.label}</p>
      </div>
    ))}
  </div>
);

// 1) Cinematic — full-bleed hero, chapters, pull quote
const CinematicLayout = ({ story }) => (
  <>
    <section className="relative h-[88vh] min-h-[560px] max-h-[820px] overflow-hidden">
      <img
        src={story.heroImage}
        alt={story.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/30" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
        <Eyebrow story={story} />
        <h1 className="mt-6 font-oswald text-[clamp(2.6rem,6.5vw,5.8rem)] font-bold leading-[0.95] tracking-tight uppercase text-white max-w-4xl">
          {story.title}
        </h1>
        <p className="mt-6 text-zinc-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
          {story.subtitle}
        </p>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <p className="text-2xl sm:text-3xl font-light text-zinc-100 leading-snug">
        {story.excerpt}
      </p>
    </section>

    <section className="border-y border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <FactStrip facts={story.facts} />
      </div>
    </section>

    {story.chapters.map((c, i) => (
      <section key={c.chapter} className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.28em] mb-2">
              {c.chapter}
            </p>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.24em]">{c.kicker}</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-oswald text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-tight text-white mb-6">
              {c.title}
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">{c.body}</p>
          </div>
        </div>

        {i === 1 && (
          <div className="bg-zinc-900 border-t border-zinc-800">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-12 gap-8 items-center">
              <Quote className="md:col-span-2 w-10 h-10 text-orange-500" strokeWidth={1.5} />
              <div className="md:col-span-10">
                <p className="font-oswald text-2xl sm:text-3xl text-white leading-snug uppercase tracking-tight">
                  {story.pullQuote}
                </p>
                <p className="mt-5 text-xs uppercase tracking-[0.28em] text-zinc-500">
                  — {story.pullQuoteBy}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    ))}
  </>
);

// 2) Documentary — timeline + numbers
const DocumentaryLayout = ({ story }) => (
  <>
    <section className="border-b border-zinc-900 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Eyebrow story={story} />
        <h1 className="mt-6 font-oswald text-[clamp(2.6rem,5.8vw,5rem)] font-bold leading-[0.95] tracking-tight uppercase text-white">
          {story.title}
        </h1>
        <p className="mt-6 text-zinc-300 text-xl leading-relaxed max-w-3xl">
          {story.subtitle}
        </p>
      </div>
    </section>

    <section className="border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="aspect-[21/9] overflow-hidden bg-zinc-900">
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <section className="border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <FactStrip facts={story.facts} />
      </div>
    </section>

    <section className="border-b border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-2xl sm:text-3xl font-light text-zinc-100 leading-snug mb-16">
          {story.excerpt}
        </p>

        <div className="relative pl-10 sm:pl-14">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/30 via-zinc-700 to-orange-500/30" />
          {story.timeline.map((t) => (
            <div key={t.date} className="relative mb-14 last:mb-0">
              <span className="absolute -left-9 sm:-left-11 top-1.5 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-zinc-950" />
              <p className="text-orange-500 text-xs font-mono uppercase tracking-[0.24em] mb-3">
                {t.date}
              </p>
              <h3 className="font-oswald text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight mb-3">
                {t.title}
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        {story.closing && (
          <div className="mt-20 pt-12 border-t border-zinc-800">
            <p className="text-zinc-300 text-xl leading-relaxed italic">
              {story.closing}
            </p>
          </div>
        )}
      </div>
    </section>
  </>
);

// 3) Photo-essay — alternating image / caption / body panels
const PhotoEssayLayout = ({ story }) => (
  <>
    <section className="border-b border-zinc-900 pt-28 pb-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Eyebrow story={story} />
        <h1 className="mt-6 font-oswald text-[clamp(2.6rem,5.8vw,5rem)] font-bold leading-[0.95] tracking-tight uppercase text-white">
          {story.title}
        </h1>
        <p className="mt-6 text-zinc-300 text-xl leading-relaxed max-w-3xl">
          {story.subtitle}
        </p>
      </div>
    </section>

    <section className="border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <FactStrip facts={story.facts} />
      </div>
    </section>

    {story.panels.map((panel, i) => {
      const flipped = i % 2 === 1;
      return (
        <section key={i} className="border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-12 gap-10 items-center">
            <div className={`lg:col-span-7 ${flipped ? 'lg:order-2' : ''}`}>
              <div className="aspect-[4/3] overflow-hidden bg-zinc-900">
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-zinc-500">
                Plate {String(i + 1).padStart(2, '0')} · {panel.caption}
              </p>
            </div>
            <div className={`lg:col-span-5 ${flipped ? 'lg:order-1' : ''}`}>
              <p className="font-mono text-xs text-orange-500 tracking-[0.32em] mb-3">
                / {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="font-oswald text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight mb-5">
                {panel.title}
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">{panel.body}</p>
            </div>
          </div>
        </section>
      );
    })}
  </>
);

// 4) Editorial — interview Q&A
const EditorialLayout = ({ story }) => (
  <>
    <section className="border-b border-zinc-900 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <Eyebrow story={story} />
          <h1 className="mt-6 font-oswald text-[clamp(2.6rem,5.6vw,4.8rem)] font-bold leading-[0.95] tracking-tight uppercase text-white">
            {story.title}
          </h1>
          <p className="mt-6 text-zinc-300 text-xl leading-relaxed">{story.subtitle}</p>
        </div>
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-zinc-900 grayscale">
            <img
              src={story.interviewee.portrait}
              alt={story.interviewee.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 font-oswald text-xl uppercase tracking-tight text-white">
            {story.interviewee.name}
          </p>
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
            {story.interviewee.role}
          </p>
        </div>
      </div>
    </section>

    <section className="border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <FactStrip facts={story.facts} />
      </div>
    </section>

    <section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-2xl text-zinc-100 font-light leading-snug mb-14">
          {story.excerpt}
        </p>

        <div className="space-y-12">
          {story.qa.map((row, i) => (
            <div key={i} className="border-l-2 border-orange-500/40 pl-6">
              <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.28em] mb-3">
                Q · {String(i + 1).padStart(2, '0')}
              </p>
              <p className="font-oswald text-xl sm:text-2xl uppercase tracking-tight text-white leading-snug mb-5">
                {row.q}
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                <span className="text-zinc-600 font-mono text-xs mr-3 align-top">A.</span>
                {row.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

// 5) Manifesto — typography-driven, numbered rules
const ManifestoLayout = ({ story }) => (
  <>
    <section className="border-b border-zinc-900 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Eyebrow story={story} />
        <h1 className="mt-8 font-oswald text-[clamp(2.6rem,7vw,6.4rem)] font-bold leading-[0.92] tracking-tight uppercase text-white">
          {story.title}
        </h1>
        <p className="mt-8 text-zinc-300 text-xl leading-relaxed max-w-2xl mx-auto">
          {story.subtitle}
        </p>
      </div>
    </section>

    <section className="border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="aspect-[21/9] overflow-hidden bg-zinc-900">
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-2xl text-zinc-100 font-light leading-snug mb-16 max-w-3xl">
          {story.excerpt}
        </p>

        <ol className="divide-y divide-zinc-900 border-y border-zinc-900">
          {story.rules.map((r) => (
            <li key={r.n} className="py-10 grid grid-cols-12 gap-6 items-start">
              <span className="col-span-2 font-oswald text-4xl sm:text-5xl text-orange-500/80 leading-none">
                {r.n}
              </span>
              <div className="col-span-10">
                <h3 className="font-oswald text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight mb-3">
                  {r.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {story.closing && (
          <p className="mt-16 text-zinc-300 text-lg leading-relaxed italic">
            {story.closing}
          </p>
        )}
      </div>
    </section>
  </>
);

const variantMap = {
  cinematic: CinematicLayout,
  documentary: DocumentaryLayout,
  'photo-essay': PhotoEssayLayout,
  editorial: EditorialLayout,
  manifesto: ManifestoLayout,
};

const StoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const story = getStoryBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!story) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <BookOpen className="w-12 h-12 text-orange-500 mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="font-oswald text-4xl uppercase tracking-tight mb-3">Story not found</h1>
          <p className="text-zinc-400 mb-8">
            The piece you are looking for is no longer in this issue.
          </p>
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold uppercase tracking-[0.22em] rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to stories
          </Link>
        </div>
      </div>
    );
  }

  const Layout = variantMap[story.variant] || CinematicLayout;
  const others = getOtherStories(story.slug);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          type="button"
          onClick={() => navigate('/stories')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All stories
        </button>
      </div>

      <Layout story={story} />

      {/* End plate + related */}
      <section className="border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.32em] mb-4">
            End of story
          </p>
          <p className="font-oswald text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
            Shop the gear featured in this piece — or read the next one below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold uppercase tracking-[0.22em] rounded-full transition-colors"
            >
              Shop the catalogue <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/60 text-white text-sm font-semibold uppercase tracking-[0.22em] rounded-full transition-colors"
            >
              Read another <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h3 className="font-oswald text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Also in this issue
            </h3>
            <Link
              to="/stories"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 hover:text-orange-400 transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {others.map((s) => (
              <Link
                key={s.id}
                to={`/stories/${s.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-zinc-900 mb-5">
                  <img
                    src={s.coverImage}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-orange-500 text-[11px] font-semibold uppercase tracking-[0.28em] mb-2">
                  {s.category} · {s.readTime}
                </p>
                <h4 className="font-oswald text-xl sm:text-2xl font-bold uppercase tracking-tight text-white leading-tight group-hover:text-orange-400 transition-colors">
                  {s.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryDetail;

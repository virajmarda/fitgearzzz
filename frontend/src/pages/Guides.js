import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { guides } from '../data/guides';

const labelFor = (value) => value.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export default function Guides() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const categories = Array.from(new Set(guides.map((guide) => guide.category)));
  const visibleGuides = useMemo(() => {
    const search = query.trim().toLowerCase();
    return guides.filter((guide) =>
      (category === 'all' || guide.category === category) &&
      `${guide.title} ${guide.excerpt}`.toLowerCase().includes(search)
    );
  }, [category, query]);

  return (
    <main className="min-h-screen bg-[#faf6ef] text-neutral-900">
      <header className="border-b border-black/5 px-5 py-14 text-center md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#b45309]">FitGearzzz Guides</p>
        <h1 className="mb-5 text-3xl font-bold md:text-5xl">Choose your gear with confidence</h1>
        <p className="mx-auto max-w-2xl leading-relaxed text-neutral-600">Explore practical buying checklists, equipment considerations, and ideas for building a training setup around your space and goals.</p>
        <Link to="/journal" className="mt-6 inline-block rounded-lg p-3 font-semibold underline focus-visible:outline focus-visible:outline-2">Explore the Journal</Link>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8" aria-label="Browse guides">
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-semibold">
            Search guides
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by topic or equipment" className="mt-2 block w-full rounded-xl border border-neutral-300 bg-white p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b45309]" />
          </label>
          <label className="block text-sm font-semibold">
            Topic
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 block w-full rounded-xl border border-neutral-300 bg-white p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b45309]">
              <option value="all">All topics</option>
              {categories.map((item) => <option key={item} value={item}>{labelFor(item)}</option>)}
            </select>
          </label>
        </div>
        <p role="status" className="mb-6 text-sm text-neutral-600">{visibleGuides.length} {visibleGuides.length === 1 ? 'guide' : 'guides'} found</p>

        {visibleGuides.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGuides.map((guide) => (
              <article key={guide.slug} className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#b45309]">{labelFor(guide.category)}</p>
                <h2 className="mb-3 text-xl font-bold">
                  <Link to={`/guides/${guide.slug}`} className="rounded hover:underline focus-visible:outline focus-visible:outline-2">{guide.title}</Link>
                </h2>
                <p className="mb-5 leading-relaxed text-neutral-600">{guide.excerpt}</p>
                <Link to={`/guides/${guide.slug}`} className="mt-auto inline-flex min-h-[44px] items-center self-start rounded-full bg-[#b45309] px-5 py-3 text-sm font-semibold text-white hover:bg-[#92400e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]" aria-label={`Read ${guide.title}`}>Read guide <span aria-hidden="true" className="ml-2">→</span></Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
            <h2 className="mb-3 text-xl font-bold">No matching guides</h2>
            <p className="mb-4 text-neutral-600">Try another topic or clear your search.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('all'); }} className="min-h-[44px] rounded-full bg-[#b45309] px-5 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Reset filters</button>
          </div>
        )}
      </section>
    </main>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { bundles } from '../data/bundles';

const linkClass = 'inline-flex min-h-[44px] items-center rounded-full bg-[#b45309] px-5 py-3 text-sm font-semibold text-white hover:bg-[#92400e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]';

export default function GiftGuides() {
  return (
    <main className="min-h-screen bg-[#faf6ef] text-neutral-900">
      <header className="border-b border-black/5 bg-white/70 px-5 py-14 text-center md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#b45309]">FitGearzzz Gift Edit</p>
        <h1 className="mb-5 text-3xl font-bold md:text-5xl">Find a gift for their training journey</h1>
        <p className="mx-auto max-w-2xl leading-relaxed text-neutral-600">Start with how they like to move. Explore home-training, everyday workout, and recovery ideas, then check individual product specifications before choosing.</p>
        <Link to="/guides" className="mt-6 inline-block rounded-lg p-3 font-semibold underline focus-visible:outline focus-visible:outline-2">Need help choosing? Explore our guides</Link>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8" aria-labelledby="gift-collections-title">
        <h2 id="gift-collections-title" className="mb-6 text-2xl font-bold md:text-3xl">Shop by their interests</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <article key={collection.slug} className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-bold">{collection.title}</h3>
              <p className="mb-5 leading-relaxed text-neutral-600">{collection.description}</p>
              <ul className="mb-6 space-y-2 text-sm text-neutral-600">
                {collection.audience.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link to={`/collections/${collection.slug}`} className={`${linkClass} mt-auto self-start`}>Explore collection<span aria-hidden="true" className="ml-2">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8" aria-labelledby="gift-kits-title">
        <h2 id="gift-kits-title" className="mb-3 text-2xl font-bold md:text-3xl">Starter-kit ideas</h2>
        <p className="mb-6 max-w-3xl leading-relaxed text-neutral-600">These are editorial kit concepts, not confirmed purchasable bundles. Product selections, availability, pricing, and any bundle offers have not been connected yet.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {bundles.map((bundle) => (
            <article key={bundle.slug} className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Kit concept</p>
              <h3 className="mb-3 text-xl font-bold">{bundle.title}</h3>
              <p className="mb-6 leading-relaxed text-neutral-600">{bundle.description}</p>
              <Link to={`/bundles/${bundle.slug}`} className="mt-auto inline-flex min-h-[44px] items-center self-start rounded-lg p-2 font-semibold text-[#b45309] underline focus-visible:outline focus-visible:outline-2">Explore kit idea<span aria-hidden="true" className="ml-2">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16" aria-labelledby="gift-checklist-title">
        <div className="rounded-2xl border border-black/5 bg-white p-6 md:p-8">
          <h2 id="gift-checklist-title" className="mb-4 text-2xl font-bold">Before you choose</h2>
          <ul className="list-disc space-y-3 pl-5 leading-relaxed text-neutral-600">
            <li>Consider their routine, available space, and equipment they already own.</li>
            <li>Check product dimensions, materials, resistance levels, and care guidance.</li>
            <li>Confirm current availability and delivery information before ordering.</li>
            <li>Review return eligibility in the <Link to="/shipping" className="rounded underline focus-visible:outline focus-visible:outline-2">Shipping &amp; Returns policy</Link>.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

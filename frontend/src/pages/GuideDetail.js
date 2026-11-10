import React from 'react';
import { Link, useParams } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';
import RelatedArticles from '../components/RelatedArticles';
import { guides, getGuideBySlug } from '../data/guides';
import { articles } from '../data/articles';
import { getCollectionBySlug } from '../data/collections';

const labelFor = (value) => value.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return (
      <main className="bg-[#faf6ef]">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#b45309]">Guide not found</p>
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">We couldn’t find that guide</h1>
          <p className="mb-8 text-neutral-600">The guide may have moved or is not available yet.</p>
          <Link to="/guides" className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 font-semibold text-white transition hover:bg-[#92400e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]">Explore all guides <span aria-hidden="true">→</span></Link>
        </div>
      </main>
    );
  }

  const relatedArticles = (guide.relatedArticles || []).map((articleSlug) => articles.find((article) => article.slug === articleSlug)).filter(Boolean);
  const collection = guide.relatedCollection ? getCollectionBySlug(guide.relatedCollection) : null;

  return (
    <main className="bg-[#faf6ef]">
      <article>
        <header className="border-b border-black/5 bg-white/70">
          <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                <li><Link to="/" className="rounded focus-visible:outline focus-visible:outline-2">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/guides" className="rounded focus-visible:outline focus-visible:outline-2">Guides</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-neutral-900">{labelFor(guide.category)}</li>
              </ol>
            </nav>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#b45309]">{labelFor(guide.category)}</p>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">{guide.title}</h1>
            <p className="mb-6 text-lg leading-relaxed text-neutral-600">{guide.excerpt}</p>
            <p className="text-sm text-neutral-500">{guide.readingTime} • Updated {guide.updatedAt}</p>
          </div>
        </header>

        {guide.heroImage ? (
          <div className="mx-auto max-w-6xl px-5 pt-10 lg:px-8">
            <img src={guide.heroImage} alt={guide.title} className="aspect-[16/9] w-full rounded-3xl border border-black/5 object-cover shadow-sm" loading="eager" />
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
          <div className="space-y-8">
            {guide.sections.map((section, index) => (
              <section key={`${guide.slug}-${index}`}>
                <h2 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl">{section.heading}</h2>
                <p className="leading-relaxed text-neutral-600">{section.body}</p>
              </section>
            ))}
          </div>

          {collection ? (
            <div className="mt-12 rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#b45309]">Shop the guide</p>
              <h2 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl">{collection.title}</h2>
              <p className="mb-6 text-neutral-600">{collection.description}</p>
              <Link to={`/collections/${collection.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 font-semibold text-white transition hover:bg-[#92400e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]">{collection.ctaLabel || 'Shop collection'} <span aria-hidden="true">→</span></Link>
            </div>
          ) : null}
        </div>

        {guide.faqs?.length ? <div className="mx-auto max-w-6xl px-5 pb-12 lg:px-8"><FAQAccordion faqs={guide.faqs} /></div> : null}
        <RelatedArticles articles={relatedArticles} />
      </article>
    </main>
  );
}

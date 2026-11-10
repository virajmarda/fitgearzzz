import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CollectionHero from '../components/CollectionHero';
import BuyingGuide from '../components/BuyingGuide';
import FAQAccordion from '../components/FAQAccordion';
import RelatedArticles from '../components/RelatedArticles';
import { collections, getCollectionBySlug } from '../data/collections';
import { articles } from '../data/articles';
import { getBundleBySlug } from '../data/bundles';

const CollectionDetail = () => {
  const { slug } = useParams();
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return (
      <main className="bg-[#faf6ef]">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
            Collection not found
          </p>
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            We couldn’t find that collection
          </h1>
          <p className="mb-8 text-neutral-600">
            Explore the available collections and product guides instead.
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#92400e]"
          >
            Browse collections
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = (collection.relatedArticles || [])
    .map((articleSlug) => articles.find((article) => article.slug === articleSlug))
    .filter(Boolean);

  const bundle = collection.bundleSlug
    ? getBundleBySlug(collection.bundleSlug)
    : null;

  return (
    <main className="bg-[#faf6ef]">
      <CollectionHero collection={collection} />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <section className="mb-10 rounded-3xl border border-black/5 bg-white/85 p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                Who this is for
              </h2>

              <ul className="space-y-3">
                {collection.audience?.map((item, index) => (
                  <li
                    key={`${collection.slug}-audience-${index}`}
                    className="flex items-start gap-3 text-neutral-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#b45309]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <BuyingGuide
              title={`How to choose ${collection.title.toLowerCase()} gear`}
              intro="Use these practical considerations to build a setup that fits your routine, space, and goals."
              points={collection.buyingConsiderations || []}
              ctaLabel={collection.ctaLabel}
              ctaHref={`/collections/${collection.slug}`}
            />
          </div>

          <aside className="space-y-6">
            {bundle ? (
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
                  Recommended bundle
                </p>
                <h2 className="mb-3 text-xl font-bold text-neutral-900">
                  {bundle.title}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-neutral-600">
                  {bundle.description}
                </p>
                <Link
                  to={`/bundles/${bundle.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b45309] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#92400e]"
                >
                  View bundle
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ) : null}

            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-neutral-900">
                Explore more collections
              </h2>
              <ul className="space-y-3">
                {collections
                  .filter((item) => item.slug !== collection.slug)
                  .map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/collections/${item.slug}`}
                        className="flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-900"
                      >
                        {item.title}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {collection.faqs?.length ? (
        <div className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
          <FAQAccordion faqs={collection.faqs} />
        </div>
      ) : null}

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
};

export default CollectionDetail;

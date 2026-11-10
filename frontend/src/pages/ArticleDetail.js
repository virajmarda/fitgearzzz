import React from 'react';
import { Link, useParams } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';
import RelatedArticles from '../components/RelatedArticles';
import { getArticleBySlug, articles } from '../data/articles';
import { getCollectionBySlug } from '../data/collections';

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <main className="bg-[#faf6ef]">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
            Article not found
          </p>
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            We couldn’t find that article
          </h1>
          <p className="mb-8 text-neutral-600">
            The article may have been moved or is not available yet.
          </p>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#92400e]"
          >
            Explore the Journal
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = (article.relatedArticles || [])
    .map((relatedSlug) => articles.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  const relatedCollection = article.relatedCollections?.length
    ? getCollectionBySlug(article.relatedCollections[0])
    : null;

  const categoryLabel = article.category
    ? article.category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Guide';

  return (
    <main className="bg-[#faf6ef]">
      <article>
        <header className="border-b border-black/5 bg-white/70">
          <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                <li>
                  <Link to="/" className="transition hover:text-neutral-900">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/journal" className="transition hover:text-neutral-900">
                    Journal
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-neutral-900">{categoryLabel}</li>
              </ol>
            </nav>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
              {categoryLabel}
            </p>

            <h1 className="mb-4 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mb-6 text-lg leading-relaxed text-neutral-600">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span>{article.readingTime}</span>
              <span aria-hidden="true">•</span>
              <span>Updated {article.updatedAt}</span>
            </div>
          </div>
        </header>

        {article.heroImage ? (
          <div className="mx-auto max-w-6xl px-5 pt-10 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              <img
                src={article.heroImage}
                alt={article.title}
                className="aspect-[16/9] w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
          <div className="space-y-8">
            {article.sections?.map((section, index) => (
              <section key={`${article.slug}-${index}`}>
                <h2 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl">
                  {section.heading}
                </h2>
                <p className="text-base leading-relaxed text-neutral-600">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {relatedCollection ? (
            <div className="mt-12 rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
                Shop the guide
              </p>
              <h2 className="mb-3 text-xl font-bold text-neutral-900 md:text-2xl">
                {relatedCollection.title}
              </h2>
              <p className="mb-6 text-neutral-600">
                {relatedCollection.description}
              </p>
              <Link
                to={`/collections/${relatedCollection.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#92400e]"
              >
                {relatedCollection.ctaLabel || 'Shop collection'}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : null}
        </div>

        {article.faqs?.length ? (
          <div className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
            <FAQAccordion faqs={article.faqs} />
          </div>
        ) : null}

        <RelatedArticles articles={relatedArticles} />
      </article>
    </main>
  );
};

export default ArticleDetail;

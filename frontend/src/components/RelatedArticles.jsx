import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';

const RelatedArticles = ({
  articles = [],
  title = 'Keep reading',
  viewAllHref = '/journal',
  viewAllLabel = 'View all articles',
}) => {
  if (!Array.isArray(articles) || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16" aria-labelledby="related-articles-title">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
              FitGearzzz Journal
            </p>

            <h2
              id="related-articles-title"
              className="text-2xl font-bold text-neutral-900 md:text-3xl"
            >
              {title}
            </h2>
          </div>

          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            {viewAllLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;

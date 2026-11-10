import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { articles, articleCategories } from '../data/articles';

const Journal = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <main className="bg-[#faf6ef]">
      <section className="border-b border-black/5 bg-white/70">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center md:py-20 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
            FitGearzzz Journal
          </p>

          <h1 className="mx-auto mb-5 max-w-3xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Train smarter with practical guides and product knowledge
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Explore training advice, gear guides, recovery routines, and product-care knowledge designed to help you build a more consistent routine.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#92400e]"
            >
              Explore guides
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/collections"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              Shop collections
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeCategory === 'all'
                ? 'bg-[#b45309] text-white'
                : 'border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
            }`}
          >
            All
          </button>

          {articleCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              aria-pressed={activeCategory === category.slug}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category.slug
                  ? 'bg-[#b45309] text-white'
                  : 'border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="rounded-3xl border border-black/5 bg-white p-10 text-center">
            <h2 className="mb-3 text-xl font-semibold text-neutral-900">
              No articles in this category yet
            </h2>
            <p className="mb-6 text-neutral-600">
              Explore all Journal articles or browse the latest guides.
            </p>
            <Link
              to="/journal"
              className="inline-flex items-center rounded-full bg-[#b45309] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#92400e]"
            >
              View all articles
            </Link>
          </div>
        ) : (
          <>
            {featuredArticle ? (
              <div className="mb-8">
                <ArticleCard article={featuredArticle} variant="featured" />
              </div>
            ) : null}

            {remainingArticles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {remainingArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
};

export default Journal;

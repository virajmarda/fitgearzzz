import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article, variant = 'default' }) => {
  if (!article) return null;

  const {
    slug,
    title,
    category,
    excerpt,
    readingTime,
    heroImage,
  } = article;

  const categoryLabel = category
    ? category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Guide';

  return (
    <article
      className={`
        group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5
        bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg
        ${variant === 'featured' ? 'md:flex-row' : ''}
      `}
    >
      <Link
        to={`/journal/${slug}`}
        className="block overflow-hidden"
        aria-label={`Read ${title}`}
      >
        <div
          className={`
            relative bg-cream-100
            ${variant === 'featured' ? 'aspect-[16/10] md:aspect-auto md:h-full md:w-1/2' : 'aspect-[16/10]'}
          `}
        >
          {heroImage ? (
            <img
              src={heroImage}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#f4efe7] text-sm text-neutral-500">
              FitGearzzz Journal
            </div>
          )}
        </div>
      </Link>

      <div
        className={`
          flex flex-1 flex-col p-5
          ${variant === 'featured' ? 'md:w-1/2 md:p-8' : ''}
        `}
      >
        <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#b45309]">
          <span>{categoryLabel}</span>
          {readingTime ? <span className="text-neutral-500">• {readingTime}</span> : null}
        </div>

        <h3 className="mb-3 text-lg font-semibold leading-snug text-neutral-900 md:text-xl">
          <Link to={`/journal/${slug}`} className="transition hover:text-[#b45309]">
            {title}
          </Link>
        </h3>

        {excerpt ? (
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-neutral-600">
            {excerpt}
          </p>
        ) : null}

        <div className="mt-auto">
          <Link
            to={`/journal/${slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#92400e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]"
          >
            Read guide
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;

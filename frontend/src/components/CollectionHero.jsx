import React from 'react';
import { Link } from 'react-router-dom';

const CollectionHero = ({ collection }) => {
  if (!collection) return null;

  const {
    title,
    subtitle,
    description,
    heroImage,
    ctaLabel,
    slug,
  } = collection;

  return (
    <section className="relative overflow-hidden bg-[#faf6ef]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:gap-14 md:py-20 lg:px-8">
        <div className="order-2 md:order-1">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
            FitGearzzz Collection
          </p>

          <h1 className="mb-5 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle ? (
            <p className="mb-5 text-lg font-medium text-neutral-700">
              {subtitle}
            </p>
          ) : null}

          {description ? (
            <p className="mb-8 max-w-xl text-base leading-relaxed text-neutral-600">
              {description}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/collections/${slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#92400e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]"
            >
              {ctaLabel || 'Shop collection'}
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/guides"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              Explore guides
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            {heroImage ? (
              <img
                src={heroImage}
                alt={title}
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#f4efe7] text-sm text-neutral-500">
                Collection imagery
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionHero;

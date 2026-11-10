import React from 'react';
import { Link } from 'react-router-dom';

const BuyingGuide = ({
  title,
  intro,
  points = [],
  ctaLabel,
  ctaHref,
  className = '',
}) => {
  if (!title || !Array.isArray(points) || points.length === 0) {
    return null;
  }

  return (
    <section
      className={`rounded-3xl border border-black/5 bg-white/85 p-6 shadow-sm md:p-10 ${className}`}
      aria-labelledby="buying-guide-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
          Buying guide
        </p>

        <h2
          id="buying-guide-title"
          className="mb-4 text-2xl font-bold leading-tight text-neutral-900 md:text-3xl"
        >
          {title}
        </h2>

        {intro ? (
          <p className="mb-8 text-base leading-relaxed text-neutral-600">
            {intro}
          </p>
        ) : null}
      </div>

      <ol className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {points.map((point, index) => (
          <li
            key={`${title}-${index}`}
            className="flex items-start gap-4 rounded-2xl border border-black/5 bg-[#faf6ef] p-5"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#b45309] text-sm font-bold text-white">
              {index + 1}
            </span>

            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              {point}
            </p>
          </li>
        ))}
      </ol>

      {ctaLabel && ctaHref ? (
        <div className="mt-8 text-center">
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#b45309] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#92400e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default BuyingGuide;

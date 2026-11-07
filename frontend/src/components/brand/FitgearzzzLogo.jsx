import React from 'react';

// Original Fitgearzzz mark: a minimalist barbell monogram built from currentColor.
// Works in one colour, scales cleanly, and carries an accessible label.
const FitgearzzzLogo = ({ withWordmark = true, className = '', markSize = 26 }) => (
  <span
    className={`inline-flex items-center gap-2.5 ${className}`}
    role="img"
    aria-label="Fitgearzzz"
  >
    <svg
      width={markSize}
      height={markSize}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* left plates */}
      <rect x="2" y="9" width="3.4" height="14" rx="1" fill="currentColor" />
      <rect x="6.4" y="6" width="3.4" height="20" rx="1" fill="currentColor" />
      {/* bar */}
      <rect x="9.8" y="14.3" width="12.4" height="3.4" fill="currentColor" />
      {/* right plates */}
      <rect x="22.2" y="6" width="3.4" height="20" rx="1" fill="currentColor" />
      <rect x="26.6" y="9" width="3.4" height="14" rx="1" fill="currentColor" />
    </svg>
    {withWordmark && (
      <span
        className="font-display font-bold tracking-[-0.04em] text-[18px] leading-none"
        style={{ fontFamily: "'Comfortaa', sans-serif" }}
      >
        fitgearzzz
      </span>
    )}
  </span>
);

export default FitgearzzzLogo;

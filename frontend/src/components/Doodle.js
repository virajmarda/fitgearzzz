import React from 'react';

// Hand-sketched SVG accents. Used sparingly next to key words/numbers
// to give the page a human, annotated feel rather than a sterile grid.

export const DoodleCircle = ({ className = '' }) => (
  <svg viewBox="0 0 120 50" fill="none" className={`pointer-events-none ${className}`}>
    <path
      d="M10 25c0-14 22-20 50-20s52 6 52 20-24 20-52 20S10 39 10 25Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      transform="rotate(-2 60 25)"
    />
  </svg>
);

export const DoodleUnderline = ({ className = '' }) => (
  <svg viewBox="0 0 200 20" fill="none" className={`pointer-events-none ${className}`}>
    <path
      d="M3 12c40-8 120-9 194 0"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const DoodleArrow = ({ className = '' }) => (
  <svg viewBox="0 0 80 60" fill="none" className={`pointer-events-none ${className}`}>
    <path
      d="M5 10c15 20 25 32 45 40"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
d="M35 44l16 8-3-17"      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleStar = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={`pointer-events-none ${className}`}>
    <path
      d="M20 4l2.5 11L34 18l-11.5 3L20 33l-2.5-12L6 18l11.5-3L20 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

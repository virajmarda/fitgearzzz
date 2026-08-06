import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DoodleCircle, DoodleUnderline, DoodleStar, DoodleArrow } from './Doodle';

// HandwrittenSlider
// ------------------
// A dedicated, full-width slide space for handwritten/annotated notes.
// Unlike MarginNote (single static line), this supports an arbitrary
// list of notes and gives EACH one its own full slide: generous vertical
// padding, a large, perfectly centered handwritten line, a matching
// doodle accent, and room to breathe on every screen size.
//
// Usage:
// <HandwrittenSlider
//   notes={[
//     { text: 'stitched by hand, checked twice.', doodle: DoodleUnderline, doodleClass: 'w-32 h-6' },
//     { text: 'we ship what we would wear ourselves.', doodle: DoodleStar, doodleClass: 'w-8 h-8' },
//     ...
//   ]}
// />

const DOODLES = [DoodleUnderline, DoodleCircle, DoodleStar, DoodleArrow];

const HandwrittenSlider = ({ notes = [], autoPlayMs = 5000 }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = notes.length;

  const goTo = useCallback(
    (i) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
  }, [paused, count, autoPlayMs, next]);

  if (count === 0) return null;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? prev() : next();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative bg-zinc-950 border-y border-zinc-900 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide viewport — generous min-height gives each note real breathing room */}
      <div className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center justify-center">
        {notes.map((note, i) => {
          const Doodle = note.doodle || DOODLES[i % DOODLES.length];
          const doodleClass = note.doodleClass || 'w-28 h-6';
          const active = i === index;
          return (
            <div
              key={i}
              aria-hidden={!active}
              className={`absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center transition-all duration-700 ease-out ${
                active
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-3 scale-[0.98] pointer-events-none'
              }`}
            >
              <p className="font-hand text-orange-400 leading-snug max-w-3xl mx-auto text-[1.75rem] sm:text-4xl md:text-5xl">
                {note.text}
              </p>
              <Doodle className={`${doodleClass} text-orange-500/60 mt-4 sm:mt-6`} />
            </div>
          );
        })}
      </div>

      {/* Prev / next controls — subtle, only shown when there is more than one note */}
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous note"
            onClick={prev}
            className="hidden sm:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-zinc-800 text-zinc-500 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next note"
            onClick={next}
            className="hidden sm:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-zinc-800 text-zinc-500 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 pb-6 sm:pb-8">
            {notes.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to note ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-orange-500' : 'w-1.5 bg-zinc-700 hover:bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HandwrittenSlider;

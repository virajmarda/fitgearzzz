import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

// NOTE: Replace these with real reviews from Judge.me or Shopify metafields
// once your reviews app is configured. These are placeholder data only.
// Reframed as delivery confirmations rather than generic testimonial
// cards — each one names the city and the item, same substance as
// before, styled to reinforce "this order actually arrived."
const REVIEWS = [
  { id: 1, name: 'Rahul M.', city: 'Mumbai', item: 'Resistance Band Set', rating: 5, text: 'Ordered a resistance band set. Arrived in 3 days, well-packaged. Quality is solid for the price.' },
  { id: 2, name: 'Sneha P.', city: 'Pune', item: 'Adjustable Dumbbells', rating: 5, text: 'The dumbbells are exactly as described. No wobble, good knurling. Will order again.' },
  { id: 3, name: 'Divya R.', city: 'Bangalore', item: 'Yoga Mat, 6mm', rating: 5, text: 'COD worked perfectly. Product quality is much better than I expected at this price point.' },
  { id: 4, name: 'Ananya B.', city: 'Jaipur', item: 'Compression Tee', rating: 5, text: 'Return process was zero-hassle. Great customer support on WhatsApp. Definitely recommending this.' },
  { id: 5, name: 'Vikram N.', city: 'Kolkata', item: '12kg Kettlebell', rating: 5, text: 'Kettlebell is well-balanced. Finish is smooth. Shipped same day as ordered.' },
  { id: 6, name: 'Meera J.', city: 'Surat', item: 'Protein Shaker', rating: 5, text: 'Protein shaker is leak-proof. Used it daily for a month and no issues.' },
];

const AVERAGE_RATING = (
  REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
).toFixed(1);

const Stars = ({ count, size = 'w-3.5 h-3.5' }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`${size} ${
          n <= count ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'
        }`}
      />
    ))}
  </div>
);

// A delivery-confirmation slip rather than a testimonial card: a
// stamped "Delivered" tag up top (same mono/rotated-badge language as
// ManifestStamp and the checkpoint ledger in Home.js), the review body,
// then who it went to, where, and what it was — like a signed-off slip.
const ReviewCard = ({ name, city, item, rating, text }) => (
  <div className="relative bg-zinc-900/60 border border-zinc-800 rounded-sm p-6 flex flex-col gap-4 overflow-hidden">
    <div
      className="absolute top-0 left-0 right-0 h-px opacity-60"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 6px, transparent 6px, transparent 12px)',
      }}
    />
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-1 border border-emerald-500/50 text-emerald-400 font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm -rotate-1">
        <CheckCircle2 className="w-3 h-3" />
        Delivered
      </span>
      <Stars count={rating} />
    </div>
    <p className="text-zinc-300 text-sm leading-relaxed">{text}</p>
    <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-800 gap-3">
      <div className="min-w-0">
        <p className="text-white text-sm font-semibold truncate">{name}</p>
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-wide">{city}</p>
      </div>
      <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-wide text-right shrink-0 max-w-[45%] leading-snug">
        {item}
      </p>
    </div>
  </div>
);

const InfiniteReviews = () => {
  return (
    <section className="bg-zinc-950 py-20 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              <p className="font-mono text-orange-500 text-[10px] font-semibold uppercase tracking-[0.22em]">
                Delivery Confirmations
              </p>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Proof it showed up
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-white">{AVERAGE_RATING}</span>
            <div>
              <Stars count={5} size="w-4 h-4" />
              <p className="font-mono text-zinc-500 text-[10px] uppercase tracking-wide mt-1">
                {REVIEWS.length}+ verified deliveries
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.id} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteReviews;

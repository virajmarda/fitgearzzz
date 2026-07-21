import React from 'react';
import { Star, Quote } from 'lucide-react';

// NOTE: Replace these with real reviews from Judge.me or Shopify metafields
// once your reviews app is configured. These are placeholder data only.
const REVIEWS = [
  { id: 1, name: 'Rahul M.', city: 'Mumbai', rating: 5, text: 'Ordered a resistance band set. Arrived in 3 days, well-packaged. Quality is solid for the price.' },
  { id: 2, name: 'Sneha P.', city: 'Pune', rating: 5, text: 'The dumbbells are exactly as described. No wobble, good knurling. Will order again.' },
  { id: 3, name: 'Divya R.', city: 'Bangalore', rating: 5, text: 'COD worked perfectly. Product quality is much better than I expected at this price point.' },
  { id: 4, name: 'Ananya B.', city: 'Jaipur', rating: 5, text: 'Return process was zero-hassle. Great customer support on WhatsApp. Definitely recommending this.' },
  { id: 5, name: 'Vikram N.', city: 'Kolkata', rating: 5, text: 'Kettlebell is well-balanced. Finish is smooth. Shipped same day as ordered.' },
  { id: 6, name: 'Meera J.', city: 'Surat', rating: 5, text: 'Protein shaker is leak-proof. Used it daily for a month and no issues.' },
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

const ReviewCard = ({ name, city, rating, text }) => (
  <div className="bg-zinc-900/60 border border-zinc-800 rounded-sm p-6 flex flex-col gap-4">
    <Quote className="w-4 h-4 text-zinc-700" strokeWidth={1.5} />
    <p className="text-zinc-300 text-sm leading-relaxed">{text}</p>
    <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-800">
      <div>
        <p className="text-white text-sm font-semibold">{name}</p>
        <p className="text-zinc-500 text-xs">{city}</p>
      </div>
      <Stars count={rating} />
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
              <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
                Customer feedback
              </p>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              What customers say
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-white">{AVERAGE_RATING}</span>
            <div>
              <Stars count={5} size="w-4 h-4" />
              <p className="text-zinc-500 text-xs mt-1">Based on {REVIEWS.length}+ verified orders</p>
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

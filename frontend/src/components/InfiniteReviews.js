import React from 'react';
import { Star } from 'lucide-react';

// NOTE: Replace these with real reviews from Judge.me or Shopify metafields
// once your reviews app is configured. These are placeholder data only.
const REVIEWS = [
  { id: 1,  name: 'Rahul M.',    city: 'Mumbai',    rating: 5, text: 'Ordered a resistance band set. Arrived in 3 days, well-packaged. Quality is solid for the price.' },
  { id: 2,  name: 'Sneha P.',    city: 'Pune',      rating: 5, text: 'The dumbbells are exactly as described. No wobble, good knurling. Will order again.' },
  { id: 3,  name: 'Karan T.',    city: 'Delhi',     rating: 4, text: 'Delivery was fast. The foam roller is firm, which I prefer. Happy with the purchase.' },
  { id: 4,  name: 'Divya R.',    city: 'Bangalore', rating: 5, text: 'COD worked perfectly. Product quality is much better than I expected at this price point.' },
  { id: 5,  name: 'Amit S.',     city: 'Hyderabad', rating: 4, text: 'Jump rope is durable. Handles are comfortable. Only issue was minor packaging damage, product was fine.' },
  { id: 6,  name: 'Pooja K.',    city: 'Chennai',   rating: 5, text: 'Yoga mat has great grip. Non-slip even after sweating. Exactly what I was looking for.' },
  { id: 7,  name: 'Vikram N.',   city: 'Kolkata',   rating: 5, text: 'Kettlebell is well-balanced. Finish is smooth. Shipped same day as ordered.' },
  { id: 8,  name: 'Ananya B.',   city: 'Jaipur',    rating: 5, text: 'Return process was zero-hassle. Great customer support on WhatsApp. Definitely recommending this.' },
  { id: 9,  name: 'Rohit V.',    city: 'Nagpur',    rating: 4, text: 'Pull-up bar fits the doorframe well. Installation took 2 minutes. Good value.' },
  { id: 10, name: 'Meera J.',    city: 'Surat',     rating: 5, text: 'Protein shaker is leak-proof. Used it daily for a month and no issues.' },
  { id: 11, name: 'Aditya C.',   city: 'Lucknow',   rating: 5, text: 'The ab wheel is sturdy and wide. Much better quality than the one from a local store.' },
  { id: 12, name: 'Anjali G.',   city: 'Indore',    rating: 5, text: 'Ordered for my home gym. Everything arrived intact, all products are quality.' },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`w-3 h-3 ${
          n <= count ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'
        }`}
      />
    ))}
  </div>
);

const ReviewCard = ({ name, city, rating, text }) => (
  <div className="w-72 shrink-0 bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3">
    <Stars count={rating} />
    <p className="text-zinc-300 text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
    <div>
      <p className="text-white text-sm font-semibold">{name}</p>
      <p className="text-zinc-500 text-xs">{city}</p>
    </div>
  </div>
);

const InfiniteReviews = () => {
  const row1 = REVIEWS.slice(0, 6);
  const row2 = REVIEWS.slice(6, 12);

  return (
    <section className="bg-zinc-950 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2">Reviews</p>
        <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
          What customers say
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4">
        <div
          className="flex gap-4 w-max"
          style={{
            animation: 'marquee-left 32s linear infinite',
          }}
        >
          {[...row1, ...row1].map((r, i) => (
            <ReviewCard key={`r1-${i}`} {...r} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div
          className="flex gap-4 w-max"
          style={{
            animation: 'marquee-right 36s linear infinite',
          }}
        >
          {[...row2, ...row2].map((r, i) => (
            <ReviewCard key={`r2-${i}`} {...r} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default InfiniteReviews;

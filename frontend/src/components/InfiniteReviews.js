import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    rating: 5,
    text: "Absolutely fantastic quality! The dumbbells feel premium and solid. Highly recommend FitGearzzz!",
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Priya Sharma",
    rating: 5,
    text: "Best fitness equipment I've purchased online. Fast shipping and amazing customer service.",
    location: "Delhi"
  },
  {
    id: 3,
    name: "Amit Patel",
    rating: 4,
    text: "Great products at competitive prices. Took a day longer to deliver but worth the wait.",
    location: "Ahmedabad"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    rating: 5,
    text: "The resistance bands are exactly what I needed. Perfect for home workouts!",
    location: "Hyderabad"
  },
  {
    id: 5,
    name: "Vikram Singh",
    rating: 4,
    text: "Very happy with my purchase. Quality is good and the price was reasonable.",
    location: "Pune"
  },
  {
    id: 6,
    name: "Anjali Mehta",
    rating: 5,
    text: "Excellent yoga mat! Non-slip surface and perfect thickness. Totally worth it!",
    location: "Bangalore"
  },
  {
    id: 7,
    name: "Rohit Verma",
    rating: 5,
    text: "Premium quality kettlebells. The grip is excellent and they look great too!",
    location: "Chennai"
  },
  {
    id: 8,
    name: "Kavya Iyer",
    rating: 4,
    text: "Good value for money. The jump rope is durable and the handles are comfortable.",
    location: "Kochi"
  },
  {
    id: 9,
    name: "Arjun Nair",
    rating: 5,
    text: "Best gym equipment store in India! Fast delivery and authentic products.",
    location: "Jaipur"
  },
  {
    id: 10,
    name: "Meera Kapoor",
    rating: 5,
    text: "Love the resistance bands set! Perfect for beginners and advanced users.",
    location: "Kolkata"
  },
  {
    id: 11,
    name: "Karan Malhotra",
    rating: 4,
    text: "Quality products and reasonable pricing. Will definitely buy again from FitGearzzz.",
    location: "Chandigarh"
  },
  {
    id: 12,
    name: "Divya Rao",
    rating: 5,
    text: "Amazing experience! The foam roller is perfect for recovery. Highly recommended.",
    location: "Surat"
  },
  {
    id: 13,
    name: "Aditya Joshi",
    rating: 4,
    text: "Great quality dumbbells. A bit pricey but absolutely worth the investment.",
    location: "Nagpur"
  },
  {
    id: 14,
    name: "Pooja Gupta",
    rating: 5,
    text: "Fantastic customer service and premium quality equipment. Best online fitness store!",
    location: "Indore"
  },
  {
    id: 15,
    name: "Sanjay Desai",
    rating: 5,
    text: "The pull-up bar is sturdy and well-made. Exactly what I was looking for!",
    location: "Nashik"
  }
];

const InfiniteReviews = () => {
  // Double the reviews for seamless infinite scroll
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          What Our <span className="text-orange-500">Champions</span> Say
        </h2>
        <p className="text-gray-400 text-center text-lg">
          Real reviews from real fitness enthusiasts
        </p>
      </div>

      <div className="relative">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black via-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black via-black to-transparent z-10 pointer-events-none"></div>

        {/* Infinite scrolling container */}
        <div className="review-scroll-container flex gap-6">
          {doubleReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="review-card flex-shrink-0 w-80 md:w-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 hover:scale-105 transition-all duration-300"
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'fill-orange-500 text-orange-500'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Reviewer info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold">{review.name}</div>
                  <div className="text-gray-500 text-sm">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation for infinite scroll */}
      <style jsx>{`
        .review-scroll-container {
          animation: scroll 90s linear infinite;
          will-change: transform;
        }

        .review-scroll-container:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .review-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .review-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default InfiniteReviews;

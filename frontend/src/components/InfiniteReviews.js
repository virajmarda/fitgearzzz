import React, { useEffect, useRef } from 'react';
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
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (container.scrollLeft >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const doubledReviews = [...reviews, ...reviews];

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
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {doubledReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-80 md:w-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
              style={{
                opacity: '0.4',
                animation: `fadeInOut 20s linear infinite`,
                animationDelay: `${index * 0.5}s`
              }}
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

      {/* CSS for center card focus effect */}
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% { 
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default InfiniteReviews;

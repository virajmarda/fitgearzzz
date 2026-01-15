import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewsList = ({ reviews, rating, reviewCount }) => {
  if (reviewCount === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <p className="text-zinc-400 font-manrope">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center space-x-4">
          <div className="text-5xl font-oswald font-bold text-orange-500">
            {rating.toFixed(1)}
          </div>
          <div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? 'text-orange-500 fill-orange-500'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-zinc-300 font-manrope">
              Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      {reviews.map((review, index) => (
        <motion.div
          key={review.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-oswald text-lg font-bold text-white">
                {review.title}
              </h4>
              <p className="text-zinc-400 text-sm">
                by {review.reviewer?.name || 'Anonymous'} • {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'text-orange-500 fill-orange-500'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-zinc-300 font-manrope leading-relaxed">
            {review.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewsList;

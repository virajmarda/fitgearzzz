import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import api from '../utils/api';

const ReviewForm = ({ product, user, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit a review');
      return;
    }

    if (!title.trim() || !body.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/reviews/submit', {
        product_id: product.id,
        rating: rating,
        title: title.trim(),
        body: body.trim(),
        reviewer_name: user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}`
          : user.email.split('@')[0],
        reviewer_email: user.email
      });

      toast.success(response.data.message || 'Review submitted successfully!');
      
      // Reset form
      setTitle('');
      setBody('');
      setRating(5);
      
      // Callback to refresh reviews
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.detail || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8">
      <h3 className="font-oswald text-2xl font-bold text-white mb-6">
        Write a Review
      </h3>

      {/* Rating Stars */}
      <div className="mb-6">
        <label className="block text-zinc-300 font-manrope mb-2">
          Your Rating *
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? 'text-orange-500 fill-orange-500'
                    : 'text-zinc-600'
                }`}
              />
            </button>
          ))}
          <span className="ml-4 text-zinc-300 font-manrope">
            {rating} {rating === 1 ? 'star' : 'stars'}
          </span>
        </div>
      </div>

      {/* Review Title */}
      <div className="mb-6">
        <label className="block text-zinc-300 font-manrope mb-2">
          Review Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience in a few words"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white font-manrope focus:outline-none focus:border-orange-500 transition-colors"
          maxLength={100}
          required
        />
        <p className="text-zinc-500 text-sm mt-1">
          {title.length}/100 characters
        </p>
      </div>

      {/* Review Body */}
      <div className="mb-6">
        <label className="block text-zinc-300 font-manrope mb-2">
          Your Review *
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell us what you think about this product..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white font-manrope focus:outline-none focus:border-orange-500 transition-colors resize-none"
          rows={6}
          maxLength={1000}
          required
        />
        <p className="text-zinc-500 text-sm mt-1">
          {body.length}/1000 characters
        </p>
      </div>

      {/* User Info Display */}
      {user && (
        <div className="mb-6 text-sm text-zinc-400">
          Posting as: <span className="text-orange-500">{user.email}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !user}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>

      <p className="text-zinc-500 text-sm mt-4 text-center">
        Your review will be published after moderation
      </p>
    </form>
  );
};

export default ReviewForm;

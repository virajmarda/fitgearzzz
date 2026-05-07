import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const messages = [
  { text: 'New Arrivals: Discover the Latest in Premium Fitness Equipment' },
  { text: 'Limited Time Sale: Up to 40% Off on Select Products' },
  { text: 'Free Shipping on Orders Above ₹499 | Pan India Delivery' },
  { text: 'Shop Now, Pay Later | Cash on Delivery Available' },
];

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white py-2.5 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="text-sm tracking-wide font-medium">
          {messages[currentIndex].text}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-orange-600 p-1 rounded transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;

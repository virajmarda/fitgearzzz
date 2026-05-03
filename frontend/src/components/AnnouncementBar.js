import React, { useState, useEffect } from 'react';
import { X, Truck, RotateCcw, ShieldCheck, Tag } from 'lucide-react';

const messages = [
  { icon: <Truck className="w-4 h-4 inline mr-1" />, text: '🚚 FREE Shipping on orders above ₹499 | Pan India Delivery' },
  { icon: <ShieldCheck className="w-4 h-4 inline mr-1" />, text: '✅ 100% Authentic Products | Verified Quality' },
  { icon: <RotateCcw className="w-4 h-4 inline mr-1" />, text: '🔄 Easy 7-Day Returns & Refunds | No Questions Asked' },
  { icon: <Tag className="w-4 h-4 inline mr-1" />, text: '💳 COD Available | Pay on Delivery Across India' },
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
    <div className="bg-orange-500 text-white py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="text-sm font-semibold animate-pulse">
          {messages[currentIndex].text}
        </p>
      </div>
      <button
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

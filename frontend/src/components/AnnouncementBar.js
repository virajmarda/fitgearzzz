import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MESSAGES = [
  { text: 'Free shipping on all orders above', highlight: '\u20b9499', suffix: '' },
  { text: 'Cash on delivery available', highlight: 'pan-India', suffix: '\u2014 no advance needed' },
  { text: '7-day', highlight: 'hassle-free returns', suffix: ' on every order' },
  { text: 'New arrivals just dropped', highlight: '', suffix: '' },
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % MESSAGES.length);
        setFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const msg = MESSAGES[idx];

  return (
    <div className="relative bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center h-9 gap-2">
          <p
            className={`text-xs text-zinc-300 text-center transition-opacity duration-300 ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {msg.text}{' '}
            {msg.highlight && (
              <span className="text-orange-500 font-semibold">{msg.highlight}</span>
            )}
            {msg.suffix}
            {msg.text === 'New arrivals just dropped' && (
              <Link
                to="/products?tag=new"
                className="inline-flex items-center gap-0.5 text-orange-500 font-semibold hover:text-orange-400 ml-1"
              >
                Shop now <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;

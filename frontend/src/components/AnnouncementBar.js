import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Rotating bar — four factual signals. Copy should be short, specific, and dismissible.
const MESSAGES = [
  { text: 'Free shipping on orders above', highlight: '₹499', suffix: '', to: '/products' },
  { text: 'COD available', highlight: 'pan-India', suffix: '— no advance required', to: '/products' },
  { text: '7-day returns', highlight: 'on every order', suffix: '. No forms.', to: '/products' },
  { text: 'New arrivals in stock', highlight: '— check the catalog', suffix: '', to: '/products' },
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
      }, 280);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const msg = MESSAGES[idx];

  return (
    <div className="relative bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2">
        <p
          className={`text-xs text-zinc-300 text-center transition-opacity duration-200 ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {msg.text}{' '}
          {msg.highlight && (
            <strong className="text-white font-semibold">{msg.highlight}</strong>
          )}
          {msg.suffix && <span className="text-zinc-500">{msg.suffix}</span>}
          {msg.to && (
            <Link
              to={msg.to}
              className="ml-2 inline-flex items-center gap-0.5 text-orange-500 hover:text-orange-400 font-medium transition-colors"
            >
              Shop now <ChevronRight className="w-3 h-3" />
            </Link>
          )}
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;

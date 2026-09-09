import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ANNOUNCEMENTS } from '../config/siteConfig';

// Calm rotating announcement bar (paper theme). No fake scarcity, no timers.
const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || ANNOUNCEMENTS.length <= 1) return undefined;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((p) => (p + 1) % ANNOUNCEMENTS.length);
        setFading(false);
      }, 260);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;
  const msg = ANNOUNCEMENTS[idx];

  return (
    <div className="fg-surface relative bg-[#171717] text-[#f1eee8]">
      <div className="max-w-[1440px] mx-auto px-4 py-2 flex items-center justify-center">
        <p
          className={`text-[11px] tracking-[0.02em] text-center transition-opacity duration-200 ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Link to={msg.to} className="hover:text-[#f15a24] transition-colors">
            {msg.text}{' '}
            {msg.highlight && (
              <strong className="font-bold text-[#ffffff]">{msg.highlight}</strong>
            )}
          </Link>
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#96918a] hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;

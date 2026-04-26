import React from 'react';
import { X } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-orange-500 text-white py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="text-sm font-semibold">
          🎉 Free Shipping on orders above ₹999 | COD Available | Easy Returns
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 hover:bg-orange-600 p-1 rounded transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;

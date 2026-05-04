import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on initialization
    const savedWishlist = localStorage.getItem('fitgearzzz_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitgearzzz_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      // Check if product already exists
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.info('Already in wishlist');
        return prev;
      }
      toast.success('Added to wishlist!');
      return [...prev, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const filtered = prev.filter((item) => item.id !== productId);
      toast.success('Removed from wishlist');
      return filtered;
    });
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared');
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;

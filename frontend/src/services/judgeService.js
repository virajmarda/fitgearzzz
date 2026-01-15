import api from '../utils/api';

/**
 * Fetch reviews for a product via backend proxy (avoids CORS)
 */
export const fetchProductReviews = async (shopifyProductId) => {
  try {
    // Extract numeric ID from Shopify GID format
    const productId = shopifyProductId.includes('gid://') 
      ? shopifyProductId.split('/').pop()
      : shopifyProductId;
    
    // Call YOUR backend instead of Judge.me directly
    const response = await api.get(`/reviews/${productId}`);
    
    return {
      reviews: response.data.reviews || [],
      rating: response.data.rating || 0,
      reviewCount: response.data.reviewCount || 0
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      reviews: [],
      rating: 0,
      reviewCount: 0
    };
  }
};

/**
 * Get review widget data for a product
 */
export const fetchReviewWidget = async (productHandle) => {
  try {
    const response = await api.get(`/reviews/widget/${productHandle}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching review widget:', error);
    return null;
  }
};

/**
 * Initialize Judge.me widget on the page
 */
export const initializeJudgeWidget = (productId, productHandle) => {
  // Load Judge.me script if not already loaded
  if (!window.jdgm) {
    const script = document.createElement('script');
    script.src = 'https://cdn.judge.me/shopify_v2.js';
    script.async = true;
    script.onload = () => {
      if (window.jdgm) {
        window.jdgm.customerId = null;
        window.jdgm.productId = productId;
      }
    };
    document.body.appendChild(script);
  } else {
    // Reinitialize if script already loaded
    if (window.jdgm && window.jdgm.reload) {
      window.jdgm.reload();
    }
  }
};


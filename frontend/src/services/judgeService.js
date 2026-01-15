const SHOP_DOMAIN = 'fitgearzzz.myshopify.com';
const JUDGE_API_URL = 'https://judge.me/api/v1';

/**
 * Fetch reviews for a product by Shopify product ID
 */
export const fetchProductReviews = async (shopifyProductId) => {
  try {
    // Extract numeric ID from Shopify GID format
    const productId = shopifyProductId.includes('gid://') 
      ? shopifyProductId.split('/').pop()
      : shopifyProductId;
    
    const response = await fetch(
      `${JUDGE_API_URL}/reviews?shop_domain=${SHOP_DOMAIN}&external_id=${productId}&per_page=50`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    const data = await response.json();
    return {
      reviews: data.reviews || [],
      rating: data.rating || 0,
      reviewCount: data.reviews?.length || 0
    };
  } catch (error) {
    console.error('Error fetching Judge.me reviews:', error);
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
    const response = await fetch(
      `${JUDGE_API_URL}/widgets/product_review?shop_domain=${SHOP_DOMAIN}&handle=${productHandle}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch review widget');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching review widget:', error);
    return null;
  }
};

/**
 * Initialize Judge.me widget on the page
 * Call this after the component mounts
 */
export const initializeJudgeWidget = (productId, productHandle) => {
  // Load Judge.me script if not already loaded
  if (!window.jdgm) {
    const script = document.createElement('script');
    script.src = 'https://cdn.judge.me/shopify_v2.js';
    script.async = true;
    script.onload = () => {
      if (window.jdgm) {
        window.jdgm.customerId = null; // Set if user is logged in
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

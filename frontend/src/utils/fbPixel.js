// Facebook Pixel utilities for FitGearzzz
// Pixel ID: 1635842960929487

export const FB_PIXEL_ID = '1635842960929487';

// Initialize the Facebook Pixel
export const init = () => {
  // Check if already initialized
  if (window.fbq) {
    console.log('Facebook Pixel already initialized');
    return;
  }
  
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  window.fbq('init', FB_PIXEL_ID);
  console.log('Facebook Pixel initialized:', FB_PIXEL_ID);
};

// Track page view
export const pageview = () => {
  if (window.fbq) {
    window.fbq('track', 'PageView');
    console.log('FB Pixel: PageView tracked');
  }
};

// Track custom events
export const event = (name, options = {}) => {
  if (window.fbq) {
    window.fbq('track', name, options);
    console.log('FB Pixel event tracked:', name, options);
  }
};

// View Content - Product page viewed
export const trackViewContent = (product) => {
  event('ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'INR'
  });
};

// Add to Cart
export const trackAddToCart = (product, quantity = 1) => {
  event('AddToCart', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price * quantity,
    currency: 'INR',
    quantity: quantity
  });
};

// Initiate Checkout
export const trackInitiateCheckout = (products, totalValue) => {
  event('InitiateCheckout', {
    content_ids: products.map(p => p.id),
    content_type: 'product',
    value: totalValue,
    currency: 'INR',
    num_items: products.length
  });
};

// Purchase - Most important for sales tracking!
export const trackPurchase = (orderId, products, totalValue) => {
  event('Purchase', {
    content_ids: products.map(p => p.id),
    content_type: 'product',
    value: totalValue,
    currency: 'INR',
    num_items: products.length,
    order_id: orderId
  });
};

// Search
export const trackSearch = (searchQuery) => {
  event('Search', {
    search_string: searchQuery
  });
};

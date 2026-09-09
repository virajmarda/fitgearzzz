// src/lib/analytics.js
// Lightweight, privacy-friendly event layer. Logs in dev; forwards to a global
// dataLayer / gtag if present. Does NOT fabricate purchase or revenue data.
//
// Prepared events: view_item, select_item, search, add_to_cart,
// remove_from_cart, view_cart, begin_checkout, newsletter_signup.

export const trackEvent = (event, params = {}) => {
  try {
    if (typeof window !== 'undefined') {
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event, ...params });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', event, params);
      }
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, params);
    }
  } catch {
    /* never let analytics break the UI */
  }
};

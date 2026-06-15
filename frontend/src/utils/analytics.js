// src/utils/analytics.js
// Unified analytics adapter — no-op safe when env vars are absent.
// Supports GA4 (gtag) and Meta Pixel out of the box.
// Usage:
//   import { trackEvent, trackPageView } from '../utils/analytics';

const GA_ID = process.env.REACT_APP_GA_ID;
const PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;

// ─── Initialisation ─────────────────────────────────────────────────────────

export function initAnalytics() {
  if (GA_ID && typeof window !== 'undefined' && !window.__gaInitialised) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
    window.__gaInitialised = true;
  }

  if (PIXEL_ID && typeof window !== 'undefined' && !window.__pixelInitialised) {
    !function(f,b,e,v,n,t,s) {
      if(f.fbq) return; n=f.fbq=function() {
        n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments);
      };
      if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
      n.queue=[]; t=b.createElement(e); t.async=!0;
      t.src=v; s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.__pixelInitialised = true;
  }
}

// ─── Page view ──────────────────────────────────────────────────────────────

export function trackPageView(path) {
  if (GA_ID && window.gtag) {
    window.gtag('event', 'page_view', { page_path: path });
  }
  if (PIXEL_ID && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

// ─── Generic event ──────────────────────────────────────────────────────────

export function trackEvent(name, params = {}) {
  if (GA_ID && window.gtag) {
    window.gtag('event', name, params);
  }
  if (PIXEL_ID && window.fbq) {
    window.fbq('trackCustom', name, params);
  }
}

// ─── Ecommerce events (GA4 + Meta Pixel standard names) ────────────────────

export function trackViewContent({ productId, productName, price, currency = 'INR' }) {
  trackEvent('view_item', {
    currency,
    value: price,
    items: [{ item_id: productId, item_name: productName, price }],
  });
  if (PIXEL_ID && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      currency,
      value: price,
    });
  }
}

export function trackAddToCart({ productId, productName, variantId, price, quantity, currency = 'INR' }) {
  trackEvent('add_to_cart', {
    currency,
    value: price * quantity,
    items: [{ item_id: variantId || productId, item_name: productName, price, quantity }],
  });
  if (PIXEL_ID && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [variantId || productId],
      content_name: productName,
      content_type: 'product',
      value: price * quantity,
      currency,
    });
  }
}

export function trackInitiateCheckout({ value, currency = 'INR', numItems }) {
  trackEvent('begin_checkout', { currency, value, num_items: numItems });
  if (PIXEL_ID && window.fbq) {
    window.fbq('track', 'InitiateCheckout', { value, currency, num_items: numItems });
  }
}

export function trackLead({ email }) {
  trackEvent('generate_lead', { email });
  if (PIXEL_ID && window.fbq) {
    window.fbq('track', 'Lead');
  }
}

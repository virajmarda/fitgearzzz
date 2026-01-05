// Shopify headless configuration
// This file contains all Shopify-related domain URLs for the headless setup

// Shopify store domain (for Storefront API)
export const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN || 'fitgearzzz.myshopify.com';

// Shopify Storefront API access token
export const STOREFRONT_ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '4f69d01e467efc58595c74f4420ab3bd';

// Checkout domain - Custom domain for Shopify checkout
export const CHECKOUT_DOMAIN = process.env.REACT_APP_CHECKOUT_DOMAIN || 'https://checkout.fitgearzzz.com';

// Customer account domain - Custom domain for Shopify customer accounts
export const ACCOUNT_DOMAIN = process.env.REACT_APP_ACCOUNT_DOMAIN || 'https://account.fitgearzzz.com';

// Generate checkout URL with cart data
export const getCheckoutUrl = (checkoutId) => {
  // If checkoutId is provided, use it to generate Shopify checkout URL
  if (checkoutId) {
    // Extract the checkout ID from the full GraphQL ID
    const id = checkoutId.split('/').pop();
    return `${CHECKOUT_DOMAIN}/cart/c/${id}`;
  }
  // Default checkout page
  return `${CHECKOUT_DOMAIN}/cart`;
};

// Generate customer account URLs
export const ACCOUNT_URLS = {
  login: `${ACCOUNT_DOMAIN}/account/login`,
  register: `${ACCOUNT_DOMAIN}/account/register`,
  profile: `${ACCOUNT_DOMAIN}/account`,
  orders: `${ACCOUNT_DOMAIN}/account/orders`,
  addresses: `${ACCOUNT_DOMAIN}/account/addresses`,
};

// Storefront API URL
export const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;

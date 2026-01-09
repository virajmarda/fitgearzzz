// frontend/src/utils/shopifyAuth.js
import { ACCOUNT_DOMAIN } from '../config/shopify';

const SHOPIFY_AUTH_CONFIG = {
  clientId: '49163ae9-7e32-4d93-a29c-d9fb330124c5',
  authEndpoint: `${ACCOUNT_DOMAIN}/authentication/oauth/authorize`,
  // tokenEndpoint is still defined but NOT used directly in the browser
  tokenEndpoint: `${ACCOUNT_DOMAIN}/authentication/oauth/token`,
  logoutEndpoint: `${ACCOUNT_DOMAIN}/authentication/logout`,
  redirectUri: `${window.location.origin}/auth/callback`,
  scope: 'openid email customer-account-api:full'
};

// Generate random string for PKCE
function generateRandomString(length = 43) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Generate code challenge from verifier
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Initiate login - redirect to Shopify
export async function initiateShopifyLogin() {
    console.log('initiateShopifyLogin start');
  const state = generateRandomString();
  const codeVerifier = generateRandomString();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store in sessionStorage
  sessionStorage.setItem('oauth_state', state);
  sessionStorage.setItem('code_verifier', codeVerifier);

  const params = new URLSearchParams({
    client_id: SHOPIFY_AUTH_CONFIG.clientId,
    response_type: 'code',
    redirect_uri: SHOPIFY_AUTH_CONFIG.redirectUri,
    scope: SHOPIFY_AUTH_CONFIG.scope,
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

    const authorizeUrl = `${SHOPIFY_AUTH_CONFIG.authEndpoint}?${params}`;
    console.log('Redirecting to', authorizeUrl);

  window.location.href = authorizeUrl;}

// Handle OAuth callback (now via backend API route)
export async function handleOAuthCallback(code, state, codeVerifierFromCaller) {
  const storedState = sessionStorage.getItem('oauth_state');
  const storedCodeVerifier = sessionStorage.getItem('code_verifier');

  if (state !== storedState) {
    throw new Error('Invalid state parameter');
  }

  const codeVerifier = codeVerifierFromCaller || storedCodeVerifier;
  if (!codeVerifier) {
    throw new Error('Missing PKCE code_verifier');
  }

  // Call your own backend, not Shopify directly
  const tokenResponse = await fetch('/api/shopify-auth/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      codeVerifier
    })
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error('Failed to exchange code for token: ' + errorText);
  }

  const tokens = await tokenResponse.json();

  // Store tokens
  sessionStorage.setItem('access_token', tokens.access_token);
  if (tokens.refresh_token) {
    sessionStorage.setItem('refresh_token', tokens.refresh_token);
  }
  if (tokens.id_token) {
    sessionStorage.setItem('id_token', tokens.id_token);
  }
  if (tokens.expires_in) {
    sessionStorage.setItem(
      'token_expires_at',
      Date.now() + tokens.expires_in * 1000
    );
  }

  // Clean up PKCE state
  sessionStorage.removeItem('oauth_state');
  sessionStorage.removeItem('code_verifier');

  return tokens;
}

// Get customer data from Customer Account API
export async function getCustomerFromShopify() {
  const accessToken = sessionStorage.getItem('access_token');
  if (!accessToken) return null;

  try {
    const response = await fetch(
      `${ACCOUNT_DOMAIN}/account/customer/api/2024-10/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          query: `
          query getCustomer {
            customer {
              id
              displayName
              emailAddress {
                emailAddress
              }
              firstName
              lastName
            }
          }
        `
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const result = await response.json();
    return result.data?.customer;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
}

// Logout
export function logoutShopify() {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('id_token');
  sessionStorage.removeItem('token_expires_at');
  window.location.href = SHOPIFY_AUTH_CONFIG.logoutEndpoint;
}

// Check if user is authenticated
export function isAuthenticated() {
  const accessToken = sessionStorage.getItem('access_token');
  const expiresAt = sessionStorage.getItem('token_expires_at');

  if (!accessToken) return false;
  if (expiresAt && Date.now() > parseInt(expiresAt, 10)) {
    // Token expired
    logoutShopify();
    return false;
  }

  return true;
}

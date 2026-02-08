// frontend/src/utils/shopifyAuth.js
import { ACCOUNT_DOMAIN, SHOPIFY_CLIENT_ID } from '../config/shopify';

// Core Shopify Accounts configuration
const SHOPIFY_AUTH_CONFIG = {
  clientId: SHOPIFY_CLIENT_ID,
  authEndpoint: `${ACCOUNT_DOMAIN}/authentication/oauth/authorize`,
  tokenEndpoint: `${ACCOUNT_DOMAIN}/authentication/oauth/token`,
  logoutEndpoint: `${ACCOUNT_DOMAIN}/authentication/logout`,
  redirectUri: `${window.location.origin}/auth/callback`,
  scope: 'openid email customer-account-api:full',
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

// Generate code challenge from verifier (S256)
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Initiate login - redirect to Shopify Accounts
export async function initiateShopifyLogin() {
  console.log('🔐 Starting Shopify OAuth flow...');

  // Clear any existing OAuth state
  sessionStorage.removeItem('oauth_state');
  sessionStorage.removeItem('code_verifier');
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('id_token');
  sessionStorage.removeItem('token_expires_at');
  sessionStorage.removeItem('oauth_initiated_at');

  const state = generateRandomString();
  const codeVerifier = generateRandomString();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store NEW OAuth parameters
  sessionStorage.setItem('oauth_state', state);
  sessionStorage.setItem('code_verifier', codeVerifier);
  sessionStorage.setItem('oauth_initiated_at', Date.now().toString());

  const params = new URLSearchParams({
    client_id: SHOPIFY_AUTH_CONFIG.clientId,
    response_type: 'code',
    redirect_uri: SHOPIFY_AUTH_CONFIG.redirectUri,
    scope: SHOPIFY_AUTH_CONFIG.scope,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const authorizeUrl = `${SHOPIFY_AUTH_CONFIG.authEndpoint}?${params.toString()}`;
  console.log('🔗 Redirecting to:', authorizeUrl);

  // Immediate redirect
  window.location.replace(authorizeUrl);
}

// Handle OAuth callback (called from /auth/callback route)
export async function handleOAuthCallback(code, state) {
  console.log('📥 Processing OAuth callback...');

  const storedState = sessionStorage.getItem('oauth_state');
  const storedCodeVerifier = sessionStorage.getItem('code_verifier');
  const initiatedAt = sessionStorage.getItem('oauth_initiated_at');

  // Check if OAuth was initiated within last 10 minutes
  if (initiatedAt) {
    const elapsed = Date.now() - parseInt(initiatedAt, 10);
    if (elapsed > 600000) {
      console.error('❌ OAuth flow expired (>10 minutes old)');
      sessionStorage.clear();
      throw new Error('Authentication session expired. Please try again.');
    }
  }

  if (state !== storedState) {
    console.error('❌ State mismatch!');
    throw new Error('Invalid state parameter');
  }

  if (!storedCodeVerifier) {
    console.error('❌ Missing code_verifier!');
    throw new Error('Missing PKCE code_verifier');
  }

  console.log('✅ State verified');
  console.log('📤 Exchanging code for tokens via backend...');

  try {
    // Same-origin /api route → proxied to FastAPI backend
    const tokenResponse = await fetch('/api/shopify-auth/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        codeVerifier: storedCodeVerifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Token exchange failed:', errorText);
      throw new Error(`Failed to exchange code for token: ${errorText}`);
    }

    const tokens = await tokenResponse.json();
    console.log('✅ Tokens received!');

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
        (Date.now() + tokens.expires_in * 1000).toString()
      );
    }

    // Clean up OAuth flow state (but keep tokens)
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('code_verifier');
    sessionStorage.removeItem('oauth_initiated_at');

    console.log('✅ Login successful!');
    return tokens;
  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    // Clear everything on error
    sessionStorage.clear();
    throw error;
  }
}

// Get customer data via backend API (same-origin proxy to FastAPI)
export async function getCustomerFromShopify() {
  const accessToken = sessionStorage.getItem('access_token');
  console.log(
    'Access token from sessionStorage (first 25):',
    accessToken ? accessToken.slice(0, 25) : null
  );

  if (!accessToken) {
    console.log('⚠️ No access token found');
    return null;
  }

  try {
    console.log('👤 Fetching customer data via backend...');

    // Same-origin /api route → proxied to FastAPI backend
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('❌ Failed to fetch customer data:', response.status);
      return null;
    }

    const customer = await response.json();

    if (customer) {
      console.log('✅ Customer data retrieved');
      return {
        id: customer.id,
        displayName: customer.name,
        emailAddress: {
          emailAddress: customer.email,
        },
        firstName: customer.firstName,
        lastName: customer.lastName,
      };
    } else {
      console.warn('⚠️ No customer data in response');
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching customer:', error);
    return null;
  }
}

// Logout
export function logoutShopify() {
  console.log('👋 Logging out...');
  sessionStorage.clear();

  // Redirect to Shopify logout
  window.location.href = SHOPIFY_AUTH_CONFIG.logoutEndpoint;
}

// Check if user is authenticated
export function isAuthenticated() {
  const accessToken = sessionStorage.getItem('access_token');
  const expiresAt = sessionStorage.getItem('token_expires_at');

  if (!accessToken) return false;

  if (expiresAt && Date.now() > parseInt(expiresAt, 10)) {
    console.log('⚠️ Token expired');
    logoutShopify();
    return false;
  }

  return true;
}

// src/context/AuthContext.js
// Shopify Storefront Customer API — NO backend proxy.
// Uses customerAccessToken stored in localStorage.
// For full PKCE OAuth (Customer Account API), set REACT_APP_SHOPIFY_CUSTOMER_ACCOUNT_ID
// and REACT_APP_SHOPIFY_AUTH_REDIRECT_URI — the login() function will redirect there.

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { STOREFRONT_API_URL, STOREFRONT_ACCESS_TOKEN } from '../config/shopify';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ─── Storefront helper (same pattern as CartContext) ───────────────────────────────────────
async function storefrontFetch(query, variables = {}) {
  const res = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Storefront API error: ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

// ─── GraphQL mutations ────────────────────────────────────────────────────────────────────
const GQL_CUSTOMER_LOGIN = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const GQL_CUSTOMER_REGISTER = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email firstName lastName }
      customerUserErrors { code field message }
    }
  }
`;

const GQL_CUSTOMER_GET = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      orders(first: 5) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice { amount currencyCode }
          }
        }
      }
    }
  }
`;

const GQL_TOKEN_RENEW = `
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken { accessToken expiresAt }
      userErrors { field message }
    }
  }
`;

const GQL_TOKEN_DELETE = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(deletedAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors { field message }
    }
  }
`;

// ─── Token helpers ────────────────────────────────────────────────────────────────────────────const TOKEN_KEY = 'shopify_customer_token';
const TOKEN_EXPIRY_KEY = 'shopify_customer_token_expiry';

const saveToken = (token, expiresAt) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (expiresAt) localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!token) return null;
  if (expiry && new Date(expiry) <= new Date()) {
    clearToken();
    return null;
  }
  return token;
};

// ─── Provider ────────────────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // — Fetch customer profile using the stored access token
  const fetchCustomer = useCallback(async (token) => {
    try {
      const data = await storefrontFetch(GQL_CUSTOMER_GET, { customerAccessToken: token });
      if (data.customer) setUser(data.customer);
      else clearToken();
    } catch (err) {
      console.error('fetchCustomer error:', err);
      clearToken();
    } finally {
      setLoading(false);
    }
  }, []);

  // — Hydrate session on mount
  useEffect(() => {
    const token = getToken();
    if (token) fetchCustomer(token);
    else setLoading(false);
  }, [fetchCustomer]);

  // — Login with email + password
  const login = async (email, password) => {
    try {
      const data = await storefrontFetch(GQL_CUSTOMER_LOGIN, {
        input: { email, password },
      });
      const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;
      if (customerUserErrors?.length) throw new Error(customerUserErrors[0].message);
      const { accessToken, expiresAt } = customerAccessToken;
      saveToken(accessToken, expiresAt);
      await fetchCustomer(accessToken);
      toast.success('Welcome back!');
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
      return { success: false, error: err.message };
    }
  };

  // — Register a new customer account
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      const data = await storefrontFetch(GQL_CUSTOMER_REGISTER, {
        input: { firstName, lastName, email, password },
      });
      const { customer, customerUserErrors } = data.customerCreate;
      if (customerUserErrors?.length) {
        const alreadyExists = customerUserErrors.some((e) => e.code === 'TAKEN');
        if (alreadyExists) {
          // Fall through to login if account already exists
          return login(email, password);
        }
        throw new Error(customerUserErrors[0].message);
      }
      // Auto-login after successful registration
      return login(email, password);
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
      return { success: false, error: err.message };
    }
  };

  // — Logout: revoke token on Shopify + clear local state
  const logout = async () => {
    const token = getToken();
    if (token) {
      try {
        await storefrontFetch(GQL_TOKEN_DELETE, { customerAccessToken: token });
      } catch {
        // Non-critical — clear locally regardless
      }
    }
    clearToken();
    setUser(null);
    toast.success('Logged out successfully.');
  };

  // — Derived helpers
  const isAuthenticated = () => !!getToken() && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

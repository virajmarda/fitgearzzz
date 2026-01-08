import React, { createContext, useContext, useState, useEffect } from 'react';
import { customerLogin, customerRegister, getCustomer } from '../services/shopifyService';
import { initiateShopifyLogin, getCustomerFromShopify, isAuthenticated, logoutShopify } from '../utils/shopifyAuth';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated via Shopify Customer Account API
    if (isAuthenticated()) {
      fetchShopifyCustomer();
    } else {
      // Fallback to old token-based auth
      const token = localStorage.getItem('token');
      if (token) {
        fetchUser(token);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchShopifyCustomer = async () => {
    try {
      const customerData = await getCustomerFromShopify();
      if (customerData) {
        setUser({
          ...customerData,
          source: 'shopify_customer_account',
          authenticated: true
        });
      }
    } catch (error) {
      console.error('Error fetching Shopify customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (token) => {
    try {
      const customerData = await getCustomer(token);
      setUser(customerData);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // New method: Login with Shopify Customer Account API
  const loginWithShopify = () => {
    initiateShopifyLogin();
  };

  // Legacy method: Login with email/password (Storefront API)
  const login = async (email, password) => {
    try {
      const accessToken = await customerLogin(email, password);
      localStorage.setItem('token', accessToken.accessToken);
      const customerData = await getCustomer(accessToken.accessToken);
      setUser(customerData);
      toast.success('Login successful!');
      return { accessToken, user: customerData };
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const result = await customerRegister(email, password, firstName, lastName);
      toast.success('Registration successful! Please log in.');
      return result;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    // Check if user is logged in via Shopify Customer Account API
    if (isAuthenticated()) {
      logoutShopify();
    } else {
      // Legacy logout
      localStorage.removeItem('token');
      localStorage.removeItem('shopify_authenticated');
      localStorage.removeItem('shopify_auth_time');
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithShopify,
    register,
    logout,
    isAuthenticated: () => user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

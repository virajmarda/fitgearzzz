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
    if (isAuthenticated()) {
      fetchShopifyCustomer();
    } else {
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
          id: customerData.id,
          email: customerData.emailAddress?.emailAddress || '',
          name:
            customerData.displayName ||
            `${customerData.firstName} ${customerData.lastName}`,
          displayName: customerData.displayName,
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          authenticated: true,
          source: 'shopify_customer_account',
        });
      } else {
        setUser(null);
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('id_token');
      }
    } catch (error) {
      console.error('Error fetching Shopify customer:', error);
      setUser(null);
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('id_token');
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

  const loginWithShopify = () => {
    console.log('✅ loginWithShopify called');
    initiateShopifyLogin();
  };

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
    try {
      // Shopify Customer Account API logout (if in that flow)
      if (isAuthenticated()) {
        logoutShopify();
      }

      // Clear all tokens / flags from both flows
      localStorage.removeItem('token');
      localStorage.removeItem('shopify_authenticated');
      localStorage.removeItem('shopify_auth_time');
      localStorage.removeItem('shopify_customer_token');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('id_token');

      setUser(null);
      toast.success('Logged out successfully');
    } finally {
      // Hard redirect to main domain home, replace history
      window.location.replace('https://fitgearzzz.com');
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
    fetchShopifyCustomer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { customerLogin, customerRegister, getCustomer } from '../services/shopifyService';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
  } else if (localStorage.getItem('shopify_authenticated') === 'true') {
      // User is authenticated via Shopify Customer accounts
      setUser({ 
        authenticated: true,
        source: 'shopify_customer_accounts'
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const customerData = await getCustomer(token);
      setUser(customerData);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
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
    localStorage.removeItem('token');
        localStorage.removeItem('shopify_authenticated');
    localStorage.removeItem('shopify_auth_time');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

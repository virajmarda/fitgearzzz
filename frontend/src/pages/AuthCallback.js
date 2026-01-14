// frontend/src/pages/AuthCallback.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { handleOAuthCallback } from '../utils/shopifyAuth';
import { useAuth } from '../context/AuthContext';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const { fetchShopifyCustomer } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const processCallback = async () => {
      // Prevent double execution in React StrictMode
      if (hasProcessed.current) {
        return;
      }
      hasProcessed.current = true;

      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) {
          toast.error('Invalid authentication callback');
          navigate('/', { replace: true });
          return;
        }

        // MUST match the key used in initiateShopifyLogin
        const codeVerifier = window.sessionStorage.getItem('code_verifier');

        if (!codeVerifier) {
          console.error('Missing PKCE code_verifier in sessionStorage');
          toast.error('Authentication failed. Please try again.');
          navigate('/', { replace: true });
          return;
        }

        // Exchange code for tokens
        await handleOAuthCallback(code, state, codeVerifier);

        // Clear code_verifier after use to prevent reuse
        window.sessionStorage.removeItem('code_verifier');

        // Fetch customer data to populate AuthContext
        await fetchShopifyCustomer();

        toast.success('Successfully logged in!');
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Login failed. Please try again.');
        navigate('/', { replace: true });
      } finally {
        setProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, navigate, fetchShopifyCustomer]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      {processing ? (
        <div>
          <p>Completing your login...</p>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}

export default AuthCallback;

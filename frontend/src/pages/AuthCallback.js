// frontend/src/pages/AuthCallback.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { handleOAuthCallback } from '../utils/shopifyAuth';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) {
          toast.error('Invalid authentication callback');
                  window.location.href = 'https://fitgearzzz.com/';
          return;
        }

        // MUST match the key used in initiateShopifyLogin
        const codeVerifier = window.sessionStorage.getItem('code_verifier');
        if (!codeVerifier) {
          console.error('Missing PKCE code_verifier in sessionStorage');
          toast.error('Authentication failed. Please try again.');
                  window.location.href = 'https://fitgearzzz.com/';
          return;
        }

        await handleOAuthCallback(code, state, codeVerifier);

        toast.success('Successfully logged in!');
              window.location.href = 'https://fitgearzzz.com/';
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error(''/' failed. Please try again.');
              window.location.href = 'https://fitgearzzz.com/';
      } finally {
        setProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {processing ? (
        <p className="text-lg font-medium">Completing your login...</p>
      ) : (
        <p className="text-lg font-medium">Redirecting...</p>
      )}
    </div>
  );
}

export default AuthCallback;

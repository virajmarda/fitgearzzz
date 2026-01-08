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
          navigate('/', { replace: true });
          return;
        }

        // Read the PKCE code_verifier that was stored before redirect
        const codeVerifier = window.sessionStorage.getItem('pkce_code_verifier');
        if (!codeVerifier) {
          console.error('Missing PKCE code_verifier in sessionStorage');
          toast.error('Authentication failed. Please try again.');
          navigate('/', { replace: true });
          return;
        }

        // Exchange code for tokens via backend (no direct call to Shopify)
        await handleOAuthCallback(code, state, codeVerifier);

        toast.success('Successfully logged in!');

        // Redirect to home or orders page
        navigate('/orders', { replace: true });

        // Force reload to update navbar/auth state
        window.location.reload();
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/', { replace: true });
      } finally {
        setProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {processing ? (
        <>
          <p className="text-lg font-medium">Completing your login...</p>
        </>
      ) : (
        <p className="text-lg font-medium">Redirecting...</p>
      )}
    </div>
  );
}

export default AuthCallback;

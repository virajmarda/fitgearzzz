// frontend/src/pages/AuthCallback.js
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleOAuthCallback } from '../utils/shopifyAuth';
import { toast } from 'sonner';

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

        // Exchange code for tokens
        await handleOAuthCallback(code, state);
        
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
    <div className="min-h-screen flex items-center justify-center bg-[#030303]">
      <div className="text-center">
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white text-xl mt-4">Completing your login...</p>
          </>
        ) : (
          <p className="text-white text-xl">Redirecting...</p>
        )}
      </div>
    </div>
  );
}

export default AuthCallback;

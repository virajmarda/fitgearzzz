import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processSession = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const sessionId = params.get('session_id');

        if (!sessionId) {
          throw new Error('No session ID found');
        }

        // Exchange session_id for user data
        const response = await api.post('/auth/google/session', null, {
          headers: {
            'X-Session-ID': sessionId
          },
          withCredentials: true
        });

        if (response.data) {
          toast.success(`Welcome ${response.data.name}!`);
          // Navigate to home with user data
          navigate('/', { state: { user: response.data }, replace: true });
          window.location.reload(); // Reload to update auth state
        }
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/', { replace: true });
      }
    };

    processSession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-400 font-manrope">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

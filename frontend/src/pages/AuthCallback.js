// frontend/src/pages/AuthCallback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
        // When Shopify sends user back here, mark them as authenticated
    localStorage.setItem('shopify_authenticated', 'true');
    localStorage.setItem('shopify_auth_time', Date.now().toString());
    
    // Redirect to home
    navigate('/', { replace: true });
    
    // Force reload to update navbar/auth state
    window.location.reload();navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303]">
      <p className="text-white text-xl">Signing you in...</p>
    </div>
  );}

export default AuthCallback;

// frontend/src/pages/AuthCallback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: call your backend or a Cloud Function that
    // exchanges the Shopify code for a customer token,
    // then set something like localStorage/session and redirect.
    // For now, just redirect home.
    navigate('/', { replace: true });
  }, [navigate]);

  return <p>Signing you in...</p>;
}

export default AuthCallback;

// frontend/src/components/AuthModal.js
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ open, onClose }) => {
  const { loginWithShopify } = useAuth();

  const handleShopifyLogin = () => {
        loginWithShopify();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="bg-zinc-900 border-zinc-800 text-white rounded-3xl shadow-2xl"
        data-testid="auth-modal"
      >
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl text-center">
            Welcome to FitGearzzz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-6">
          {/* Shopify Login Button */}
          <Button
            onClick={handleShopifyLogin}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-oswald uppercase tracking-wider rounded-full py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg 
              className="w-6 h-6 mr-2" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M16.373 4.618c-.031-.032-.095-.063-.159-.063-.031 0-2.398-.095-2.398-.095s-1.396-1.396-1.553-1.553c-.158-.158-.474-.127-.6-.095-.031 0-.284.095-.726.221-.41-1.205-1.142-2.3-2.43-2.3-.063 0-.127 0-.19.032-.063-.095-.158-.158-.253-.221C7.41.19 6.52 0 5.757 0 3.802 0 2.88 2.301 2.564 3.475c-.884.253-1.521.474-1.616.505C.316 4.17.284 4.202.221 4.87c-.032.474-1.711 13.216-1.711 13.216L13.722 20.5l7.11-1.553S16.436 4.682 16.373 4.618zM13.28 5.124l-1.237.347c0-.884-.127-2.046-.568-3.062.915.253 1.553 1.585 1.805 2.715zm-2.652.758l-2.304.663c.221-1.142.758-2.273 1.363-2.873.253-.253.6-.537 1.046-.695.505 1.046.6 2.304.6 2.905h.295zm-1.363-4.08c.221 0 .41.032.6.095-.505.19-.979.505-1.427.979-.726.726-1.363 2.078-1.616 3.315l-1.805.505c.41-1.933 1.648-4.894 4.248-4.894z"/>
            </svg>
            Continue with Fitgearzzz Account
          </Button>

          {/* Info Text */}
          <div className="text-center space-y-2">
            <p className="text-sm text-zinc-400">
              Sign in securely with your Fitgearzzz customer account
            </p>
            <p className="text-xs text-zinc-500">
              Don't have an account? You'll be able to create one on Fitgearzzz
            </p>
          </div>

          {/* Benefits List */}
          <div className="mt-6 space-y-2 bg-zinc-800/30 rounded-2xl p-4">
            <p className="text-xs font-oswald uppercase text-zinc-400 mb-3">
              Why use Fitgearzzz Account?
            </p>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>One account for all your orders</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Secure authentication by Fitgearzzz</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Easy order tracking and management</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

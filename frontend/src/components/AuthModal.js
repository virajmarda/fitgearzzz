import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ open, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      onClose();
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const handleGoogleLogin = () => {
    const redirectUrl = window.location.origin;
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white rounded-3xl shadow-2xl" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Google Login Button */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-zinc-100 text-zinc-900 font-manrope rounded-full py-6 flex items-center justify-center space-x-3 shadow-lg"
            data-testid="google-login-button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-semibold">Continue with Google</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900 text-zinc-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" data-testid="auth-form">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-zinc-300">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                  required={!isLogin}
                  data-testid="name-input"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                required
                data-testid="email-input"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                required
                data-testid="password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full py-3"
              data-testid="auth-submit-button"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-zinc-400 hover:text-orange-500 transition-colors"
              data-testid="toggle-auth-mode"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

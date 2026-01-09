// frontend/src/components/AuthModal.js
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ open, onClose }) => {
  const { login, register } = useAuth(); // keep for future use if needed
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Traditional login/register with email and password
    setLoading(true);
    try {
      if (isLogin) {
        // Login with existing account
        await login(formData.email, formData.password);
        onClose();
      } else {
        // Register new account
        await register(formData.email, formData.password, formData.name.split(' ')[0], formData.name.split(' ')[1] || '');
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Error is already shown via toast in AuthContext
    } finally {
      setLoading(false);
    }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="bg-zinc-900 border-zinc-800 text-white rounded-3xl shadow-2xl"
        data-testid="auth-modal"
      >
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl">
            {isLogin ? 'Login' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4" data-testid="auth-form">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-zinc-300">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                required={!isLogin}
                data-testid="name-input"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
              required
              data-testid="email-input"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-zinc-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );

export default AuthModal;

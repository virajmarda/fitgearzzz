import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

    // Add access token to URL when user logs in
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      if (token && !window.location.search.includes('token=')) {
        const url = new URL(window.location.href);
        url.searchParams.set('token', token.substring(0, 20) + '...');
        window.history.pushState({}, '', url);
      }
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowMenu(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = getCartCount();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/60 backdrop-blur-xl border-b border-zinc-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2"
              data-testid="logo-link"
            >
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <span className="font-oswald text-2xl font-bold tracking-tight text-white">
                FITGEARZZZ
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-zinc-300 hover:text-orange-500 font-manrope transition-colors"
                data-testid="nav-home"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-zinc-300 hover:text-orange-500 font-manrope transition-colors"
                data-testid="nav-products"
              >
                Products
              </Link>
              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/orders"
                    className="text-zinc-300 hover:text-orange-500 font-manrope transition-colors"
                    data-testid="nav-orders"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin"
                    className="text-zinc-300 hover:text-orange-500 font-manrope transition-colors"
                    data-testid="nav-admin"
                  >
                    Admin
                  </Link>
                </>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500 rounded-full"
                  data-testid="search-input"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  data-testid="search-button"
                >
                  <Search className="w-4 h-4 text-zinc-400" />
                </button>
              </form>

              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-zinc-300 hover:text-orange-500 transition-colors"
                data-testid="cart-button"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    data-testid="cart-count"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/profile" data-testid="profile-link">
                    <Button
                      variant="ghost"
                      className="text-zinc-300 hover:text-orange-500 hover:bg-transparent"
                      data-testid="profile-button"
                    >
                      <User className="w-5 h-5 mr-2" />
                      {user.email || 'Guest'}
};

export default Navbar;

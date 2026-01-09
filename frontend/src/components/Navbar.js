import React, { useState } from 'react';
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
                      {user.name || user.displayName}
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 bg-transparent rounded-full px-6"
                    data-testid="logout-button"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full px-8"
                  data-testid="login-button"
                >
                  Login
                </Button>
              )}
            </div>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden text-zinc-300 hover:text-orange-500"
              data-testid="mobile-menu-button"
            >
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {showMenu && (
          <div
            className="md:hidden bg-zinc-900 border-t border-zinc-800"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500 rounded-full"
                  data-testid="mobile-search-input"
                />
              </form>

              <Link
                to="/"
                className="block text-zinc-300 hover:text-orange-500 font-manrope"
                onClick={() => setShowMenu(false)}
                data-testid="mobile-nav-home"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-zinc-300 hover:text-orange-500 font-manrope"
                onClick={() => setShowMenu(false)}
                data-testid="mobile-nav-products"
              >
                Products
              </Link>
              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/orders"
                    className="block text-zinc-300 hover:text-orange-500 font-manrope"
                    onClick={() => setShowMenu(false)}
                    data-testid="mobile-nav-orders"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin"
                    className="block text-zinc-300 hover:text-orange-500 font-manrope"
                    onClick={() => setShowMenu(false)}
                    data-testid="mobile-nav-admin"
                  >
                    Admin
                  </Link>
                </>
              )}

              <button
                onClick={() => {
                  setShowCart(true);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 text-zinc-300 hover:text-orange-500"
                data-testid="mobile-cart-button"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({cartCount})</span>
              </button>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block text-zinc-300 hover:text-orange-500 font-manrope"
                    onClick={() => setShowMenu(false)}
                    data-testid="mobile-profile-link"
                  >
                    Profile
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setShowMenu(false);
                    }}
                    variant="outline"
                    className="w-full border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 bg-transparent rounded-full"
                    data-testid="mobile-logout-button"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setShowAuthModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full"
                  data-testid="mobile-login-button"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={showCart} onClose={() => setShowCart(false)} />
        
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;

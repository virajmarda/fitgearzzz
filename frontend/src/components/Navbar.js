import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart, ChevronDown, Package, Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import AuthModal from './AuthModal';

const categories = [
  { name: 'Gym Equipment', slug: 'Gym%20Equipment' },
  { name: 'Supplements', slug: 'Supplements' },
  { name: 'Apparel', slug: 'Apparel' },
  { name: 'Accessories', slug: 'Accessories' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowMenu(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const cartCount = getCartCount();

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 transition-shadow ${
        scrolled ? 'shadow-lg shadow-black/40' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <span className="font-oswald text-2xl font-bold tracking-tight text-white">FITGEARZZZ</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-zinc-300 hover:text-orange-500 transition-colors font-manrope">Home</Link>

              {/* Products dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-1 text-zinc-300 hover:text-orange-500 transition-colors font-manrope"
                >
                  Products <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-50 py-2">
                    <Link
                      to="/products"
                      className="block px-4 py-2 text-zinc-300 hover:text-orange-500 hover:bg-zinc-800 transition-colors"
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      All Products
                    </Link>
                    <div className="border-t border-zinc-800 my-1" />
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        className="block px-4 py-2 text-zinc-300 hover:text-orange-500 hover:bg-zinc-800 transition-colors"
                        onClick={() => setShowCategoryDropdown(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t border-zinc-800 my-1" />
                    <Link
                      to="/products?tag=new"
                      className="block px-4 py-2 text-green-400 hover:text-green-300 hover:bg-zinc-800 transition-colors font-semibold"
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      ✨ New Arrivals
                    </Link>
                    <Link
                      to="/products?tag=sale"
                      className="block px-4 py-2 text-orange-400 hover:text-orange-300 hover:bg-zinc-800 transition-colors font-semibold"
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      🔥 Sale
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/orders" className="flex items-center gap-1 text-zinc-300 hover:text-orange-500 transition-colors font-manrope">
                <Package className="w-4 h-4" /> Track Order
              </Link>

              {user?.role === 'admin' && (
                <Link to="/admin" className="text-zinc-300 hover:text-orange-500 transition-colors font-manrope">Admin</Link>
              )}
            </div>

            {/* Desktop actions: search, wishlist, cart, auth */}
            <div className="hidden md:flex items-center space-x-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:border-orange-500 rounded-full px-4 py-2 text-sm focus:outline-none"
                  data-testid="search-input"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 text-zinc-300 hover:text-orange-500 transition-colors" title="Wishlist">
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-zinc-300 hover:text-orange-500 transition-colors"
                data-testid="cart-button"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth section */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile" className="flex items-center gap-1 text-zinc-300 hover:text-orange-500 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.email?.split('@')[0] || 'Account'}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-zinc-400 hover:text-red-400 transition-colors">Logout</button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full px-5 py-2 text-sm transition-colors"
                  data-testid="login-button"
                >
                  Login / Register
                </button>
              )}
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setShowCart(true)} className="relative p-2 text-zinc-300">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-zinc-300"
                data-testid="mobile-menu-button"
              >
                {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setShowMenu(false)} className="block py-2 text-zinc-300 hover:text-orange-500">Home</Link>
            <Link to="/products" onClick={() => setShowMenu(false)} className="block py-2 text-zinc-300 hover:text-orange-500">All Products</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} to={`/products?category=${cat.slug}`} onClick={() => setShowMenu(false)} className="block py-2 pl-4 text-zinc-400 hover:text-orange-500">
                {cat.name}
              </Link>
            ))}
            <Link to="/orders" onClick={() => setShowMenu(false)} className="block py-2 text-zinc-300 hover:text-orange-500">Track Order</Link>
            <Link to="/wishlist" onClick={() => setShowMenu(false)} className="block py-2 text-zinc-300 hover:text-orange-500">Wishlist</Link>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
            </form>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setShowMenu(false)} className="block py-2 text-zinc-300 hover:text-orange-500">Profile</Link>
                <button onClick={() => { handleLogout(); setShowMenu(false); }} className="block w-full text-left py-2 text-zinc-300 hover:text-red-400">Logout</button>
              </>
            ) : (
              <button onClick={() => { setShowAuthModal(true); setShowMenu(false); }} className="block w-full text-left py-2 text-zinc-300 hover:text-orange-500">Login / Register</button>
            )}
          </div>
        )}
      </nav>

      <CartDrawer open={showCart} onClose={() => setShowCart(false)} />
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  ChevronDown,
  Dumbbell,
  BookOpen,
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

const categories = [
  {
    name: 'Gym Equipment',
    slug: 'Gym Equipment',
    description: 'Strength and training essentials',
  },
  {
    name: 'Supplements',
    slug: 'Supplements',
    description: 'Protein, performance, and recovery',
  },
  {
    name: 'Apparel',
    slug: 'Apparel',
    description: 'Training wear built for movement',
  },
  {
    name: 'Accessories',
    slug: 'Accessories',
    description: 'Daily fitness support and add-ons',
  },
];

const featuredShopLinks = [
  {
    name: 'All Products',
    to: '/products',
    description: 'Browse the full collection',
  },
  {
    name: 'New Arrivals',
    to: '/products?tag=new',
    description: 'Fresh drops and latest launches',
  },
  {
    name: 'Best Sellers',
    to: '/products?tag=bestseller',
    description: 'Most loved by customers',
  },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShopMegaMenu, setShowShopMegaMenu] = useState(false);

  const megaMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setShowShopMegaMenu(false);
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
      setShowShopMegaMenu(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  const cartCount = getCartCount();

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 transition-shadow ${
          scrolled ? 'shadow-lg shadow-black/40' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <span className="font-oswald text-2xl font-bold tracking-tight text-white">
                FITGEARZZZ
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-zinc-300 hover:text-orange-500 transition-colors font-manrope"
              >
                Home
              </Link>

              {/* Shop mega menu */}
              <div className="relative" ref={megaMenuRef}>
                <button
                  onClick={() => setShowShopMegaMenu((prev) => !prev)}
                  className="flex items-center gap-1 text-zinc-300 hover:text-orange-500 transition-colors font-manrope"
                >
                  Shop
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showShopMegaMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showShopMegaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[760px] max-w-[90vw] rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40 overflow-hidden z-50">
                    <div className="grid grid-cols-3">
                      {/* Left intro panel */}
                      <div className="col-span-1 bg-gradient-to-br from-orange-500/10 via-zinc-900 to-zinc-900 border-r border-zinc-800 p-6">
                        <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3">
                          Shop FitGearzzz
                        </p>
                        <h3 className="text-white text-2xl font-bold mb-3">
                          Premium fitness gear for everyday champions
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                          Explore categories, trending products, and high-converting collections from one place.
                        </p>
                        <Link
                          to="/products"
                          onClick={() => setShowShopMegaMenu(false)}
                          className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                        >
                          Shop All Products
                        </Link>
                      </div>

                      {/* Right links grid */}
                      <div className="col-span-2 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">
                              Categories
                            </p>
                            <div className="space-y-2">
                              {categories.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  to={`/products?category=${encodeURIComponent(cat.slug)}`}
                                  onClick={() => setShowShopMegaMenu(false)}
                                  className="block rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 hover:border-orange-500/40 hover:bg-zinc-800 transition-colors"
                                >
                                  <p className="text-white font-medium">{cat.name}</p>
                                  <p className="text-sm text-zinc-400">{cat.description}</p>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-3">
                              Featured
                            </p>
                            <div className="space-y-2">
                              {featuredShopLinks.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.to}
                                  onClick={() => setShowShopMegaMenu(false)}
                                  className="block rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 hover:border-orange-500/40 hover:bg-zinc-800 transition-colors"
                                >
                                  <p className="text-white font-medium">{item.name}</p>
                                  <p className="text-sm text-zinc-400">{item.description}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="text-zinc-300 hover:text-orange-500 transition-colors font-manrope"
              >
                About Us
              </Link>

              <Link
                to="/blog"
                className="text-zinc-300 hover:text-orange-500 transition-colors"
                aria-label="Blog"
                title="Blog"
              >
                <BookOpen className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-1 text-zinc-300 hover:text-orange-500 transition-colors font-manrope"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-zinc-300 hover:text-orange-500 transition-colors font-manrope"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Desktop actions */}
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
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              <Link
                to="/wishlist"
                className="relative p-2 text-zinc-300 hover:text-orange-500 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <button
                              onClick={() => navigate('/cart')}
                className="relative p-2 text-zinc-300 hover:text-orange-500 transition-colors"
                data-testid="cart-button"
              >
                                                          onClick={() => navigate('/cart')}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-sm text-zinc-300 hover:text-red-400 transition-colors border border-zinc-700 rounded-full px-4 py-2"
                >
                  Logout
                </button>
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

            {/* Mobile actions */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                to="/wishlist"
                className="relative p-2 text-zinc-300"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-zinc-300"
              >
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
            <form onSubmit={handleSearch} className="pb-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
            </form>

            <Link
              to="/"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-zinc-300 hover:text-orange-500"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-zinc-300 hover:text-orange-500"
            >
              Shop
            </Link>

            <div className="pl-4 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products?category=${encodeURIComponent(cat.slug)}`}
                  onClick={() => setShowMenu(false)}
                  className="block py-1.5 text-zinc-400 hover:text-orange-500"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/products?tag=new"
                onClick={() => setShowMenu(false)}
                className="block py-1.5 text-zinc-400 hover:text-orange-500"
              >
                New Arrivals
              </Link>
            </div>

            <Link
              to="/about"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-zinc-300 hover:text-orange-500"
            >
              About Us
            </Link>

            <Link
              to="/blog"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-zinc-300 hover:text-orange-500"
            >
              Blog
            </Link>

            <Link
              to="/contact"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-zinc-300 hover:text-orange-500"
            >
              Contact
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setShowMenu(false)}
                className="block py-2 text-zinc-300 hover:text-orange-500"
              >
                Admin
              </Link>
            )}

            <div className="pt-2 border-t border-zinc-800">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-zinc-300 hover:text-red-400"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left py-2 text-zinc-300 hover:text-orange-500"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;

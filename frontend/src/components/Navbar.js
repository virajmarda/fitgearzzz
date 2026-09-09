// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRIMARY_NAV } from '../config/siteConfig';
import FitgearzzzLogo from './brand/FitgearzzzLogo';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const menuRef = useRef(null);

  const cartCount = getCartCount();

  // Close mobile menu on route change
  useEffect(() => {
    setShowMenu(false);
    setShowSearch(false);
  }, [location.pathname, location.search]);

  // Escape closes the mobile menu; lock body scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setShowMenu(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = showMenu ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setShowSearch(false);
    }
  };

  const isActive = (to) =>
    to === '/products'
      ? location.pathname === '/products' && !location.search
      : location.pathname + location.search === to;

  return (
    <header className="fg-surface sticky top-0 z-50 bg-[#f1eee8]/95 backdrop-blur border-b border-[#171717]">
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10" aria-label="Primary">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="shrink-0 text-[#171717]" aria-label="Fitgearzzz home">
            <FitgearzzzLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  isActive(item.to)
                    ? 'text-[#f15a24]'
                    : 'text-[#171717] hover:text-[#f15a24]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop search */}
            <form onSubmit={submitSearch} className="hidden md:block relative">
              <label htmlFor="nav-search" className="sr-only">Search products</label>
              <input
                id="nav-search"
                type="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-40 xl:w-52 bg-transparent border-b border-[#c9c4ba] focus:border-[#171717] text-[#171717] placeholder-[#96918a] text-sm py-2 pr-7 focus:outline-none"
                data-testid="search-input"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#77736d] hover:text-[#f15a24]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile search toggle */}
            <button
              type="button"
              onClick={() => setShowSearch((s) => !s)}
              className="md:hidden p-2.5 text-[#171717] hover:text-[#f15a24]"
              aria-label="Toggle search"
              aria-expanded={showSearch}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/wishlist"
              className="relative p-2.5 text-[#171717] hover:text-[#f15a24] transition-colors"
              aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ''}`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#f15a24] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="relative p-2.5 text-[#171717] hover:text-[#f15a24] transition-colors"
              data-testid="cart-button"
              aria-label={`Cart${cartCount ? `, ${cartCount} items` : ', empty'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#171717] text-[#f1eee8] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth (desktop) */}
            <div className="hidden lg:block ml-1">
              {user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#171717] hover:text-[#f15a24] border border-[#171717] px-4 py-2"
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="fg-btn text-[11px] px-4 py-2"
                  data-testid="login-button"
                >
                  Account
                </button>
              )}
            </div>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setShowMenu((m) => !m)}
              className="lg:hidden p-2.5 text-[#171717]"
              data-testid="mobile-menu-button"
              aria-label={showMenu ? 'Close menu' : 'Open menu'}
              aria-expanded={showMenu}
            >
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile inline search */}
        {showSearch && (
          <form onSubmit={submitSearch} className="md:hidden pb-3">
            <label htmlFor="nav-search-m" className="sr-only">Search products</label>
            <input
              id="nav-search-m"
              type="search"
              autoFocus
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#171717] text-[#171717] placeholder-[#96918a] py-2 focus:outline-none"
            />
          </form>
        )}
      </nav>

      {/* Mobile menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="lg:hidden fg-surface bg-[#f1eee8] border-t border-[#d4d0c8] px-5 py-6"
        >
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) => (
              <li key={item.name} className="border-b border-[#d4d0c8]">
                <Link
                  to={item.to}
                  className="block py-3.5 text-[15px] font-semibold text-[#171717] hover:text-[#f15a24]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            {user ? (
              <button type="button" onClick={logout} className="fg-btn fg-btn-outline w-full">
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setShowAuthModal(true); setShowMenu(false); }}
                className="fg-btn w-full"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};

export default Navbar;

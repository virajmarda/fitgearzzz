// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRIMARY_NAV, SHOP_MENU } from '../config/siteConfig';
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
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [query, setQuery] = useState('');
  const shopRef = useRef(null);
  const closeTimer = useRef(null);

  const cartCount = getCartCount();

  // Close everything on route change
  useEffect(() => {
    setShowMenu(false);
    setShowSearch(false);
    setShopOpen(false);
  }, [location.pathname, location.search]);

  // Escape + click-outside for dropdown; lock scroll for mobile menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowMenu(false);
        setShopOpen(false);
      }
    };
    const onClick = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) setShopOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    const onScroll = () => setShopOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.style.overflow = showMenu ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('scroll', onScroll);
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  const hovering = useRef(false);
  const openShop = () => {
    clearTimeout(closeTimer.current);
    hovering.current = true;
    setShopOpen(true);
  };
  const delayedCloseShop = () => {
    hovering.current = false;
    closeTimer.current = setTimeout(() => setShopOpen(false), 140);
  };
  // Mouse users open on hover (click keeps it open); keyboard users toggle.
  const toggleShop = () => setShopOpen((o) => (hovering.current ? true : !o));

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setShowSearch(false);
    }
  };

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to.split('?')[0]) && to !== '/';

  const linkCls = (on) =>
    `text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors py-2 ${
      on ? 'text-[#f15a24]' : 'text-[#171717] hover:text-[#f15a24]'
    }`;

  return (
    <header className="fg-surface sticky top-0 z-50 bg-[#f1eee8]/95 backdrop-blur border-b border-[#171717]">
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10" aria-label="Primary">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="shrink-0 text-[#171717]" aria-label="Fitgearzzz home">
            <FitgearzzzLogo />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {PRIMARY_NAV.map((item) =>
              item.menu ? (
                <li
                  key={item.name}
                  ref={shopRef}
                  className="relative"
                  onMouseEnter={openShop}
                  onMouseLeave={delayedCloseShop}
                >
                  <span className={`${linkCls(isActive(item.to) || shopOpen)} inline-flex items-center gap-1`}>
                    <Link to={item.to} onClick={() => setShopOpen(false)} className="py-2">
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={toggleShop}
                      aria-expanded={shopOpen}
                      aria-controls="shop-menu"
                      aria-haspopup="true"
                      aria-label={shopOpen ? 'Close shop menu' : 'Open shop menu'}
                      className="p-1 -m-1 text-current"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </span>

                  {shopOpen && (
                    <div
                      id="shop-menu"
                      role="region"
                      aria-label="Shop menu"
                      onClick={() => setShopOpen(false)}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[680px] max-w-[92vw] bg-[#f1eee8] border border-[#171717] shadow-[0_18px_40px_rgba(23,23,23,0.12)] z-50"
                    >
                      <div className="grid grid-cols-[1.1fr_1fr]">
                        <div className="p-6 border-r border-[#d4d0c8]">
                          <p className="fg-eyebrow mb-4">Shop by pillar</p>
                          <ul className="space-y-1">
                            {SHOP_MENU.pillars.map((p) => (
                              <li key={p.name}>
                                <Link
                                  to={p.to}
                                  className="group flex items-baseline gap-3 py-2.5 border-b border-[#d4d0c8] hover:border-[#171717] transition-colors"
                                >
                                  <span className="text-[10px] text-[#f15a24] w-5">{p.number}</span>
                                  <span className="flex-1">
                                    <span className="block text-[17px] font-bold tracking-[-0.03em] text-[#171717] group-hover:text-[#f15a24]">
                                      {p.name}
                                    </span>
                                    <span className="block text-[12px] text-[#77736d]">{p.description}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 bg-[#e8e4dc]">
                          <p className="fg-eyebrow mb-4">Start here</p>
                          <ul className="space-y-1">
                            {SHOP_MENU.featured.map((f) => (
                              <li key={f.name}>
                                <Link to={f.to} className="block py-2.5 group">
                                  <span className="block text-[14px] font-semibold text-[#171717] group-hover:text-[#f15a24]">
                                    {f.name}
                                  </span>
                                  <span className="block text-[12px] text-[#77736d]">{f.description}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link to="/products" className="fg-btn w-full mt-4 text-[11px]">
                            Enter the catalog
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.name}>
                  <Link to={item.to} className={linkCls(isActive(item.to))}>
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <form onSubmit={submitSearch} className="hidden md:block relative">
              <label htmlFor="nav-search" className="sr-only">Search products</label>
              <input
                id="nav-search"
                type="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-36 xl:w-48 bg-transparent border-b border-[#c9c4ba] focus:border-[#171717] text-[#171717] placeholder-[#96918a] text-sm py-2 pr-7 focus:outline-none"
                data-testid="search-input"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-[#77736d] hover:text-[#f15a24]" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            </form>

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

            {/* Account */}
            {user ? (
              <Link
                to="/profile"
                className="hidden lg:inline-flex p-2.5 text-[#171717] hover:text-[#f15a24]"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="hidden lg:inline-flex fg-btn text-[11px] px-4 py-2 ml-1"
                data-testid="login-button"
              >
                Account
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowMenu((m) => !m)}
              className="lg:hidden p-2.5 text-[#171717]"
              data-testid="mobile-menu-button"
              aria-label={showMenu ? 'Close menu' : 'Open menu'}
              aria-expanded={showMenu}
              aria-controls="mobile-menu"
            >
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {showSearch && (
          <form onSubmit={submitSearch} className="md:hidden pb-3">
            <label htmlFor="nav-search-m" className="sr-only">Search products</label>
            <input
              id="nav-search-m"
              type="search"
              autoFocus
              placeholder="Search products\u2026"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#171717] text-[#171717] placeholder-[#96918a] py-2 focus:outline-none"
            />
          </form>
        )}
      </nav>

      {/* Mobile menu */}
      {showMenu && (
        <div id="mobile-menu" className="lg:hidden fg-surface bg-[#f1eee8] border-t border-[#d4d0c8] px-5 py-5 max-h-[calc(100vh-64px)] overflow-y-auto">
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) =>
              item.menu ? (
                <li key={item.name} className="border-b border-[#d4d0c8]">
                  <button
                    type="button"
                    onClick={() => setMobileShopOpen((o) => !o)}
                    aria-expanded={mobileShopOpen}
                    className="w-full flex items-center justify-between py-3.5 text-[15px] font-semibold text-[#171717]"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileShopOpen && (
                    <ul className="pb-3 pl-3 space-y-1">
                      {[...SHOP_MENU.featured.slice(0, 1), ...SHOP_MENU.pillars, ...SHOP_MENU.featured.slice(1, 3)].map((p) => (
                        <li key={p.name}>
                          <Link to={p.to} className="block py-2 text-[14px] text-[#4f4c47] hover:text-[#f15a24]">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.name} className="border-b border-[#d4d0c8]">
                  <Link to={item.to} className="block py-3.5 text-[15px] font-semibold text-[#171717] hover:text-[#f15a24]">
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="mt-5">
            {user ? (
              <div className="flex gap-3">
                <Link to="/profile" className="fg-btn fg-btn-outline flex-1">Account</Link>
                <button type="button" onClick={logout} className="fg-btn fg-btn-outline flex-1">Logout</button>
              </div>
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

import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown, UserRound, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import FitgearzzzLogo from './brand/FitgearzzzLogo';
import AuthModal from './AuthModal';
const shopLinks = [['All products', '/products'], ['Train', '/products?pillar=train'], ['Recover', '/products?pillar=recover'], ['Wear', '/products?pillar=wear'], ['Carry', '/products?pillar=carry'], ['Full catalog', '/catalog']];
export default function Navbar() {
  const [mobile, setMobile] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [auth, setAuth] = useState(false),
    [query, setQuery] = useState('');
  const {
      getCartCount
    } = useCart(),
    {
      wishlistCount
    } = useWishlist(),
    {
      user,
      logout
    } = useAuth(),
    location = useLocation(),
    navigate = useNavigate();
  useEffect(() => {
    setMobile(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);
  const search = e => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };
  return <header className="site-header" data-testid="site-header"><nav className="fg-container" aria-label="Main navigation"><div className="header-inner"><Link to="/" data-testid="nav-home" aria-label="FitGearzzz home"><FitgearzzzLogo markSize={27} /></Link><div className="header-links"><DropdownMenu><DropdownMenuTrigger className={`nav-link flex items-center gap-1 ${['/products', '/catalog'].includes(location.pathname) ? 'active' : ''}`} data-testid="nav-shop-menu">Shop <ChevronDown size={13} /></DropdownMenuTrigger><DropdownMenuContent align="start" className="min-w-52">{shopLinks.map(([label, to]) => <DropdownMenuItem asChild key={to} data-testid="navbar-dropdownmenuitem-1"><Link to={to} data-testid={`nav-shop-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>{[['Features', '/features'], ['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact']].map(([label, to]) => <NavLink key={to} to={to} className={({
            isActive
          }) => `nav-link ${isActive ? 'active' : ''}`} data-testid={`nav-${label.toLowerCase()}`}>{label}</NavLink>)}</div><div className="header-tools"><button className="header-icon" onClick={() => setSearchOpen(true)} aria-label="Search products" data-testid="nav-search"><Search size={19} /></button><Link className="header-icon header-wishlist" to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} data-testid="nav-wishlist"><Heart size={19} />{wishlistCount > 0 && <span>{wishlistCount}</span>}</Link><Link className="header-icon" to="/cart" aria-label={`Cart, ${getCartCount()} items`} data-testid="nav-cart"><ShoppingBag size={19} />{getCartCount() > 0 && <span>{getCartCount()}</span>}</Link>{user ? <DropdownMenu><DropdownMenuTrigger aria-label="Your account" className="header-icon" data-testid="nav-account-menu"><UserRound size={19} /></DropdownMenuTrigger><DropdownMenuContent align="end">{[['My profile', '/profile'], ['Order history', '/orders'], ['Saved addresses', '/profile?tab=addresses']].map(([label, to]) => <DropdownMenuItem asChild key={to} data-testid="navbar-dropdownmenuitem-2"><Link to={to} data-testid={`nav-user-${to}`}>{label}</Link></DropdownMenuItem>)}<DropdownMenuItem onClick={logout} data-testid="nav-signout">Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu> : <button className="header-icon header-account" aria-label="Sign in" onClick={() => setAuth(true)} data-testid="nav-signin"><UserRound size={19} /></button>}<button className="header-icon header-mobile-toggle" aria-label="Open navigation" onClick={() => setMobile(true)} data-testid="nav-mobile-open"><Menu size={21} /></button></div></div></nav><Sheet open={mobile} onOpenChange={setMobile}><SheetContent side="right" className="mobile-navigation" data-testid="mobile-menu"><SheetHeader><SheetTitle><FitgearzzzLogo /></SheetTitle><SheetDescription>Find your next everyday essential.</SheetDescription></SheetHeader><div className="mobile-links">{[...shopLinks, ['Features', '/features'], ['Our story', '/about'], ['The journal', '/blog'], ['Contact', '/contact'], ['Wishlist', '/wishlist'], ['FAQ', '/faq']].map(([label, to]) => <Link to={to} key={to} onClick={() => setMobile(false)} data-testid={`mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}<ArrowUpRight size={15} /></Link>)}<button onClick={() => {
            setMobile(false);
            user ? navigate('/profile') : setAuth(true);
          }} data-testid="mobile-account">Your account <UserRound size={16} /></button></div></SheetContent></Sheet><Dialog open={searchOpen} onOpenChange={setSearchOpen}><DialogContent data-testid="search-dialog"><DialogHeader><DialogTitle>What are you looking for?</DialogTitle><DialogDescription>Search the current product range.</DialogDescription></DialogHeader><form onSubmit={search} className="flex gap-3 py-4"><input className="fg-field" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products" aria-label="Search products" data-testid="nav-search-input" required /><button type="submit" className="fg-btn" data-testid="nav-search-submit" aria-label="Submit product search"><Search size={18} /></button></form></DialogContent></Dialog><AuthModal open={auth} onClose={() => setAuth(false)} /></header>;
}

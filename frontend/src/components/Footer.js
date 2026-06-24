import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const SHOP_LINKS = [
  { label: 'Gym Equipment', to: '/products?category=Gym%20Equipment' },
  { label: 'Supplements',   to: '/products?category=Supplements' },
  { label: 'Apparel',       to: '/products?category=Apparel' },
  { label: 'Accessories',   to: '/products?category=Accessories' },
  { label: 'New Arrivals',  to: '/products?tag=new' },
  { label: 'Best Sellers',  to: '/products?tag=bestseller' },
];

const INFO_LINKS = [
  { label: 'About Us',          to: '/about' },
  { label: 'Contact',           to: '/contact' },
  { label: 'FAQ',               to: '/faq' },
  { label: 'Shipping & Returns', to: '/shipping' },
  { label: 'Blog',              to: '/blog' },
  { label: 'Track Order',       to: '/orders' },
];

const SOCIALS = [
  { Icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61587089187291' },
  { Icon: Twitter,   label: 'Twitter',   href: 'https://twitter.com/fitgearzzz' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/fitgearzzz' },
  { Icon: Youtube,   label: 'YouTube',   href: 'http://www.youtube.com/@fitgearzzz' },
];

const Footer = () => (
  <footer className="bg-zinc-900 border-t border-zinc-800 mt-0">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

      {/* Top grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Brand column */}
        <div className="lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <Dumbbell className="w-7 h-7 text-orange-500" />
            <span className="font-oswald text-xl font-bold tracking-tight text-white">FITGEARZZZ</span>
          </Link>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-xs">
            Performance fitness equipment and apparel, delivered pan-India.
            Inspected before dispatch. Backed by a 7-day return policy.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-zinc-700 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop column */}
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-[0.18em] mb-5">Shop</h4>
          <ul className="space-y-3">
            {SHOP_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-zinc-400 text-sm hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info column */}
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-[0.18em] mb-5">Info</h4>
          <ul className="space-y-3">
            {INFO_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-zinc-400 text-sm hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-[0.18em] mb-5">Get in touch</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="mailto:support@fitgearzzz.com"
                className="flex items-start gap-3 text-zinc-400 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                support@fitgearzzz.com
              </a>
            </li>
            <li>
              <a
                href="tel:+918668623252"
                className="flex items-start gap-3 text-zinc-400 text-sm hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                +91 86686 23252
              </a>
            </li>
            <li className="flex items-start gap-3 text-zinc-400 text-sm">
              <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              Solapur, Maharashtra, India
            </li>
          </ul>
          <div className="mt-6 p-4 rounded-xl bg-zinc-800 border border-zinc-700">
            <p className="text-white text-xs font-semibold mb-1">WhatsApp Support</p>
            <p className="text-zinc-400 text-xs">Mon\u2013Sat &middot; 10am\u20136pm IST</p>
            <a
              href="https://wa.me/918668623252"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-zinc-500 text-xs">
          &copy; {new Date().getFullYear()} FitGearzzz. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link to="/privacy" className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors">
            Terms of Service
          </Link>
          <Link to="/shipping" className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors">
            Shipping Policy
          </Link>
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;

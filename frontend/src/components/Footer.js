import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { DoodleUnderline } from './Doodle';

// Keep social URLs and contact details updated as the brand grows.
const SHOP_LINKS = [
  { label: 'Gym Equipment', to: '/products?category=Gym%20Equipment' },
  { label: 'Supplements',   to: '/products?category=Supplements' },
  { label: 'Apparel',       to: '/products?category=Apparel' },
  { label: 'Accessories',   to: '/products?category=Accessories' },
  { label: 'New Arrivals',  to: '/products?tag=new' },
  { label: "What's selling", to: '/products?tag=bestseller' },
];

const INFO_LINKS = [
  { label: 'Our story',         to: '/about' },
  { label: 'Contact',           to: '/contact' },
  { label: 'FAQ',               to: '/faq' },
  { label: 'Shipping & returns', to: '/shipping' },
  { label: 'Brand journal',     to: '/features' },
  { label: 'Track your order',  to: '/orders' },
];

const SOCIALS = [
  { Icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61587089187291' },
  { Icon: Twitter,   label: 'Twitter',   href: 'https://twitter.com/fitgearzzz' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/fitgearzzz' },
  { Icon: Youtube,   label: 'YouTube',   href: 'http://www.youtube.com/@fitgearzzz' },
];

const Footer = () => (
  <footer className="bg-zinc-900 border-t border-zinc-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-9">

      {/* Four-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

        {/* Brand column */}
        <div className="lg:col-span-1">
          <div className="relative mb-5 inline-block">
            <Link to="/" className="inline-flex items-center gap-2" aria-label="FitGearzzz home">
              <Dumbbell className="w-6 h-6 text-orange-500" />
              <span className="font-oswald text-lg font-bold tracking-tight text-white">FITGEARZZZ</span>
            </Link>
            <DoodleUnderline className="w-24 h-4 text-orange-500/70 mt-2" />
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5 max-w-xs">
            Fitness equipment and apparel, sourced and inspected before dispatch.
            Pan-India delivery in 3–5 days. 7-day returns, no questions.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-sm bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:bg-zinc-700 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop column */}
        <div>
          <h4 className="text-white text-[10px] font-semibold uppercase tracking-[0.22em] mb-5">Shop</h4>
          <ul className="space-y-3">
            {SHOP_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-zinc-500 text-sm hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info column */}
        <div>
          <h4 className="text-white text-[10px] font-semibold uppercase tracking-[0.22em] mb-5">Company</h4>
          <ul className="space-y-3">
            {INFO_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-zinc-500 text-sm hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h4 className="text-white text-[10px] font-semibold uppercase tracking-[0.22em] mb-5">Contact</h4>
          <ul className="space-y-4 mb-6">
            <li>
              <a
                href="mailto:support@fitgearzzz.com"
                className="flex items-start gap-3 text-zinc-500 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                support@fitgearzzz.com
              </a>
            </li>
            <li>
              <a
                href="tel:+918668623252"
                className="flex items-start gap-3 text-zinc-500 text-sm hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                +91 86686 23252
              </a>
            </li>
            <li className="flex items-start gap-3 text-zinc-500 text-sm">
              <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              Solapur, Maharashtra
            </li>
          </ul>

          {/* WhatsApp support block */}
          <div className="p-4 rounded-sm bg-zinc-800 border border-zinc-700/60">
            <p className="text-white text-xs font-semibold mb-0.5">WhatsApp support</p>
            <p className="text-zinc-500 text-xs">Mon–Sat · 10am–6pm IST</p>
            <a
              href="https://wa.me/918668623252"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              Open chat →
            </a>
              <p className="mt-2 font-hand text-lg text-orange-400 rotate-[-1deg]">
                real humans, promise.
              </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-xs">
          © {new Date().getFullYear()} FitGearzzz. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link to="/privacy" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
            Terms
          </Link>
          <Link to="/shipping" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
            Shipping policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

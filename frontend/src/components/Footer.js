// src/components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SITE, FOOTER } from '../config/siteConfig';
import { trackEvent } from '../lib/analytics';
import FitgearzzzLogo from './brand/FitgearzzzLogo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    trackEvent('newsletter_signup', { location: 'footer' });
    // TODO(owner): connect newsletter provider (e.g. Klaviyo/Mailchimp).
  };

  return (
    <footer className="fg-surface bg-[#171717] text-[#f1eee8]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <div className="text-[#f1eee8]">
              <FitgearzzzLogo markSize={28} />
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-[#aaa49b] max-w-xs">
              {FOOTER.blurb}
            </p>

            <form onSubmit={subscribe} className="mt-7 max-w-xs">
              <label htmlFor="footer-email" className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#96918a] mb-2">
                The occasional note
              </label>
              {done ? (
                <p className="text-[#f15a24] text-sm">You are in. Check your inbox.</p>
              ) : (
                <div className="flex border-b border-[#4a4845] focus-within:border-[#f1eee8]">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 bg-transparent py-2.5 text-sm text-[#f1eee8] placeholder-[#77736d] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="text-[#f15a24] hover:text-white transition-colors px-1"
                    aria-label="Subscribe"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Link columns */}
          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#96918a] mb-4">
                {col.title}
              </h2>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link
                      to={l.to}
                      className="text-[13.5px] text-[#d8d3ca] hover:text-[#f15a24] transition-colors"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[#2d2d2d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#77736d]">
            © {new Date().getFullYear()} {SITE.name} — Train with purpose.
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#77736d]">
            COD / Pan-India / 7-day returns
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

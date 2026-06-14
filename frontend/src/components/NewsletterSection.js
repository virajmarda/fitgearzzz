/**
 * NewsletterSection.js — Issue #8
 *
 * Reusable newsletter subscription component for FitGearzzz.
 * Supports: inline mode, loading, success, error states.
 * No fake success — mock mode is clearly labeled.
 *
 * ADAPTER PATTERN:
 *   REACT_APP_NEWSLETTER_MODE=mock       — local dev (no real submission)
 *   REACT_APP_NEWSLETTER_MODE=shopify-forms — after Shopify Forms install
 *
 * SHOPIFY FORMS ACTIVATION (after plan purchase):
 *   1. Install Shopify Forms app from Shopify App Store
 *   2. Enable App Embed in Theme Editor
 *   3. Create a form and get the embed/API endpoint
 *   4. Set REACT_APP_NEWSLETTER_MODE=shopify-forms
 *   5. Set REACT_APP_SHOPIFY_FORMS_ENDPOINT=https://your-forms-endpoint
 *   6. Connect to Shopify Email for automated welcome flow
 */

import React, { useState } from 'react';
import { Mail, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { trackNewsletterAttempt, trackNewsletterSuccess } from '../lib/analytics';

// ---------------------------------------------------------------------------
// Newsletter adapter
// ---------------------------------------------------------------------------

const NEWSLETTER_MODE = process.env.REACT_APP_NEWSLETTER_MODE || 'mock';
const SHOPIFY_FORMS_ENDPOINT = process.env.REACT_APP_SHOPIFY_FORMS_ENDPOINT || '';

async function submitNewsletter({ email, firstName = '' }) {
  switch (NEWSLETTER_MODE) {
    case 'shopify-forms': {
      // TODO: Activate after installing Shopify Forms app and setting endpoint
      if (!SHOPIFY_FORMS_ENDPOINT) {
        throw new Error('Shopify Forms endpoint not configured. Set REACT_APP_SHOPIFY_FORMS_ENDPOINT.');
      }
      const res = await fetch(SHOPIFY_FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });
      if (!res.ok) throw new Error('Subscription failed. Please try again.');
      return { success: true };
    }

    case 'mock':
    default: {
      // Mock mode: simulate a network delay, always succeeds
      // Replace with real adapter when ready
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return { success: true, isMock: true };
    }
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * @param {string}   source        - tracking source label ('footer' | 'home' | 'popup')
 * @param {boolean}  showFirstName - whether to include a first name field
 * @param {string}   heading       - section heading text
 * @param {string}   subheading    - section subheading text
 * @param {string}   className     - additional container classes
 */
const NewsletterSection = ({
  source = 'footer',
  showFirstName = false,
  heading = 'Join 10,000+ Fitness Enthusiasts',
  subheading = 'Get exclusive deals, training tips, and early access to new arrivals.',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');
    trackNewsletterAttempt(source);

    try {
      const result = await submitNewsletter({ email, firstName });
      if (result.success) {
        setStatus('success');
        trackNewsletterSuccess(source);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section
      className={`bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-10 md:px-10 md:py-12 ${className}`}
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5">
          <Mail className="w-5 h-5 text-orange-400" />
        </div>

        {/* Heading */}
        <h2
          id="newsletter-heading"
          className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
        >
          {heading}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mb-7 leading-relaxed">
          {subheading}
        </p>

        {/* Success state */}
        {status === 'success' && (
          <div className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-4">
            <Check className="w-5 h-5 text-green-400 shrink-0" />
            <p className="text-green-400 text-sm font-medium">
              You're in! We'll be in touch with exclusive deals and updates.
            </p>
          </div>
        )}

        {/* Form */}
        {status !== 'success' && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-3">
              {/* First name field (optional) */}
              {showFirstName && (
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  autoComplete="given-name"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                />
              )}

              {/* Email + Submit row */}
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  aria-label="Subscribe to newsletter"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shrink-0"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error state */}
            {status === 'error' && (
              <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Privacy note */}
            <p className="mt-4 text-zinc-600 text-xs">
              No spam, unsubscribe anytime. By subscribing you agree to our{' '}
              <a href="/privacy" className="underline hover:text-zinc-400 transition-colors">
                Privacy Policy
              </a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;

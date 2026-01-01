import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900/60 backdrop-blur-xl border-t border-zinc-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <span className="font-oswald text-2xl font-bold tracking-tight text-white">FITGEAR</span>
            </Link>
            <p className="text-zinc-400 font-manrope mb-6 leading-relaxed">
              Premium fitness equipment and supplements to fuel your journey to greatness. Quality you can trust.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-zinc-800 transition-all" data-testid="facebook-link">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-zinc-800 transition-all" data-testid="twitter-link">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-zinc-800 transition-all" data-testid="instagram-link">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-zinc-800 transition-all" data-testid="youtube-link">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-oswald text-lg font-bold text-white mb-6 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Gym%20Equipment" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-gym-equipment">
                  Gym Equipment
                </Link>
              </li>
              <li>
                <Link to="/products?category=Supplements" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-supplements">
                  Supplements
                </Link>
              </li>
              <li>
                <Link to="/products?category=Apparel" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-apparel">
                  Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-accessories">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-oswald text-lg font-bold text-white mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope" data-testid="footer-shipping">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-oswald text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-zinc-400 font-manrope">123 Fitness Street, Gym City, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:support@fitgear.com" className="text-zinc-400 hover:text-orange-500 transition-colors font-manrope">
                  support@fitgear.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-zinc-500 text-sm font-manrope">
              © 2024 FitGear. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/privacy" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-manrope" data-testid="footer-privacy">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-manrope" data-testid="footer-terms">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, Check, Mail, Menu, MoveUpRight, Package, ShieldCheck, Truck, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/shopifyService';
import './Home.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=85';
const CATEGORIES = [
  { number: '01', name: 'Build strength', text: 'Dumbbells, kettlebells and bars for the work that compounds.', query: 'Equipment', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85' },
  { number: '02', name: 'Move better', text: 'Bands, ropes and small tools for the sessions between sessions.', query: 'Accessories', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85' },
  { number: '03', name: 'Recover properly', text: 'Rollers, mats and recovery pieces that earn their space.', query: 'Recovery', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=85' },
];
const REVIEWS = [
  ['01', 'The 10kg pair became the first thing I touch before work.', 'Akash / Pune'],
  ['02', 'No guessing, no inflated promises. The band set is exactly as described.', 'Meera / Bengaluru'],
  ['03', 'They answered on WhatsApp before I placed the order. That matters.', 'Rohan / Mumbai'],
];
const JOURNEY = [
  ['01', 'Choose with context', 'Short descriptions, useful specs and products grouped around how you train.'],
  ['02', 'We check it', 'Each item is inspected and packed before dispatch. If it is not right, it does not leave.'],
  ['03', 'Pay your way', 'COD or encrypted online payment. Same price, same clear rules.'],
  ['04', 'Train with it', 'If something feels wrong after delivery, message us and we will help resolve it.'],
];

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.unobserve(node); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Note({ children, align = 'left' }) { return <p className={`margin-note margin-note-${align}`}>{children}<span>↗</span></p>; }

export default function Home() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { let active = true; fetchProducts().then((items) => { if (active) setProducts(items || []); }).catch(() => {}).finally(() => {}); return () => { active = false; }; }, []);
  const heroImage = products[0]?.image || FALLBACK_IMAGE;
  const featured = products.slice(0, 6);
  const subscribe = (event) => { event.preventDefault(); if (email.trim()) setSubscribed(true); };
  return (
    <main className="home-artifact">
      <header className="desk-header">
        <Link to="/" className="desk-logo">FIT<span>GEAR</span>ZZZ</Link>
        <nav className={menuOpen ? 'desk-nav desk-nav-open' : 'desk-nav'} aria-label="Primary navigation">
          <a href="#shop">Shop</a><a href="#method">Our method</a><a href="#notes">Notes</a><Link to="/products">Catalog <MoveUpRight size={13} /></Link>
        </nav>
        <div className="desk-actions"><Link to="/cart" className="cart-link">Cart <span>{products.length ? '↗' : '—'}</span></Link><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </header>

      <section className="hero-desk" id="top">
        <div className="hero-index">FITGEARZZZ / 2026<br />INDIA / 01—04</div>
        <div className="hero-copy"><p className="eyebrow">A better home gym starts with fewer, better decisions.</p><h1>Train<br /><em>like it matters.</em></h1><p className="hero-description">Equipment and everyday training essentials, selected for real rooms, real budgets and the work you actually plan to do.</p><a className="ink-button" href="#shop">Enter the catalog <ArrowDownRight size={17} /></a></div>
        <div className="hero-image-wrap"><img src={heroImage} alt="Fitness equipment ready for training" /><span className="image-stamp">FIELD<br />NOTE / 01</span></div>
        <div className="hero-foot"><span>SCROLL TO BUILD YOUR SETUP</span><span>COD / PAN-INDIA / SUPPORT</span></div>
      </section>

      <section className="manifesto-strip"><span>NO GIMMICKS</span><strong>Equipment should make the next session easier to start.</strong><span>YES, REALLY</span></section>

      <section className="category-desk section-pad" id="shop"><Reveal><div className="section-marker"><span>02</span><span>SHOP BY INTENT</span></div><div className="section-heading"><h2>Start with<br /><em>the work.</em></h2><Note>not another endless grid</Note></div><div className="category-list">{CATEGORIES.map((category) => <Link className="category-row" key={category.number} to={`/products?category=${category.query}`}><span className="category-number">{category.number}</span><img src={category.image} alt="" /><span className="category-main"><strong>{category.name}</strong><small>{category.text}</small></span><ArrowRight className="category-arrow" /></Link>)}</div></Reveal></section>

      <section className="catalog-desk section-pad" id="catalog"><Reveal><div className="section-marker"><span>03</span><span>LIVE SHELF / SHOPIFY CATALOG</span></div><div className="section-heading catalog-heading"><h2>The pieces<br /><em>in rotation.</em></h2><div><p>Six products from the live catalog. No fake “trending” labels, no staged ranking.</p><Link to="/products" className="text-link">View everything <ArrowRight size={15} /></Link></div></div>{featured.length ? <div className="product-shelf">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="catalog-empty">The shelf is loading. <Link to="/products">Open the full catalog →</Link></div>}<Note align="right">live stock, not theatre</Note></Reveal></section>

      <section className="review-desk section-pad" id="notes"><Reveal><div className="section-marker"><span>04</span><span>FIELD NOTES / CUSTOMERS</span></div><div className="review-layout"><h2>People who<br /><em>showed up.</em></h2><div className="review-stack">{REVIEWS.map(([number, quote, author]) => <blockquote key={number}><span>{number}</span><p>“{quote}”</p><cite>{author}</cite></blockquote>)}</div></div><Note>specific beats impressive</Note></Reveal></section>

      <section className="method-desk section-pad" id="method"><Reveal><div className="section-marker"><span>05</span><span>THE OPERATING METHOD</span></div><div className="method-intro"><h2>From order<br /><em>to routine.</em></h2><p>Here is the part most storefronts hide: what happens after the click. We keep it visible because trust is built in the boring details.</p></div><div className="journey-list">{JOURNEY.map(([number, title, text]) => <div className="journey-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Check size={18} /></div>)}</div><div className="proof-line"><span><Truck size={17} /> Pan-India delivery</span><span><ShieldCheck size={17} /> Inspected before dispatch</span><span><Package size={17} /> COD available</span></div></Reveal></section>

      <section className="story-desk section-pad"><Reveal><div className="story-card"><div className="story-card-index">06 / A NOTE FROM THE DESK</div><div className="story-card-copy"><h2>We are not trying<br />to sell you a <em>personality.</em></h2><p>FitGearzzz exists for the space between wanting to train and actually training. We curate the objects that remove a little friction: a reliable band, a solid dumbbell, a mat that stays put.</p><p>Small business, direct answers, clear rules. That is the whole idea.</p><Link to="/about" className="ink-button ink-button-light">Read the story <ArrowRight size={17} /></Link></div><div className="story-card-mark">FZ<br /><span>EST. / IN MOTION</span></div></div></Reveal></section>

      <section className="newsletter-desk section-pad"><Reveal><div className="newsletter-grid"><div><span className="section-marker">07 / THE OCCASIONAL NOTE</span><h2>Useful things.<br /><em>Nothing noisy.</em></h2></div><div><p>Restocks, new arrivals and training ideas. One or two emails when there is something worth opening.</p>{subscribed ? <p className="success-line">You are in. Check your inbox.</p> : <form onSubmit={subscribe}><label htmlFor="home-email">Email address</label><div className="email-row"><input id="home-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /><button type="submit">Join <ArrowRight size={16} /></button></div></form>}</div></div></Reveal></section>
      <footer className="desk-footer"><span>FITGEARZZZ / MADE FOR THE NEXT SET</span><a href="#top">Back to top ↑</a><span>© 2026</span></footer>
    </main>
  );
}

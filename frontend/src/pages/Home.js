import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Package,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/shopifyService';
import { JOURNAL, COLLECTION_SPLIT } from '../data/editorialContent';
import './Home.css';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=85';

const CATEGORIES = [
  {
    number: '01',
    name: 'Train',
    text: 'Dumbbells, kettlebells, bars and bands for the work that compounds.',
    query: 'train',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '02',
    name: 'Carry',
    text: 'Bags, bottles and daily essentials that move with you.',
    query: 'carry',
    image:
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '03',
    name: 'Recover',
    text: 'Rollers, mats and recovery pieces that earn their space.',
    query: 'recover',
    image:
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '04',
    name: 'Wear',
    text: 'Training wear and athletic streetwear built for repeat wear.',
    query: 'wear',
    image:
      'https://images.unsplash.com/photo-1554139844-af2fc8ad3a3a?auto=format&fit=crop&w=900&q=85',
  },
];

/*
 * Keep these statements limited to what the storefront can actually
 * support. Do not restore inspection, COD, delivery-time or guarantee
 * claims until the relevant operating process is confirmed.
 */
const JOURNEY = [
  [
    '01',
    'Choose with context',
    'Short descriptions and useful specifications help you compare options.',
  ],
  [
    '02',
    'See what is included',
    'Product details and images are intended to make the choice clearer.',
  ],
  [
    '03',
    'Choose how to pay',
    'Available payment methods and any applicable charges are shown at checkout.',
  ],
  [
    '04',
    'Train with it',
    'If something needs attention after delivery, message us through the contact page.',
  ],
];

const NEWSLETTER_ENDPOINT = '/api/newsletter';

function Reveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Note({ children, align = 'left' }) {
  return (
    <p className={`margin-note margin-note-${align}`}>
      {children}
      <span>↗</span>
    </p>
  );
}

function SectionBreak({ left, children, right }) {
  return (
    <section className="section-break">
      <span className="section-break-label">{left}</span>

      <p className="section-break-message">{children}</p>

      <span className="section-break-label section-break-label-right">
        {right}
      </span>
    </section>
  );
}

function ShelfState({ title, message, action }) {
  return (
    <div
      className="shelf-state"
      role="status"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        padding: 'clamp(24px, 5vw, 48px)',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0.55)',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 'clamp(20px, 2.5vw, 24px)',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          maxWidth: '52ch',
          fontSize: '15px',
          lineHeight: 1.7,
        }}
      >
        {message}
      </p>

      {action}
    </div>
  );
}

function ProductShelf({ products, status, onRetry, limit = 4 }) {
  if (status === 'loading') {
    return (
      <div
        className="product-shelf product-shelf-4"
        aria-busy="true"
        aria-live="polite"
      >
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="shelf-skeleton" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <ShelfState
        title="We couldn’t load this shelf."
        message="This looks like a connection or catalog issue—not an empty collection. Please try again in a moment."
        action={
          <button
            className="ink-button"
            type="button"
            onClick={onRetry}
          >
            Try again
            <ArrowRight size={16} />
          </button>
        }
      />
    );
  }

  if (products.length === 0) {
    return (
      <ShelfState
        title="No featured pieces are available right now."
        message="Visit the full catalog to explore the current selection."
        action={
          <Link className="ink-button" to="/products">
            Explore the catalog
            <ArrowRight size={16} />
          </Link>
        }
      />
    );
  }

  return (
    <div className="product-shelf product-shelf-4">
      {products.slice(0, limit).map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [shelfStatus, setShelfStatus] = useState('loading');
  const [reloadKey, setReloadKey] = useState(0);

  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    let active = true;

    setShelfStatus('loading');

    fetchProducts(50)
      .then((items) => {
        if (!active) {
          return;
        }

        const safeItems = Array.isArray(items) ? items : [];
        setProducts(safeItems);
        setShelfStatus('ready');
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setProducts([]);
        setShelfStatus('error');
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const heroImage = HERO_IMAGE;

  const featured = products
    .filter(
      (product) =>
        product.tags?.includes('bestseller') ||
        product.tags?.includes('new')
    )
    .slice(0, 4);

  const featuredIds = new Set(featured.map((product) => product.id));

  const splitShelf = products
    .filter((product) => !featuredIds.has(product.id))
    .slice(0, 4);

  const byHandle = Object.fromEntries(
    products.map((product) => [product.handle, product])
  );

  const retryShelf = () => {
    setReloadKey((current) => current + 1);
  };

  const subscribe = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail || newsletterStatus === 'submitting') {
      return;
    }

    setNewsletterStatus('submitting');
    setNewsletterMessage('');

    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        throw new Error(`Newsletter request failed: ${response.status}`);
      }

      const result = await response.json();

      if (result?.accepted !== true) {
        throw new Error('Newsletter signup was not confirmed.');
      }

      setNewsletterStatus('success');
      setNewsletterMessage(
        'Your signup was accepted. Check your inbox for confirmation.'
      );
      setEmail('');
    } catch {
      setNewsletterStatus('error');
      setNewsletterMessage(
        'We couldn’t confirm your signup. Please try again, or use the contact page.'
      );
    }
  };

  return (
    <main className="home-artifact" id="main">
      <section className="hero-desk" id="top">
        <div className="hero-index">
          FITGEARZZZ / 2026
          <br />
          INDIA / 01—04
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            A better home gym starts with fewer, better decisions.
          </p>

          <h1>
            <span className="hero-train-word">Train</span>
            <br />
            <em>like it matters.</em>
          </h1>

          <p className="hero-description">
            Equipment and everyday training essentials, selected for real
            rooms, real budgets and the work you actually plan to do.
          </p>

          <a className="ink-button" href="#shop">
            Enter the catalog
            <ArrowDownRight size={17} />
          </a>
        </div>

        <div className="hero-image-wrap">
          <img
            src={heroImage}
            alt="Fitness equipment arranged for a home training session"
            width="1400"
            height="933"
            fetchpriority="high"
            decoding="async"
          />

          <span className="image-stamp">
            FIELD
            <br />
            NOTE / 01
          </span>
        </div>

        <div className="hero-foot">
          <span>Scroll to build your setup</span>
          <span>Clear rules / Support</span>
        </div>
      </section>

      <SectionBreak left="No gimmicks" right="Yes, really">
        Better gear makes the next session easier to start.
      </SectionBreak>

      <section className="drop-desk section-pad" id="drop">
        <Reveal>
          <div className="section-marker">
            <span>01</span>
            <span>The drop / new &amp; in rotation</span>
          </div>

          <div className="section-heading catalog-heading">
            <h2>
              Fresh
              <br />
              <em>in rotation.</em>
            </h2>

            <div>
              <p>
                A short shelf of new arrivals and pieces marked for rotation.
                No invented rankings—just a place to begin.
              </p>

              <Link to="/products?tag=new" className="text-link">
                See new arrivals
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <ProductShelf
            products={featured}
            status={shelfStatus}
            onRetry={retryShelf}
          />
        </Reveal>
      </section>

      <section className="category-desk section-pad" id="shop">
        <Reveal>
          <div className="section-marker">
            <span>02</span>
            <span>Shop by intent</span>
          </div>

          <div className="section-heading">
            <h2>
              Start with
              <br />
              <em>the work.</em>
            </h2>

            <Note>not another endless grid</Note>
          </div>

          <div className="category-list">
            {CATEGORIES.map((category) => (
              <Link
                className="category-row"
                key={category.number}
                to={`/products?pillar=${category.query}`}
              >
                <span className="category-number">{category.number}</span>

                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="900"
                  height="600"
                />

                <span className="category-main">
                  <strong>{category.name}</strong>
                  <small>{category.text}</small>
                </span>

                <ArrowRight className="category-arrow" />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <SectionBreak left="Less, but better" right="Curated">
        Keep the pieces you reach for.
      </SectionBreak>

      <section className="split-desk section-pad" id="collections">
        <Reveal>
          <div className="section-marker">
            <span>03</span>
            <span>Curated / the collection split</span>
          </div>

          <div className="split-grid">
            <Link
              to={`/products?pillar=${COLLECTION_SPLIT.primary.pillar}`}
              className="split-primary"
            >
              <img
                src={COLLECTION_SPLIT.primary.image}
                alt="Free weights in a training room"
                loading="lazy"
                decoding="async"
                width="1400"
                height="1000"
              />

              <div className="split-copy">
                <span className="split-label">
                  01 / {COLLECTION_SPLIT.primary.title}
                </span>

                <h3>{COLLECTION_SPLIT.primary.line}</h3>
                <p>{COLLECTION_SPLIT.primary.text}</p>

                <span className="text-link text-link-light">
                  Shop {COLLECTION_SPLIT.primary.title}
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>

            <div className="split-secondary">
              {COLLECTION_SPLIT.secondary.map((item, index) => (
                <Link
                  key={item.pillar}
                  to={`/products?pillar=${item.pillar}`}
                  className="split-card"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="900"
                    height="600"
                  />

                  <div className="split-copy">
                    <span className="split-label">
                      0{index + 2} / {item.title}
                    </span>

                    <h3>{item.line}</h3>

                    <span className="text-link text-link-light">
                      Shop {item.title}
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {shelfStatus === 'ready' && splitShelf.length > 0 ? (
            <div className="product-shelf product-shelf-4 split-shelf">
              {splitShelf.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : null}

          <Note align="right">real stock, not theatre</Note>
        </Reveal>
      </section>

      <SectionBreak left="Progress" right="The journal">
        Fitness is not a place you visit. It is a standard you carry.
      </SectionBreak>

      <section className="journal-desk section-pad" id="progress">
        <Reveal>
          <div className="section-marker">
            <span>04</span>
            <span>Progress / routines, education, practice</span>
          </div>

          <div className="review-layout">
            <div>
              <h2>
                Train for
                <br />
                <em>the life you live.</em>
              </h2>

              <p className="journal-intro">
                Practical notes on training, recovery and choosing gear. Each
                one links to the pieces it talks about.
              </p>

              <Link to="/blog" className="ink-button ink-button-light">
                Read the journal
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="journal-stack">
              {JOURNAL.map((entry) => {
                const linkedProducts = entry.products
                  .map((handle) => byHandle[handle])
                  .filter(Boolean);

                return (
                  <article
                    key={entry.number}
                    className="journal-entry"
                  >
                    <span className="journal-num">{entry.number}</span>

                    <div>
                      <p className="journal-cat">{entry.category}</p>

                      <h3>
                        <Link to={`/blog/${entry.slug}`}>
                          {entry.title}
                        </Link>
                      </h3>

                      <p className="journal-excerpt">
                        {entry.excerpt}
                      </p>

                      {linkedProducts.length > 0 && (
                        <div className="journal-products">
                          {linkedProducts.map((product) => (
                            <Link
                              key={product.id}
                              to={`/products/${product.handle}`}
                            >
                              <img
                                src={product.image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                width="48"
                                height="60"
                              />
                              <span>{product.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <SectionBreak left="How it works" right="Clear rules">
        Trust lives in what happens after checkout.
      </SectionBreak>

      <section className="method-desk section-pad" id="method">
        <Reveal>
          <div className="section-marker">
            <span>05</span>
            <span>The operating method</span>
          </div>

          <div className="method-intro">
            <h2>
              From order
              <br />
              <em>to routine.</em>
            </h2>

            <p>
              Here is the part most storefronts hide: what happens after the
              click. We keep the practical details visible.
            </p>
          </div>

          <div className="journey-list">
            {JOURNEY.map(([number, title, text]) => (
              <div className="journey-row" key={number}>
                <span>{number}</span>

                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                <Check size={18} />
              </div>
            ))}
          </div>

          <div className="proof-line">
            <span>
              <Truck size={17} />
              Delivery options at checkout
            </span>

            <span>
              <ShieldCheck size={17} />
              Clear product information
            </span>

            <span>
              <Package size={17} />
              Support through contact
            </span>
          </div>
        </Reveal>
      </section>

      <SectionBreak left="From the desk" right="FitGearzzz">
        Direct answers. Clear rules. Better training.
      </SectionBreak>

      <section className="story-desk section-pad">
        <Reveal>
          <div className="story-card">
            <div className="story-card-index">
              06 / A note from the desk
            </div>

            <div className="story-card-copy">
              <h2>
                We are not trying
                <br />
                to sell you a <em>personality.</em>
              </h2>

              <p>
                FitGearzzz exists for the space between wanting to train and
                actually training. We curate the objects that remove a little
                friction: a reliable band, a solid dumbbell, a mat that stays
                put.
              </p>

              <p>
                Small business, direct answers, clear rules. That is the whole
                idea.
              </p>

              <Link to="/about" className="ink-button ink-button-light">
                Read the story
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="story-card-mark">
              FZ
              <br />
              <span>EST. / IN MOTION</span>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionBreak left="Occasional note" right="No spam">
        Useful updates, only when they matter.
      </SectionBreak>

      <section className="newsletter-desk section-pad" id="newsletter">
        <Reveal>
          <div className="newsletter-grid">
            <div>
              <span className="section-marker">
                07 / The occasional note
              </span>

              <h2>
                Useful things.
                <br />
                <em>Nothing noisy.</em>
              </h2>
            </div>

            <div>
              <p>
                Restocks, new arrivals and training ideas. One or two emails
                when there is something worth opening.
              </p>

              {newsletterStatus === 'success' ? (
                <p
                  className="success-line"
                  role="status"
                >
                  {newsletterMessage}
                </p>
              ) : (
                <form onSubmit={subscribe} noValidate={false}>
                  <label htmlFor="home-email">Email address</label>

                  <div className="email-row">
                    <input
                      id="home-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);

                        if (newsletterStatus === 'error') {
                          setNewsletterStatus('idle');
                          setNewsletterMessage('');
                        }
                      }}
                      placeholder="you@example.com"
                      required
                      aria-describedby={
                        newsletterStatus === 'error'
                          ? 'home-email-error'
                          : undefined
                      }
                    />

                    <button
                      type="submit"
                      disabled={newsletterStatus === 'submitting'}
                    >
                      {newsletterStatus === 'submitting'
                        ? 'Joining…'
                        : 'Join'}

                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {newsletterStatus === 'error' && (
                    <p
                      id="home-email-error"
                      role="alert"
                      style={{
                        margin: '12px 0 0',
                        fontSize: '14px',
                        lineHeight: 1.6,
                      }}
                    >
                      {newsletterMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

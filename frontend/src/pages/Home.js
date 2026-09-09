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

const JOURNEY = [
  [
    '01',
    'Choose with context',
    'Short descriptions, useful specs and products grouped around how you train.',
  ],
  [
    '02',
    'We check it',
    'Each item is inspected and packed before dispatch. If it is not right, it does not leave.',
  ],
  [
    '03',
    'Pay your way',
    'COD or encrypted online payment. Same price, same clear rules.',
  ],
  [
    '04',
    'Train with it',
    'If something feels wrong after delivery, message us and we will help resolve it.',
  ],
];

function Reveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let active = true;

    fetchProducts()
      .then((items) => {
        if (active) {
          setProducts(items || []);
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const heroImage = HERO_IMAGE;
  const drop = products
    .filter((p) => p.tags?.includes('bestseller') || p.tags?.includes('new'))
    .slice(0, 4);
  const dropIds = new Set(drop.map((p) => p.id));
  const splitShelf = products.filter((p) => !dropIds.has(p.id)).slice(0, 4);
  const byHandle = Object.fromEntries(products.map((p) => [p.handle, p]));

  const subscribe = (event) => {
    event.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
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
            Equipment and everyday training essentials, selected for real rooms,
            real budgets and the work you actually plan to do.
          </p>

          <a className="ink-button" href="#shop">
            Enter the catalog
            <ArrowDownRight size={17} />
          </a>
        </div>

        <div className="hero-image-wrap">
          <img src={heroImage} alt="Fitness equipment ready for training" />

          <span className="image-stamp">
            FIELD
            <br />
            NOTE / 01
          </span>
        </div>

        <div className="hero-foot">
          <span>Scroll to build your setup</span>
          <span>COD / Pan-India / Support</span>
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
                Bestsellers and new arrivals. No staged ranking — just the
                pieces people keep reaching for.
              </p>

              <Link to="/products?tag=new" className="text-link">
                See new arrivals
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {drop.length ? (
            <div className="product-shelf product-shelf-4">
              {drop.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="product-shelf product-shelf-4" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="shelf-skeleton" />
              ))}
            </div>
          )}
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

                <img src={category.image} alt="" />

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
                width="1400"
                height="1000"
              />
              <div className="split-copy">
                <span className="split-label">01 / {COLLECTION_SPLIT.primary.title}</span>
                <h3>{COLLECTION_SPLIT.primary.line}</h3>
                <p>{COLLECTION_SPLIT.primary.text}</p>
                <span className="text-link text-link-light">
                  Shop {COLLECTION_SPLIT.primary.title}
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>

            <div className="split-secondary">
              {COLLECTION_SPLIT.secondary.map((s, i) => (
                <Link key={s.pillar} to={`/products?pillar=${s.pillar}`} className="split-card">
                  <img src={s.image} alt="" loading="lazy" width="900" height="600" />
                  <div className="split-copy">
                    <span className="split-label">0{i + 2} / {s.title}</span>
                    <h3>{s.line}</h3>
                    <span className="text-link text-link-light">
                      Shop {s.title}
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {splitShelf.length > 0 && (
            <div className="product-shelf product-shelf-4 split-shelf">
              {splitShelf.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

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
              {JOURNAL.map((entry) => (
                <article key={entry.number} className="journal-entry">
                  <span className="journal-num">{entry.number}</span>
                  <div>
                    <p className="journal-cat">{entry.category}</p>
                    <h3>
                      <Link to={`/blog/${entry.slug}`}>{entry.title}</Link>
                    </h3>
                    <p className="journal-excerpt">{entry.excerpt}</p>
                    <div className="journal-products">
                      {entry.products
                        .map((h) => byHandle[h])
                        .filter(Boolean)
                        .map((p) => (
                          <Link key={p.id} to={`/products/${p.handle}`}>
                            <img src={p.image} alt="" loading="lazy" width="48" height="60" />
                            <span>{p.title}</span>
                          </Link>
                        ))}
                    </div>
                  </div>
                </article>
              ))}
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
              click. We keep it visible because trust is built in the boring
              details.
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
              Pan-India delivery
            </span>

            <span>
              <ShieldCheck size={17} />
              Inspected before dispatch
            </span>

            <span>
              <Package size={17} />
              COD available
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

      <section className="newsletter-desk section-pad">
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

              {subscribed ? (
                <p className="success-line">
                  You are in. Check your inbox.
                </p>
              ) : (
                <form onSubmit={subscribe}>
                  <label htmlFor="home-email">Email address</label>

                  <div className="email-row">
                    <input
                      id="home-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                    />

                    <button type="submit">
                      Join
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  );
}

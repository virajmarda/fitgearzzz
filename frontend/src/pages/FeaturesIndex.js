// src/pages/FeaturesIndex.js
// /features — editorial index page.
// Magazine contents layout: numbered, image-led, typography-first.
// Uses var(--fg-*) design tokens exclusively.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { features } from '../data/features';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--fg-bg)',
    color: 'var(--fg-text-primary)',
    fontFamily: 'var(--fg-font-sans)',
  },
  hero: {
    background: 'var(--fg-surface)',
    borderBottom: '1px solid var(--fg-border)',
    paddingTop: 'var(--fg-space-20)',
    paddingBottom: 'var(--fg-space-16)',
  },
  heroInner: {
    maxWidth: 'var(--fg-content-width)',
    margin: '0 auto',
    padding: '0 var(--fg-space-6)',
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--fg-space-3)',
    marginBottom: 'var(--fg-space-5)',
  },
  eyebrowLine: {
    display: 'block',
    width: '2rem',
    height: '1px',
    background: 'var(--fg-orange)',
  },
  eyebrowText: {
    fontSize: 'var(--fg-text-xs)',
    fontWeight: 'var(--fg-weight-semibold)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--fg-tracking-widest)',
    color: 'var(--fg-orange)',
  },
  h1: {
    fontFamily: 'var(--fg-font-display)',
    fontSize: 'var(--fg-text-5xl)',
    fontWeight: 'var(--fg-weight-black)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--fg-tracking-tight)',
    lineHeight: 'var(--fg-leading-tight)',
    color: 'var(--fg-text-primary)',
    marginBottom: 'var(--fg-space-5)',
  },
  heroDesc: {
    fontSize: 'var(--fg-text-lg)',
    lineHeight: 'var(--fg-leading-relaxed)',
    color: 'var(--fg-text-secondary)',
    maxWidth: '42rem',
    marginBottom: 'var(--fg-space-2)',
  },
  heroSub: {
    fontSize: 'var(--fg-text-sm)',
    lineHeight: 'var(--fg-leading-relaxed)',
    color: 'var(--fg-text-muted)',
    maxWidth: '42rem',
  },
  list: {
    background: 'var(--fg-bg)',
    paddingTop: 'var(--fg-space-12)',
    paddingBottom: 'var(--fg-space-20)',
  },
  listInner: {
    maxWidth: 'var(--fg-content-width)',
    margin: '0 auto',
    padding: '0 var(--fg-space-6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1px',
    background: 'var(--fg-border)',
  },
  cta: {
    background: 'var(--fg-surface)',
    borderTop: '1px solid var(--fg-border)',
    paddingTop: 'var(--fg-space-12)',
    paddingBottom: 'var(--fg-space-12)',
    textAlign: 'center',
  },
};

const FeatureRow = ({ feature, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/features/${feature.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: hovered ? 'var(--fg-surface)' : 'var(--fg-bg)',
        transition: 'background var(--fg-transition-fast)',
        textDecoration: 'none',
      }}
      aria-label={`Read feature: ${feature.title}`}
    >
      <article
        style={{
          padding: 'var(--fg-space-8) var(--fg-space-6)',
          display: 'grid',
          gridTemplateColumns: '3rem 1fr',
          gap: 'var(--fg-space-6)',
          alignItems: 'start',
        }}
      >
        {/* Index number */}
        <span
          style={{
            fontFamily: 'var(--fg-font-mono)',
            fontSize: 'var(--fg-text-xs)',
            color: hovered ? 'var(--fg-orange)' : 'var(--fg-text-disabled)',
            paddingTop: '0.2rem',
            transition: 'color var(--fg-transition-fast)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Main content: image + text */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--fg-space-5)',
          }}
          className="feature-row-content"
        >
          {/* Image */}
          <div
            style={{
              borderRadius: 'var(--fg-radius-sm)',
              overflow: 'hidden',
              aspectRatio: 'var(--fg-ratio-card)',
              background: 'var(--fg-surface-2)',
            }}
          >
            <img
              src={feature.heroImage}
              alt={feature.heroAlt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 500ms var(--fg-ease-out)',
              }}
            />
          </div>

          {/* Text block */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--fg-space-4)' }}>
            <div>
              {/* Kicker + read time */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--fg-space-3)',
                  marginBottom: 'var(--fg-space-3)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 'var(--fg-weight-semibold)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--fg-tracking-widest)',
                    color: 'var(--fg-orange)',
                  }}
                >
                  {feature.kicker}
                </span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--fg-border-strong)' }} />
                <span
                  style={{
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--fg-tracking-wide)',
                    color: 'var(--fg-text-muted)',
                  }}
                >
                  {feature.readTime}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: 'var(--fg-font-display)',
                  fontSize: 'var(--fg-text-2xl)',
                  fontWeight: 'var(--fg-weight-bold)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--fg-tracking-tight)',
                  lineHeight: 'var(--fg-leading-tight)',
                  color: hovered ? 'var(--fg-orange)' : 'var(--fg-text-primary)',
                  transition: 'color var(--fg-transition-fast)',
                  marginBottom: 'var(--fg-space-3)',
                }}
              >
                {feature.title}
              </h2>

              {/* Excerpt */}
              <p
                style={{
                  fontSize: 'var(--fg-text-sm)',
                  lineHeight: 'var(--fg-leading-relaxed)',
                  color: 'var(--fg-text-muted)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {feature.excerpt}
              </p>
            </div>

            {/* Footer meta */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'var(--fg-space-4)',
                borderTop: '1px solid var(--fg-border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--fg-space-3)',
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--fg-tracking-wide)',
                  color: 'var(--fg-text-disabled)',
                }}
              >
                <span>{feature.location}</span>
                <span>·</span>
                <span>{feature.date}</span>
              </div>
              <ArrowUpRight
                size={15}
                style={{
                  color: hovered ? 'var(--fg-orange)' : 'var(--fg-text-disabled)',
                  transition: 'color var(--fg-transition-fast)',
                  transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)',
                  transitionProperty: 'color, transform',
                }}
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

const FeaturesIndex = () => {
  useEffect(() => {
    document.title = 'Features — FitGearzzz';
  }, []);

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine} />
            <p style={styles.eyebrowText}>Editorial</p>
          </div>
          <h1 style={styles.h1}>Features</h1>
          <p style={styles.heroDesc}>
            How we source, what we reject, and why certain decisions matter more than others.
          </p>
          <p style={styles.heroSub}>
            Reported pieces on the mechanics of running a deliberate commerce brand.
          </p>
        </div>
      </section>

      {/* Feature list */}
      <section style={styles.list}>
        <div style={styles.listInner}>
          <div style={styles.grid}>
            {features.map((feature, index) => (
              <FeatureRow key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={styles.cta}>
        <div style={styles.heroInner}>
          <p
            style={{
              fontSize: 'var(--fg-text-sm)',
              color: 'var(--fg-text-muted)',
              marginBottom: 'var(--fg-space-5)',
            }}
          >
            New features published monthly
          </p>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--fg-space-2)',
              fontSize: 'var(--fg-text-xs)',
              fontWeight: 'var(--fg-weight-medium)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--fg-tracking-widest)',
              color: 'var(--fg-text-secondary)',
              textDecoration: 'none',
              transition: 'color var(--fg-transition-fast)',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg-text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-text-secondary)')}
          >
            Browse the catalog
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>

      {/* Responsive grid override — lg breakpoint: image left, text right */}
      <style>{`
        @media (min-width: 768px) {
          .feature-row-content {
            grid-template-columns: 2fr 3fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesIndex;

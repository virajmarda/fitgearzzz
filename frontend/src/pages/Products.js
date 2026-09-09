import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/shopifyService';
import { PILLARS, SITE } from '../config/siteConfig';
import { trackEvent } from '../lib/analytics';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: low to high', value: 'price_asc' },
  { label: 'Price: high to low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
];

const PILLAR_TABS = [{ key: '', name: 'All' }, ...PILLARS.filter((p) => p.key !== 'progress')];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState('featured');

  const pillar = searchParams.get('pillar') || searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const tag = searchParams.get('tag') || '';

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    fetchProducts(50)
      .then((items) => {
        if (!active) return;
        setAll(items || []);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (search) trackEvent('search', { search_term: search });
  }, [search]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    // pillar and category are mutually exclusive
    if (key === 'pillar') next.delete('category');
    setSearchParams(next);
  };

  const filtered = useMemo(() => {
    let list = [...all];
    if (pillar) {
      const key = pillar.toLowerCase();
      list = list.filter(
        (p) => p.collection === key || (p.category || '').toLowerCase() === key
      );
    }
    if (tag) list = list.filter((p) => (p.tags || []).includes(tag));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.includes(q))
      );
    }
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'newest')
      list.sort(
        (a, b) => (b.tags?.includes('new') ? 1 : 0) - (a.tags?.includes('new') ? 1 : 0)
      );
    return list;
  }, [all, pillar, tag, search, sort]);

  const activePillar = PILLARS.find((p) => p.key === pillar.toLowerCase());
  const heading = activePillar ? activePillar.name : 'All products';

  const clearAll = () => setSearchParams({});
  const hasFilters = pillar || search || tag;

  useEffect(() => {
    document.title = `${heading} \u2014 ${SITE.name}`;
  }, [heading]);

  return (
    <main id="main" className="fg-surface min-h-screen bg-[#f1eee8]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.1em] text-[#77736d] mb-6">
          <Link to="/" className="hover:text-[#f15a24]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#171717]">{heading}</span>
        </nav>

        {/* Header */}
        <header className="mb-8 border-b border-[#171717] pb-6">
          <p className="fg-eyebrow mb-3">Shop / Fitgearzzz</p>
          <h1 className="text-[clamp(38px,6vw,72px)] font-bold tracking-[-0.045em] leading-[0.98]">
            {heading}
          </h1>
          {activePillar && (
            <p className="mt-3 text-[14px] text-[#77736d] max-w-md">{activePillar.blurb}</p>
          )}
          {search && (
            <p className="mt-3 text-[14px] text-[#77736d]">
              Results for &ldquo;<span className="text-[#171717] font-semibold">{search}</span>&rdquo;
            </p>
          )}
        </header>

        {/* Pillar tabs + sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {PILLAR_TABS.map((p) => {
              const on = pillar.toLowerCase() === p.key;
              return (
                <button
                  key={p.key || 'all'}
                  type="button"
                  onClick={() => setParam('pillar', p.key)}
                  aria-pressed={on}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] border transition-colors ${
                    on
                      ? 'bg-[#171717] text-[#f1eee8] border-[#171717]'
                      : 'bg-transparent text-[#171717] border-[#d4d0c8] hover:border-[#171717]'
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#77736d] hidden sm:inline">
              {loading ? '\u2026' : `${filtered.length} item${filtered.length === 1 ? '' : 's'}`}
            </span>
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#77736d] pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="appearance-none bg-transparent border border-[#d4d0c8] hover:border-[#171717] text-[#171717] text-[12px] font-semibold pl-8 pr-8 py-2 focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736d] pointer-events-none" />
            </div>
          </div>
        </div>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-[12px] text-[#77736d] hover:text-[#f15a24] mb-6"
          >
            <X className="w-3.5 h-3.5" /> Clear filters
          </button>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border border-[#d4d0c8] bg-[#e4e0d8] animate-pulse">
                <div className="aspect-[4/5] bg-[#dcd6cc]" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-1/3 bg-[#dcd6cc]" />
                  <div className="h-4 w-2/3 bg-[#dcd6cc]" />
                  <div className="h-9 w-full bg-[#dcd6cc] mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 border border-[#d4d0c8]">
            <p className="text-[#171717] text-lg font-semibold mb-2">Something went wrong</p>
            <p className="text-[#77736d] text-sm mb-6">We couldn&rsquo;t load the catalogue. Please try again.</p>
            <button onClick={() => window.location.reload()} className="fg-btn">Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-[#d4d0c8]">
            <p className="text-[#171717] text-lg font-semibold mb-2">No products found</p>
            <p className="text-[#77736d] text-sm mb-6">Try a different pillar or clear your filters.</p>
            <button onClick={clearAll} className="fg-btn">View everything</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;

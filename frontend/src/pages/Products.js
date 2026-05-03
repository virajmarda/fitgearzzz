import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts as getShopifyProducts } from '../services/shopifyService';

const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Top Rated', value: 'rating' },
];

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: 0,
    maxPrice: 5000,
    brand: '',
    minRating: 0,
  });

  const categories = ['Gym Equipment', 'Supplements', 'Apparel', 'Accessories'];
  const brands = ['PowerFit', 'IronGrip', 'FlexBand', 'ZenFit', 'NutriFuel', 'RecoverMax', 'VitaStrong', 'PurePower', 'FitWear', 'ActivePro', 'SportMax', 'CarryAll', 'HydroFit', 'TechFit', 'GripPro', 'CardioMax'];

  useEffect(() => {
    fetchProducts();
  }, [filters, sort]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const shopifyProducts = await getShopifyProducts();
      let filteredProducts = shopifyProducts;

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        );
      }
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product => product.category === filters.category);
      }
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(product => product.brand === filters.brand);
      }
      if (filters.minRating > 0) {
        filteredProducts = filteredProducts.filter(product => product.rating >= filters.minRating);
      }

      // Sort
      if (sort === 'price_asc') filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      else if (sort === 'price_desc') filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      else if (sort === 'rating') filteredProducts = [...filteredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0));

      setAllProducts(filteredProducts);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ category: '', search: '', minPrice: 0, maxPrice: 5000, brand: '', minRating: 0 });
    setSearchParams({});
  };

  const removeFilter = (key) => {
    const newFilters = { ...filters, [key]: key === 'minPrice' ? 0 : key === 'maxPrice' ? 5000 : key === 'minRating' ? 0 : '' };
    setFilters(newFilters);
  };

  const activeFilterChips = [
    filters.category && { key: 'category', label: `Category: ${filters.category}` },
    filters.search && { key: 'search', label: `Search: "${filters.search}"` },
    filters.brand && { key: 'brand', label: `Brand: ${filters.brand}` },
    filters.minRating > 0 && { key: 'minRating', label: `Rating: ${filters.minRating}+ \u2605` },
    (filters.minPrice > 0 || filters.maxPrice < 5000) && { key: 'priceRange', label: `Price: \u20b9${filters.minPrice}-\u20b9${filters.maxPrice}` },
  ].filter(Boolean);

  // Pagination
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = allProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-oswald text-4xl font-bold text-white uppercase tracking-wide">All Products</h1>
          <p className="text-zinc-400 text-sm mt-1">Showing {allProducts.length} product{allProducts.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Top bar: Sort + Filter toggle + Active chips */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-zinc-800 border border-zinc-700 text-white rounded-full px-4 py-2 pr-9 text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 border border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 bg-transparent rounded-full px-4 py-2 text-sm transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {activeFilterChips.length > 0 && (
              <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFilterChips.length}</span>
            )}
          </button>

          {/* Active filter chips */}
          {activeFilterChips.map((chip) => (
            <span
              key={chip.key}
              className="flex items-center gap-1 bg-orange-500/20 text-orange-400 border border-orange-500/40 rounded-full px-3 py-1 text-xs font-semibold"
            >
              {chip.label}
              <button onClick={() => removeFilter(chip.key)} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {activeFilterChips.length > 0 && (
            <button onClick={clearFilters} className="text-xs text-zinc-400 hover:text-red-400 underline transition-colors">
              Clear all
            </button>
          )}
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 shrink-0`}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-6 sticky top-20">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-base">Filters</h3>
                <button onClick={clearFilters} className="text-xs text-orange-500 hover:text-orange-400">Clear All</button>
              </div>

              {/* Search */}
              <div>
                <label className="text-zinc-300 text-sm font-semibold block mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-3 py-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-zinc-300 text-sm font-semibold block mb-2">Category</label>
                <div className="space-y-1">
                  <button
                    onClick={() => setFilters({ ...filters, category: '' })}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      filters.category === '' ? 'bg-orange-500 text-white' : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                        filters.category === cat ? 'bg-orange-500 text-white' : 'text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-zinc-300 text-sm font-semibold block mb-2">
                  Price: \u20b9{filters.minPrice} - \u20b9{filters.maxPrice}
                </label>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="text-zinc-300 text-sm font-semibold block mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-3 py-2 focus:border-orange-500 focus:outline-none"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Mobile: Close filters */}
              <button
                onClick={() => setShowFilters(false)}
                className="md:hidden w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl py-2 transition-colors"
              >
                Show {allProducts.length} Results
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-zinc-800 rounded-2xl aspect-square animate-pulse" />
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-400 text-lg mb-2">No products found</p>
                <p className="text-zinc-500 text-sm mb-6">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-6 py-3 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      \u2190 Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${
                          currentPage === i + 1
                            ? 'bg-orange-500 text-white'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Next \u2192
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

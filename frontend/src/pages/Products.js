import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import api from '../utils/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: 0,
    maxPrice: 500,
    brand: '',
    minRating: 0,
  });

  const categories = ['Gym Equipment', 'Supplements', 'Apparel', 'Accessories'];
  const brands = ['PowerFit', 'IronGrip', 'FlexBand', 'ZenFit', 'NutriFuel', 'RecoverMax', 'VitaStrong', 'PurePower', 'FitWear', 'ActivePro', 'SportMax', 'CarryAll', 'HydroFit', 'TechFit', 'GripPro', 'CardioMax'];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.search) params.search = filters.search;
      if (filters.minPrice > 0) params.min_price = filters.minPrice;
      if (filters.maxPrice < 500) params.max_price = filters.maxPrice;
      if (filters.brand) params.brand = filters.brand;
      if (filters.minRating > 0) params.min_rating = filters.minRating;

      const response = await api.get('/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: 0,
      maxPrice: 500,
      brand: '',
      minRating: 0,
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white tracking-tight uppercase" data-testid="products-title">
            All Products
          </h1>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="md:hidden border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 bg-transparent rounded-full"
            data-testid="toggle-filters-button"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className={`md:block ${showFilters ? 'block' : 'hidden'} space-y-6`} data-testid="filters-panel">
            <div className="glass-card rounded-3xl p-6 space-y-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="font-oswald text-xl font-bold text-white uppercase">Filters</h2>
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="text-orange-500 hover:text-orange-400 hover:bg-transparent"
                  data-testid="clear-filters-button"
                >
                  Clear
                </Button>
              </div>

              <div>
                <Label className="text-zinc-300 font-manrope mb-3 block">Search</Label>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                  data-testid="search-filter-input"
                />
              </div>

              <div>
                <Label className="text-zinc-300 font-manrope mb-3 block">Category</Label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({ ...filters, category: '' })}
                    className={`w-full text-left px-4 py-3 rounded-full transition-all duration-200 ${
                      filters.category === ''
                        ? 'bg-orange-500 text-white'
                        : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                    }`}
                    data-testid="category-filter-all"
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`w-full text-left px-4 py-3 rounded-full transition-all duration-200 ${
                        filters.category === cat
                          ? 'bg-orange-500 text-white'
                          : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800'
                      }`}
                      data-testid={`category-filter-${cat.toLowerCase().replace(' ', '-')}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-zinc-300 font-manrope mb-3 block">
                  Price Range: ${filters.minPrice} - ${filters.maxPrice}
                </Label>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
                  className="mb-2"
                  data-testid="price-range-slider"
                />
              </div>

              <div>
                <Label className="text-zinc-300 font-manrope mb-3 block">Brand</Label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-2xl px-3 py-2 focus:border-orange-500 focus:outline-none"
                  data-testid="brand-filter-select"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-zinc-300 font-manrope mb-3 block">
                  Minimum Rating: {filters.minRating} stars
                </Label>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  value={[filters.minRating]}
                  onValueChange={([rating]) => setFilters({ ...filters, minRating: rating })}
                  data-testid="rating-filter-slider"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-zinc-400">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12" data-testid="no-products-message">
                <p className="text-zinc-400 mb-4">No products found</p>
                <Button
                  onClick={clearFilters}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-2xl"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="text-zinc-400 mb-6" data-testid="product-count">
                  Showing {products.length} product{products.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

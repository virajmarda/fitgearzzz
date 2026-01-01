import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Award, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products');
      setFeaturedProducts(response.data.slice(0, 8));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: 'Gym Equipment',
      image: 'https://images.unsplash.com/photo-1734630341082-0fec0e10126c?crop=entropy&cs=srgb&fm=jpg&q=85',
    },
    {
      name: 'Supplements',
      image: 'https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?crop=entropy&cs=srgb&fm=jpg&q=85',
    },
    {
      name: 'Apparel',
      image: 'https://images.unsplash.com/photo-1760879946075-ddb8432a322d?crop=entropy&cs=srgb&fm=jpg&q=85',
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1592999641298-434e28c11d14?crop=entropy&cs=srgb&fm=jpg&q=85',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1561570121-c8219daec12b?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Fitness Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight uppercase"
            data-testid="hero-title"
          >
            Unleash Your
            <br />
            <span className="text-orange-500">Inner Strength</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-manrope text-lg sm:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto"
            data-testid="hero-subtitle"
          >
            Premium fitness equipment and supplements to fuel your journey to greatness
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/products">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-2xl px-8 py-6"
                data-testid="shop-now-button"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-zinc-900" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-2">Premium Quality</h3>
              <p className="text-zinc-400 font-manrope">Top-tier equipment from trusted brands</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-2">Expert Approved</h3>
              <p className="text-zinc-400 font-manrope">Recommended by fitness professionals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-2">Fast Shipping</h3>
              <p className="text-zinc-400 font-manrope">Free delivery on orders over $100</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-12" data-testid="categories-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-12 tracking-tight uppercase text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                data-testid={`category-card-${category.name.toLowerCase().replace(' ', '-')}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-2xl h-64 glass-card"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-oswald text-2xl font-bold text-white uppercase tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-zinc-900" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-white tracking-tight uppercase">
              Featured Products
            </h2>
            <Link to="/products">
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 bg-transparent rounded-2xl"
                data-testid="view-all-button"
              >
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

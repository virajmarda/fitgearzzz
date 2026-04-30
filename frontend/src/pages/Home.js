, Award, ArrowRight };import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight,  Award, Truck, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/shopifyService';
import ShopifyBuyButton from '../components/ShopifyBuyButton';
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const products = await fetchProducts();
      setFeaturedProducts(products.slice(0, 8));    } catch (error) {
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
            src="https://avada.website/gym/wp-content/uploads/sites/9/2015/05/home-banner.jpg"
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
                className="bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-full px-10 py-7 shadow-2xl hover:shadow-orange-500/20"
                data-testid="shop-now-button"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges - Premium Animated */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-zinc-950" data-testid="trust-badges">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { 
                icon: <TrendingUp className="w-7 h-7" />, 
                title: 'Premium Quality',
                desc: 'Top-tier equipment from trusted brands',
                gradient: 'from-orange-500/20 to-orange-600/20',
                iconBg: 'bg-orange-500/10',
                hoverScale: 1.05
              },
              { 
                icon: <Award className="w-7 h-7" />, 
                title: 'Expert Approved',
                desc: 'Recommended by fitness professionals',
                gradient: 'from-blue-500/20 to-blue-600/20',
                iconBg: 'bg-blue-500/10',
                hoverScale: 1.05
              },
              { 
                icon: <Truck className="w-7 h-7" />, 
                title: 'Fast Shipping',
                desc: 'Free delivery on orders over ₹999',
                gradient: 'from-orange-500/20 to-orange-600/20',
                iconBg: 'bg-orange-500/10',
                hoverScale: 1.05
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${badge.gradient} backdrop-blur-xl border border-white/10 p-8 group transition-all duration-300`}
                whileHover={{ scale: badge.hoverScale, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 ${badge.iconBg} rounded-2xl flex items-center justify-center text-orange-500 mb-5`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {badge.icon}
                  </motion.div>
                  <h3 className="font-oswald text-xl font-bold text-white mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-zinc-400 font-manrope text-sm leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shop by Category - Premium Dynamic */}
      <section className="py-20 px-4 sm:px-6 lg:px-12" data-testid="category-section">
          <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-12 tracking-tight uppercase text-center">
            Shop by Category
          </h2>
          <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-12 tracking-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const categorySlug = category.name.toLowerCase().replace(' ', '-');
              return (
                <Link
                  key={index}
                  to={`/products?category=${categorySlug}`}
                  data-testid={`category-card-${categorySlug}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-3xl h-64 cursor-pointer"
                    whileHover={{ scale: 1.03, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    {/* Premium Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-oswald text-2xl font-bold text-white mb-1 tracking-wide">
                        {category.name}
                      </h3>
                      <motion.div
                        className="flex items-center text-orange-500 font-manrope font-semibold text-sm"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        Shop Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
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
                className="border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 bg-transparent rounded-full px-6"
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

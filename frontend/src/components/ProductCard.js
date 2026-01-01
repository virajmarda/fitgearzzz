import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-3xl overflow-hidden group"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-zinc-800">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full" data-testid="low-stock-badge">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-oswald text-xl uppercase" data-testid="out-of-stock-badge">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-oswald text-lg font-semibold text-white mb-1 hover:text-orange-500 transition-colors" data-testid="product-name">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-zinc-400 mb-2" data-testid="product-brand">{product.brand}</p>

        <div className="flex items-center space-x-1 mb-3">
          <div className="flex" data-testid="product-rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-orange-500 fill-orange-500'
                    : 'text-zinc-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-zinc-400">({product.review_count})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-oswald text-2xl font-bold text-orange-500" data-testid="product-price">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={() => addToCart(product.id)}
            disabled={product.stock === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
            data-testid="add-to-cart-button"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

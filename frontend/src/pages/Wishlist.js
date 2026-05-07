import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    removeFromWishlist(product.id);
    toast.success('Moved to cart!');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-10">
            <div className="mx-auto w-24 h-24 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-orange-500" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Your Wishlist is Empty
            </h2>

            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Save your favorite products and shop them later.
            </p>

            <Button
              onClick={() => navigate('/products')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
            <p className="text-zinc-400 mt-1">
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          {wishlist.length > 0 && (
            <Button
              onClick={clearWishlist}
              variant="outline"
              className="border-red-500/30 bg-transparent text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 size={18} className="mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-700 transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-zinc-800">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product.handle}`)}
                />

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-zinc-900/90 border border-zinc-700 rounded-full shadow-md hover:bg-red-500/10 hover:border-red-400/30 transition"
                  aria-label="Remove from wishlist"
                >
                  <X size={18} className="text-red-400" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3
                  className="font-semibold text-white mb-2 line-clamp-2 cursor-pointer hover:text-orange-400 transition-colors"
                  onClick={() => navigate(`/product/${product.handle}`)}
                >
                  {product.title}
                </h3>

                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-bold text-orange-500">
                    ₹{product.price}
                  </span>
                  {product.comparePrice && (
                    <span className="text-sm text-zinc-500 line-through">
                      ₹{product.comparePrice}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Move to Cart
                  </Button>

                  <Button
                    onClick={() => navigate(`/product/${product.handle}`)}
                    variant="outline"
                    className="w-full border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                  >
                    View Details
                  </Button>
                </div>

                {/* Added Date */}
                {product.addedAt && (
                  <p className="text-xs text-zinc-500 mt-3">
                    Added {new Date(product.addedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate('/products')}
            variant="outline"
            className="px-8 py-3 text-lg border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

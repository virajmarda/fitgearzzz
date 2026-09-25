import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  ArrowUpRight,
  X,
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/formatCurrency';
import { SITE } from '../config/siteConfig';
import { trackEvent } from '../lib/analytics';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Wishlist — ${SITE.name}`;
    trackEvent('view_wishlist', { items: wishlist.length });
  }, [wishlist.length]);

  const getProductPath = (product) => {
    if (product.handle) {
      return `/products/${product.handle}`;
    }

    return `/product/${product.id}`;
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      handle: product.handle,
      variantTitle: product.variantTitle,
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
      <main
        id="main"
        className="fg-surface min-h-screen bg-[#f1eee8] flex items-center justify-center px-5"
      >
        <div className="text-center py-24">
          <Heart className="w-10 h-10 mx-auto text-[#f15a24] mb-5" />

          <p className="fg-eyebrow mb-3">Your wishlist</p>

          <h1 className="text-3xl font-bold mb-3 tracking-[-0.03em]">
            Nothing saved yet
          </h1>

          <p className="text-[#77736d] mb-7 max-w-sm mx-auto">
            Save the gear you want to revisit when you are ready.
          </p>

          <Link to="/products" className="fg-btn">
            Enter the catalog <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="fg-surface min-h-screen bg-[#f1eee8]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14">
        <header className="mb-8 border-b border-[#171717] pb-6 flex items-end justify-between gap-4">
          <div>
            <p className="fg-eyebrow mb-3">Saved for later</p>

            <h1 className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.045em] leading-none">
              Wishlist
            </h1>

            <p className="mt-3 text-[13px] text-[#77736d]">
              {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
            </p>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="text-[12px] text-[#77736d] hover:text-[#f15a24] transition-colors whitespace-nowrap"
          >
            Clear wishlist
          </button>
        </header>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Saved products */}
          <ul className="border-t border-[#d4d0c8]">
            {wishlist.map((product) => {
              const productPath = getProductPath(product);

              return (
                <li
                  key={product.id}
                  className="flex gap-4 py-5 border-b border-[#d4d0c8]"
                >
                  <Link
                    to={productPath}
                    className="shrink-0 w-24 h-28 bg-[#e4e0d8] overflow-hidden border border-[#d4d0c8]"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to={productPath}
                          className="font-semibold text-[15px] tracking-[-0.02em] hover:text-[#f15a24] transition-colors block truncate"
                        >
                          {product.title}
                        </Link>

                        {product.variantTitle && (
                          <p className="text-[12px] text-[#77736d] mt-0.5">
                            {product.variantTitle}
                          </p>
                        )}

                        {product.addedAt && (
                          <p className="text-[11px] text-[#96918a] mt-1">
                            Saved{' '}
                            {new Date(product.addedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold whitespace-nowrap">
                          {formatCurrency(product.price)}
                        </span>

                        {product.comparePrice &&
                          Number(product.comparePrice) >
                            Number(product.price) && (
                            <span className="block mt-0.5 text-[11px] text-[#96918a] line-through">
                              {formatCurrency(product.comparePrice)}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(product)}
                        className="fg-btn text-[12px] px-4 py-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Move to cart
                      </button>

                      <div className="flex items-center gap-4">
                        <Link
                          to={productPath}
                          className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#171717] hover:text-[#f15a24] transition-colors"
                        >
                          View details
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          className="flex items-center gap-1.5 text-[12px] text-[#77736d] hover:text-[#a33] transition-colors"
                          aria-label={`Remove ${product.title} from wishlist`}
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Wishlist summary */}
          <aside className="lg:sticky lg:top-24 h-fit border border-[#171717] p-6 bg-[#e4e0d8]">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="w-4 h-4 text-[#f15a24]" />

              <h2 className="text-[13px] font-bold uppercase tracking-[0.1em]">
                Saved items
              </h2>
            </div>

            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-[#5f5c56]">Items saved</span>
                <span className="font-semibold">
                  {wishlist.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#5f5c56]">Ready to buy</span>
                <span className="font-semibold">Move to cart</span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-[#c9c4ba]">
              <p className="text-[12px] leading-relaxed text-[#77736d]">
                Your saved items stay here until you remove them or move them
                to your cart.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/products')}
              className="fg-btn w-full mt-6"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue shopping
            </button>

            <button
              type="button"
              onClick={clearWishlist}
              className="w-full mt-4 text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[#171717] hover:text-[#f15a24] transition-colors"
            >
              Clear wishlist
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Wishlist;

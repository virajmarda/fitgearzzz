import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import ProductDescriptionFormatter from "../components/ProductDescriptionFormatter";
import SeoProductSchema from "../components/SeoProductSchema";
import VariantSelector from "../components/VariantSelector";
import variantService from "../services/variantService";
import ReviewsList from "../components/ReviewsList";
import ReviewForm from "../components/ReviewForm";
import { toast } from "sonner";
import api from "../utils/api";
import { fetchProductByHandle } from "../services/shopifyService";

const ProductDetail = () => {
  const { handle } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [loadingProduct, setLoadingProduct] = useState(true);

  const [reviews, setReviews] = useState({
    reviews: [],
    rating: 0,
    reviewCount: 0,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);

  /* ---------------- FETCH PRODUCT ---------------- */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        const productData = await fetchProductByHandle(handle);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoadingProduct(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const res = await api.get(`/reviews/widget/${handle}`);

        const data = res.data || {};

        setReviews({
          reviews: data.reviews || [],
          rating: data.rating || 0,
          reviewCount:
            data.review_count ??
            data.reviewCount ??
            (data.reviews ? data.reviews.length : 0),
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [handle]);

  /* ---------------- VARIANT INIT ---------------- */

  useEffect(() => {
    if (!product || !product.variants?.length) return;

    try {
      const options = variantService.getVariantOptions(product);

      if (options.length > 0) {
        const initialSelection = options.map((option) => ({
          name: option.name,
          value: option.values[0],
        }));

        setSelectedOptions(initialSelection);

        const variant = variantService.findVariantByOptions(
          product,
          initialSelection
        );

        setSelectedVariant(variant || product.variants[0]);
      } else {
        setSelectedVariant(product.variants[0]);
      }
    } catch (error) {
      console.error("Variant init error:", error);
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  /* ---------------- OPTION CHANGE ---------------- */

  const handleOptionChange = (optionName, optionValue) => {
    const newSelection = selectedOptions.map((option) =>
      option.name === optionName
        ? { ...option, value: optionValue }
        : option
    );

    setSelectedOptions(newSelection);

    const variant = variantService.findVariantByOptions(product, newSelection);
    setSelectedVariant(variant);
  };

  /* ---------------- ADD TO CART ---------------- */

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Select product variant");
      return;
    }

    const variantPricing = variantService.getVariantWithPricing(selectedVariant);

    try {
      setIsAdding(true);

      await addToCart(selectedVariant.id, quantity, {
        title: `${product.title} - ${selectedOptions
          .map((s) => s.value)
          .join(", ")}`,
        imageUrl: variantService.getVariantImage(
          selectedVariant,
          product.images
        ),
        price: variantPricing.price,
      });

      toast.success("Added to cart");
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Error adding to cart");
    } finally {
      setIsAdding(false);
    }
  };

  /* ---------------- BUY NOW ---------------- */

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      toast.error("Select product variant");
      return;
    }

    try {
      const res = await api.post("/cart/guest-checkout", {
        lines: [
          {
            merchandiseId: selectedVariant.id,
            quantity,
          },
        ],
      });

      const checkoutUrl = res.data?.checkoutUrl;

      if (!checkoutUrl) throw new Error("No checkout URL");

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      toast.error("Buy now failed");
    }
  };

  /* ---------------- REVIEW UPDATE ---------------- */

  const handleReviewSubmitted = (newReviewData) => {
    setReviews(newReviewData);
  };

  /* ---------------- LOADING ---------------- */

  if (loadingProduct || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-20 text-white">
        Loading product...
      </div>
    );
  }

  /* ---------------- PRICE ---------------- */

  const firstVariant = selectedVariant || product?.variants?.[0];

  const price =
    firstVariant?.priceV2?.amount != null
      ? Number(firstVariant.priceV2.amount)
      : Number(product?.price || 0);

  const compareAt =
    firstVariant?.compareAtPrice?.amount ??
    product?.compareAtPrice ??
    null;

  const compareAtPrice =
    compareAt && !Number.isNaN(Number(compareAt))
      ? Number(compareAt)
      : null;

  const discount =
    compareAtPrice && compareAtPrice > price
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : 0;

  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-16 px-4 sm:px-6 lg:px-8">

      <SeoProductSchema
        name={product.title}
        description={product.description}
        url={`https://fitgearzzz.com/products/${product.handle}`}
        images={product.images || []}
        sku={product.sku || product.id}
        price={price}
        currency="INR"
        availability="https://schema.org/InStock"
        ratingValue={reviews.rating}
        reviewCount={reviews.reviewCount}
        brand="FitGearzzz"
      />

      <div className="max-w-7xl mx-auto">

        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {/* IMAGES */}

          <div className="space-y-4">

            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden aspect-square">

              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                  -{discount}% OFF
                </div>
              )}

              <img
                src={
                  product.images?.[selectedImageIndex] ||
                  "/placeholder.png"
                }
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {(product.images || []).length > 1 && (
              <div className="grid grid-cols-4 gap-3">

                {product.images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-orange-500"
                        : "border-zinc-800"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* PRODUCT INFO */}

          <div className="space-y-6">

            <h1 className="text-3xl font-bold text-white">
              {product.title}
            </h1>

            {/* RATING */}

            <div className="flex items-center gap-2">

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <span className="text-zinc-400 text-sm">
                {reviews.rating.toFixed(1)} ({reviews.reviewCount} reviews)
              </span>

            </div>

            {/* PRICE */}

            <div>

              <span className="text-4xl font-bold text-white">
                ₹{price.toFixed(2)}
              </span>

              {discount > 0 && compareAtPrice && (
                <span className="ml-3 line-through text-zinc-500">
                  ₹{compareAtPrice}
                </span>
              )}

              <div className="flex items-center gap-2 text-green-400 mt-2">
                <Truck className="w-4 h-4" />
                Free Shipping
              </div>

            </div>

            {/* DESCRIPTION */}

            {product.description && (
              <ProductDescriptionFormatter
                description={product.description}
                descriptionHtml={product.descriptionHtml}
              />
            )}

            {/* VARIANTS */}

            <VariantSelector
              product={product}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
              selectedVariant={selectedVariant}
            />

            {/* QUANTITY */}

            <div className="flex items-center gap-4">

              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-zinc-900 text-white"
              >
                -
              </button>

              <span className="text-white">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-zinc-900 text-white"
              >
                +
              </button>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-4">

              <Button
                onClick={handleAddToCart}
                disabled={!selectedVariant || isAdding}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isAdding ? "Adding..." : "Add to Cart"}
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={!selectedVariant}
                className="flex-1 bg-green-700 hover:bg-green-800"
              >
                Buy Now
              </Button>

            </div>

          </div>

        </motion.div>

        {/* REVIEWS */}

        <div className="mt-16">

          <h2 className="text-3xl text-white font-bold mb-8">
            Customer Reviews
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            <ReviewsList
              reviews={reviews.reviews}
              rating={reviews.rating}
              reviewCount={reviews.reviewCount}
            />

            {user ? (
              <ReviewForm
                product={product}
                user={user}
                onReviewSubmitted={handleReviewSubmitted}
              />
            ) : (
              <div className="bg-zinc-900 p-8 rounded-2xl text-center">

                <p className="text-zinc-400 mb-4">
                  Please log in to write a review
                </p>

                <Button
                  onClick={() => setShowAuth(true)}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Log In
                </Button>

              </div>
            )}

          </div>

        </div>

      </div>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />

    </div>
  );
};

export default ProductDetail;

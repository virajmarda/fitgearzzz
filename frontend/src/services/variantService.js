/**
 * Enterprise-Grade Variant Management Service
 * Handles syncing, filtering, and organizing product variants from Shopify
 */

const variantService = {
  /**
   * Extract and organize all variant options (colors, sizes, materials, etc.)
   */
  getVariantOptions(product) {
    if (!product || !product.options) return [];

    return product.options
      .filter(option => option.name && option.values && option.values.length > 0)
      .map(option => ({
        id: option.id,
        name: option.name,
        values: option.values.filter(v => v && v.trim()),
      }));
  },

  /**
   * Get all variant combinations with full data
   */
  getVariantCombinations(product) {
    if (!product || !product.variants) return [];

    return product.variants
      .filter(v => v && v.id && v.title)
      .map(variant => ({
        id: variant.id,
        title: variant.title,
        sku: variant.sku || '',
        price: variant.priceV2?.amount || variant.price || 0,
        compareAtPrice: variant.compareAtPrice?.amount || variant.compareAtPriceV2?.amount || null,
        available: variant.available !== false,
        selectedOptions: variant.selectedOptions || [],
        image: variant.image?.src || variant.image || null,
        weight: variant.weight || null,
        weightUnit: variant.weightUnit || 'kg',
      }));
  },

  /**
   * Find variant by selected option values
   */
  findVariantByOptions(product, selectedOptions) {
    if (!product || !product.variants) return null;

    return product.variants.find(variant => {
      if (!variant.selectedOptions) return false;

      return selectedOptions.every(selected => {
        return variant.selectedOptions.some(
          option =>
            option.name === selected.name &&
            option.value === selected.value
        );
      });
    });
  },

  /**
   * Get available option values for current selection
   * (prevents selecting impossible combinations)
   */
  getAvailableValues(product, optionName, currentSelection) {
    if (!product || !product.variants) return [];

    const variants = product.variants.filter(variant => {
      if (!variant.available) return false;
      if (!variant.selectedOptions) return false;

      // Check if variant matches current selection (excluding current option)
      return currentSelection.every(selected => {
        if (selected.name === optionName) return true; // Skip current option

        return variant.selectedOptions.some(
          option =>
            option.name === selected.name &&
            option.value === selected.value
        );
      });
    });

    // Extract unique values for this option
    const values = new Set();
    variants.forEach(variant => {
      const option = variant.selectedOptions?.find(
        opt => opt.name === optionName
      );
      if (option) values.add(option.value);
    });

    return Array.from(values).sort();
  },

  /**
   * Get variant with price and discount info
   */
  getVariantWithPricing(variant) {
    if (!variant) return null;

    const price = Number(variant.priceV2?.amount || variant.price || 0);
    const compareAtPrice = variant.compareAtPrice?.amount ||
      variant.compareAtPriceV2?.amount ||
      null;

    const discount =
      compareAtPrice && compareAtPrice > price
        ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
        : 0;

    return {
      ...variant,
      price,
      compareAtPrice,
      discount,
      savings: compareAtPrice && compareAtPrice > price ? compareAtPrice - price : 0,
    };
  },

  /**
   * Build variant selection object
   */
  buildSelectionObject(optionName, optionValue) {
    return {
      name: optionName,
      value: optionValue,
    };
  },

  /**
   * Check if variant is in stock
   */
  isInStock(variant) {
    return variant && variant.available !== false;
  },

  /**
   * Get variant image or product fallback
   */
  getVariantImage(variant, productImages) {
    if (variant?.image?.src) return variant.image.src;
    if (variant?.image) return variant.image;
    if (productImages && productImages.length > 0) return productImages[0];
    return '/placeholder.png';
  },
};

export default variantService;

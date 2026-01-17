// src/pages/CatalogPage.jsx
import ShopifyBuyButton from "../components/ShopifyBuyButton";

function CatalogPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-8">
        Shop All Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Adjustable Waist Trimmer Belt */}
        <ShopifyBuyButton productId="9078870606050" />

        {/* 150Lbs Resistance Bands Set */}
        <ShopifyBuyButton productId="9078771810530" />

        {/* Adjustable Counting Grip */}
        <ShopifyBuyButton productId="9077798306018" />

        {/* Knee Patches */}
        <ShopifyBuyButton productId="9064695922914" />
      </div>
    </div>
  );
}

export default CatalogPage;

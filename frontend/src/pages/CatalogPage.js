// src/pages/CatalogPage.jsx
import ShopifyBuyButton from "../components/ShopifyBuyButton";

function CatalogPage() {
  return (
    <div>
      <h2>Catalog</h2>

      <ShopifyBuyButton productId="9078870606050" />
      <ShopifyBuyButton productId="PROD_ID_2" />
      <ShopifyBuyButton productId="PROD_ID_3" />
    </div>
  );
}

export default CatalogPage;

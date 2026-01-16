// src/components/ShopifyBuyButton.jsx
import React, { useEffect } from "react";

const SCRIPT_SRC =
  "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

function loadShopifyBuy(callback) {
  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    callback();
    return;
  }

  const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    existing.addEventListener("load", callback);
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = SCRIPT_SRC;
  script.addEventListener("load", callback);
  document.head.appendChild(script);
}

const ShopifyBuyButton = ({ productId }) => {
  useEffect(() => {
    if (!productId) return;

    loadShopifyBuy(() => {
      const client = window.ShopifyBuy.buildClient({
        domain: "fitgearzzz.myshopify.com", // your .myshopify.com domain
        storefrontAccessToken: process.env.REACT_APP_SHOPIFY_CLIENT_KEY,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: productId, // e.g. "1234567890123"
          node: document.getElementById(`product-component-${productId}`),
          moneyFormat: "₹{{amount}}",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                  },
                },
              },
            },
            cart: {
              styles: {
                button: {
                  "font-size": "16px",
                  "padding-top": "16px",
                  "padding-bottom": "16px",
                  "background-color": "#ff6b35",
                },
              },
            },
          },
        });
      });
    });
  }, [productId]);

  return <div id={`product-component-${productId}`} />;
};

export default ShopifyBuyButton;

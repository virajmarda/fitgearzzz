// src/components/ShopifyBuyButton.jsx
import React, { useEffect } from "react";

const SCRIPT_SRC = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

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
        domain: "gnzuhe-en.myshopify.com",
        storefrontAccessToken: process.env.REACT_APP_SHOPIFY_CLIENT_KEY,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: productId,
          node: document.getElementById(`product-component-${productId}`),
          moneyFormat: "₹{{amount}}",
          options: {
            product: {
              iframe: false,
              contents: {
                img: true,
                title: true,
                price: true,
                button: true
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px"
                  },
                  "background-color": "#1a1a1a",
                  "border-radius": "24px",
                  "border": "1px solid #27272a",
                  "padding": "20px"
                },
                title: {
                  "font-family": "Oswald, sans-serif",
                  "font-weight": "700",
                  "font-size": "18px",
                  "color": "#ffffff",
                  "text-align": "center"
                },
                price: {
                  "font-family": "Manrope, sans-serif",
                  "font-size": "20px",
                  "color": "#ff6b35",
                  "font-weight": "700"
                },
                button: {
                  "font-family": "Oswald, sans-serif",
                  "font-size": "16px",
                  "padding": "16px 32px",
                  "background-color": "#ff6b35",
                  "color": "#fff",
                  "border-radius": "16px",
                  "margin-bottom": "16px",
                  ":hover": {
                    "background-color": "#ff8555"
                  },
                  ":focus": {
                    "background-color": "#ff8555"
                  }
                },
                img: {
                  "border-radius": "16px",
                  "margin-bottom": "16px"
                }
              },
              text: {
                button: "ADD TO CART"
              }
            },
            cart: {
              startOpen: false
            },
            toggle: {
              iframe: false,
              sticky: false,
              styles: {
                toggle: {
                  "display": "none"
                }
              }
            }
          }
        });
      });
    });
  }, [productId]);

  return <div id={`product-component-${productId}`} />;
};

export default ShopifyBuyButton;

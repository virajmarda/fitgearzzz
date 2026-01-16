import React, { useEffect } from 'react';

const ShopifyBuyButton = ({ productId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    script.onload = () => {
      if (window.ShopifyBuy) {
        const client = window.ShopifyBuy.buildClient({
          domain: 'gnzuhe-en.myshopify.com',
          storefrontAccessToken: process.env.REACT_APP_SHOPIFY_CLIENT_KEY,
        });

        window.ShopifyBuy.UI.onReady(client).then((ui) => {
          ui.createComponent('product', {
            id: productId,
            node: document.getElementById(`product-component-${productId}`),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              product: {
                styles: {
                  product: {
                    '@media (min-width: 601px)': {
                      'max-width': 'calc(25% - 20px)',
                      'margin-left': '20px',
                      'margin-bottom': '50px',
                    },
                  },
                },
              },
              cart: {
                styles: {
                  button: {
                    'font-size': '16px',
                    'padding-top': '16px',
                    'padding-bottom': '16px',
                    'background-color': '#ff6b35',
                  },
                },
              },
            },
          });
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [productId]);

  return <div id={`product-component-${productId}`}></div>;
};

export default ShopifyBuyButton;

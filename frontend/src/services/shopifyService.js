import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_STORE_DOMAIN || 'fitgearzzz.myshopify.com',
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '4f69d01e467efc58595c74f4420ab3bd'
});

export const fetchProducts = async () => {
  try {
    console.log('Fetching products from Shopify...');
    const products = await client.product.fetchAll();
    console.log('Raw Shopify products:', products);
    
    if (!products || products.length === 0) {
      console.warn('No products returned from Shopify');
      return [];
    }
    
    const mappedProducts = products.map(product => {
      const variant = product.variants && product.variants[0];
      const price = variant?.price?.amount || variant?.price || '0';
      
      return {
        id: product.id,
        title: product.title || 'Untitled Product',
        description: product.description || product.descriptionHtml || '',
        price: parseFloat(price),
        image: product.images && product.images[0]?.src || '',
        handle: product.handle || '',
        category: product.productType || '',
        brand: product.vendor || '',
        variants: product.variants || [],
        rating: 4.5 // Default rating since Shopify doesn't provide this
      };
    });
    
    console.log('Mapped products:', mappedProducts);
    return mappedProducts;
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    console.error('Error details:', error.message, error.stack);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const product = await client.product.fetch(id);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const createCheckout = async (variantId, quantity = 1) => {
  try {
    const checkout = await client.checkout.create();
    const lineItemsToAdd = [{ variantId, quantity }];
    const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    return updatedCheckout.webUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
};

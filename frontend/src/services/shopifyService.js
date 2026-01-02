import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'fitgearzzz.myshopify.com',
  storefrontAccessToken: '4f69d01e467efc58595c74f4420ab3bd'
});

export const fetchProducts = async () => {
  try {
    const products = await client.product.fetchAll();
    return products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description || product.descriptionHtml,
      price: product.variants[0].price.amount,
      image: product.images[0]?.src || '',
      handle: product.handle,
      category: product.productType,
      brand: product.vendor,
      variants: product.variants
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
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

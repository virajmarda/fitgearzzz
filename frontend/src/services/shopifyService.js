// GraphQL-based Shopify Storefront API service
const SHOPIFY_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN || 'fitgearzzz.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '4f69d01e467efc58595c74f4420ab3bd';

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

const shopifyFetch = async (query, variables = {}) => {
  console.log('Shopify GraphQL Request:', { query, variables });
  
  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Shopify GraphQL Response:', data);
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(data.errors[0].message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            productType
            vendor
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { first: 50 });
    
    if (!data || !data.products || !data.products.edges) {
      console.warn('No products found in response');
      return [];
    }

    const products = data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title || 'Untitled Product',
      description: node.description || '',
      price: parseFloat(node.priceRange?.minVariantPrice?.amount || 0),
      image: node.images?.edges[0]?.node?.url || '',
      handle: node.handle || '',
      category: node.productType || '',
      brand: node.vendor || '',
      variants: node.variants?.edges?.map(({ node: variant }) => variant) || [],
      rating: 4.5, // Default rating
    }));

    console.log('Mapped products:', products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        handle
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { id });
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const createCheckout = async (variantId, quantity = 1) => {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      input: {
        lineItems: [{ variantId, quantity }]
      }
    });
    
    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }
    
    return data.checkoutCreate.checkout.webUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
};

// GraphQL-based Shopify Storefront API service
import { SHOPIFY_STORE_DOMAIN, STOREFRONT_ACCESS_TOKEN, STOREFRONT_API_URL, getCheckoutUrl } from '../config/shopify';

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

export const fetchProductByHandle = async (handle) => {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        productType
        vendor
        images(first: 5) {
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
  `;

  try {
    const data = await shopifyFetch(query, { handle });
    
    if (!data || !data.productByHandle) {
      throw new Error('Product not found');
    }

    const product = data.productByHandle;
    
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: parseFloat(product.priceRange?.minVariantPrice?.amount || 0),
      image: product.images?.edges[0]?.node?.url || '',
      images: product.images?.edges?.map(({ node }) => node.url) || [],
      handle: product.handle,
      category: product.productType || '',
      brand: product.vendor || '',
      variants: product.variants?.edges?.map(({ node }) => node) || [],
      rating: 4.5
    };
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    throw error;
  }
};

// Create a Shopify checkout and return the checkout URL
export const createCheckout = async (lineItems) => {
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
        lineItems: lineItems
      }
    });
    
    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }
    
    // Return the custom checkout URL instead of Shopify's default
    const checkoutId = data.checkoutCreate.checkout.id;
    return getCheckoutUrl(checkoutId);
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
};

// Shopify Customer Account API functions
export const customerLogin = async (email, password) => {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          message
          field
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      input: { email, password }
    });

    if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
      throw new Error(data.customerAccessTokenCreate.customerUserErrors[0].message);
    }

    return data.customerAccessTokenCreate.customerAccessToken;
  } catch (error) {
    console.error('Error logging in customer:', error);
    throw error;
  }
};

export const customerRegister = async (email, password, firstName, lastName) => {
  // First, try to login - if successful, customer already exists
  try {
    const accessToken = await customerLogin(email, password);
    console.log('Customer already exists, logged in successfully');
    return accessToken;
  } catch (loginError) {
    // If login fails, customer doesn't exist - proceed with registration
    console.log('Customer does not exist, creating new account...');
  }

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          message
          field
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      input: {
        email,
        password,
        firstName,
        lastName,
        acceptsMarketing: false
      }
    });

    if (data.customerCreate.customerUserErrors.length > 0) {
      const error = data.customerCreate.customerUserErrors[0];
      
      // If customer already exists, try to login
      if (error.message.includes('already exists') || error.message.includes('taken')) {
        console.log('Customer exists (from error), attempting login...');
        return await customerLogin(email, password);
      }
      
      throw new Error(error.message);
    }

    // After creating account, log them in
    return await customerLogin(email, password);
  } catch (error) {
    console.error('Error registering customer:', error);
    
    // If limit exceeded, inform user to try login or wait
    if (error.message && error.message.includes('Limit exceeded')) {
      throw new Error('Account creation is temporarily limited. If you already have an account, please try logging in instead.');
    }
    
    throw error;
  }
};

export const getCustomer = async (accessToken) => {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
        defaultAddress {
          address1
          address2
          city
          province
          country
          zip
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      customerAccessToken: accessToken
    });

    return data.customer;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

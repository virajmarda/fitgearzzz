// Vercel serverless function to fetch customer data from Shopify Customer Account API
// This avoids CORS issues by calling Shopify from the server side

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const response = await fetch(
      'https://account.fitgearzzz.com/account/customer/api/2024-10/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: `
            query getCustomer {
              customer {
                id
                displayName
                emailAddress {
                  emailAddress
                }
                firstName
                lastName
              }
            }
          `,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shopify GraphQL error:', errorText);
      return res.status(response.status).json({
        error: 'Failed to fetch customer data',
        details: errorText,
      });
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return res.status(400).json({
        error: 'GraphQL query failed',
        details: result.errors,
      });
    }

    return res.status(200).json(result.data?.customer || null);
  } catch (err) {
    console.error('Customer fetch handler error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, codeVerifier } = req.body;

  const clientId = process.env.SHOPIFY_CUSTOMER_API_CLIENT_ID;
  const redirectUri = process.env.SHOPIFY_OAUTH_REDIRECT_URI; // set in Vercel: https://fitgearzzz.com/auth/callback

  if (!clientId || !redirectUri) {
    console.error('Missing Shopify env vars', { clientId, redirectUri });
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectUri);
    params.append('code', code);
    params.append('code_verifier', codeVerifier);

    const tokenResponse = await fetch(
      'https://account.fitgearzzz.com/authentication/oauth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }
    );

    if (!tokenResponse.ok) {
      const text = await tokenResponse.text();
      console.error('Shopify token error:', text);
      return res
        .status(500)
        .json({ error: 'Token exchange failed', details: text });
    }

    const tokens = await tokenResponse.json();
    return res.status(200).json(tokens);
  } catch (err) {
    console.error('Callback handler error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}

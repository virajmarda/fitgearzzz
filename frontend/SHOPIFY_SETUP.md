# Shopify Headless Setup Guide

This project uses a headless Shopify setup where:
- **Frontend**: `fitgearzzz.com` (React app on Vercel)
- **Checkout**: `checkout.fitgearzzz.com` (Shopify checkout)
- **Customer Accounts**: `account.fitgearzzz.com` (Shopify customer portal)

## Architecture

```
fitgearzzz.com (React/Vercel)
    ↓ Browse products via Storefront API
    ↓ Add to cart (client-side)
    ↓ Click "Checkout"
checkout.fitgearzzz.com (Shopify)
    ↓ Complete purchase
    ↓ Payment processing
    ↓ Order confirmation
```

## Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Shopify Store Configuration
REACT_APP_SHOPIFY_STORE_DOMAIN=fitgearzzz.myshopify.com
REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here

# Custom Checkout Domain
REACT_APP_CHECKOUT_DOMAIN=https://checkout.fitgearzzz.com

# Custom Account Domain
REACT_APP_ACCOUNT_DOMAIN=https://account.fitgearzzz.com
```

### Getting Your Storefront Access Token

1. Go to Shopify Admin → **Settings** → **Apps and sales channels**
2. Click **Develop apps**
3. Create a new app or use existing
4. Go to **API credentials** tab
5. Under **Storefront API**, click **Configure**
6. Select required permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
7. Save and generate **Storefront API access token**
8. Copy the token to your `.env` file

## DNS Configuration

### At Your Domain Registrar (GoDaddy/Namecheap/etc.)

1. **Main Domain** (`fitgearzzz.com`):
   ```
   Type: A or CNAME
   Name: @
   Value: [Vercel's DNS as shown in Vercel project settings]
   ```

2. **Checkout Subdomain** (`checkout.fitgearzzz.com`):
   ```
   Type: CNAME
   Name: checkout
   Value: shops.myshopify.com
   ```

3. **Account Subdomain** (`account.fitgearzzz.com`):
   ```
   Type: CNAME
   Name: account
   Value: shops.myshopify.com
   ```

### In Shopify Admin

1. Go to **Settings** → **Domains**
2. Click **Connect existing domain**
3. Add `checkout.fitgearzzz.com`
4. Add `account.fitgearzzz.com` (set as primary for customer accounts)
5. Keep `fitgearzzz.myshopify.com` as fallback

**Important**: Do NOT add `fitgearzzz.com` to Shopify domains - this should only point to Vercel.

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel project settings:
   - `REACT_APP_SHOPIFY_STORE_DOMAIN`
   - `REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `REACT_APP_CHECKOUT_DOMAIN`
   - `REACT_APP_ACCOUNT_DOMAIN`
4. Deploy
5. Add `fitgearzzz.com` and `www.fitgearzzz.com` as custom domains in Vercel

### Testing the Flow

1. Visit `https://fitgearzzz.com`
2. Browse products (fetched from Shopify Storefront API)
3. Add items to cart
4. Click "Proceed to Checkout"
5. Should redirect to `https://checkout.fitgearzzz.com/cart/...`
6. Complete checkout on Shopify
7. Customer can access orders at `https://account.fitgearzzz.com`

## Configuration Files

- `src/config/shopify.js` - Central configuration for all Shopify domains
- `src/services/shopifyService.js` - Storefront API integration
- `src/components/CartDrawer.js` - Checkout redirect logic

## Troubleshooting

### "DNS records are not pointing to Shopify" warning

**Solution**: This is expected for `fitgearzzz.com`. Only `checkout.fitgearzzz.com` and `account.fitgearzzz.com` should point to Shopify. Remove `fitgearzzz.com` from Shopify Domains if added.

### Checkout redirects to wrong domain

**Solution**: Check `REACT_APP_CHECKOUT_DOMAIN` in environment variables. Ensure it matches the domain configured in Shopify.

### Products not loading

**Solution**: 
1. Verify Storefront API token is correct
2. Check that products are published to the "Headless" sales channel in Shopify
3. Ensure API permissions are set correctly

## Benefits of This Setup

✅ **Custom Frontend**: Full control over UI/UX on fitgearzzz.com  
✅ **Shopify Checkout**: Battle-tested, PCI-compliant checkout  
✅ **SEO-Friendly**: Custom domain for better branding  
✅ **Fast Performance**: Static React app on Vercel edge network  
✅ **Easy Updates**: Change products/inventory in Shopify admin, reflects instantly

## Support

For Shopify-specific issues: [Shopify Help Center](https://help.shopify.com/)  
For Vercel deployment issues: [Vercel Documentation](https://vercel.com/docs)

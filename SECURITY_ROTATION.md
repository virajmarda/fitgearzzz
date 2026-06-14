# Security Rotation Guide — fitgearzzz

**PRIORITY: IMMEDIATE ACTION REQUIRED**

This guide documents the security incident and provides exact steps to remediate it.

---

## What Was Exposed

The file `frontend/.env` was committed to git history and contains:

| Variable | Risk | Action Required |
|---|---|---|
| `REACT_APP_SHOPIFY_CLIENT_KEY` | Shopify Storefront API key exposed | **Rotate immediately** |
| `SHOPIFY_CLIENT_ID` | OAuth Client ID exposed | **Rotate immediately** |
| `REACT_APP_SHOPIFY_STORE_DOMAIN` | Store domain (lower risk) | Note only |
| `SHOPIFY_OAUTH_REDIRECT_URI` | Redirect URI (lower risk) | Note only |

The commit hash containing secrets: `44ef4c02fb1ecb85b73b4f2b1f8651faeb2f4e75`

---

## Step 1: Rotate Shopify Credentials NOW

### Rotate Storefront Access Token
1. Log in to Shopify Admin → `fitgearzzz.myshopify.com/admin`
2. Go to **Apps** → **Develop apps** (or Settings → Apps and sales channels → Develop apps)
3. Find your custom app → click into it
4. Go to **API credentials** tab
5. Under **Storefront API access token**, click **Rotate token**
6. Confirm rotation — old token (`REACT_APP_SHOPIFY_CLIENT_KEY`) is now invalid
7. Copy the new token
8. Add new token to Vercel environment variables (see Step 4)

### Rotate OAuth Client ID / Secret
1. In Shopify Admin → Apps → Develop apps → your app
2. Go to **API credentials**
3. Click **Rotate API secret key** if applicable
4. Update any backend environment variables accordingly

---

## Step 2: Remove .env from Git History

> ⚠️ This requires a force-push. Coordinate with any other contributors first.

### Install git-filter-repo
```bash
pip install git-filter-repo
# or: brew install git-filter-repo
```

### Remove the file from all history
```bash
# Clone a fresh copy of the repo first
git clone https://github.com/virajmarda/fitgearzzz.git fitgearzzz-clean
cd fitgearzzz-clean

# Remove frontend/.env from entire git history
git filter-repo --path frontend/.env --invert-paths --force

# Also remove frontend/.env.production if it contained secrets
git filter-repo --path frontend/.env.production --invert-paths --force
```

### Force push to remote
```bash
git remote add origin https://github.com/virajmarda/fitgearzzz.git
git push origin --force --all
git push origin --force --tags
```

### After force push
- Go to GitHub repo → **Settings** → under **Danger Zone**, consider invalidating old deploy keys
- If any CI/CD or Vercel deployment ran during the exposure window, rotate those tokens too
- Ask GitHub Support to purge cached views of the commit if needed: https://support.github.com/

---

## Step 3: Verify Cleanup

```bash
# Confirm the file no longer appears in history
git log --all --full-history -- frontend/.env
# Should return empty output

# Search for secret strings in remaining history
git log -p --all | grep -i 'storefront_access_token\|CLIENT_KEY\|CLIENT_ID'
# Should return empty output after cleanup
```

---

## Step 4: Add Secrets to Vercel (Not Code)

After rotating, add all secrets as **Vercel Environment Variables**:

1. Go to https://vercel.com/dashboard → fitgearzzz project → **Settings** → **Environment Variables**
2. Add:
   - `REACT_APP_SHOPIFY_STORE_DOMAIN` = `fitgearzzz.myshopify.com`
   - `REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN` = *(new rotated token)*
   - `REACT_APP_SHOPIFY_CLIENT_KEY` = *(new rotated storefront key)*
   - `SHOPIFY_CLIENT_ID` = *(new OAuth client ID)*
   - `SHOPIFY_OAUTH_REDIRECT_URI` = `https://fitgearzzz.com/auth/callback`
   - `REACT_APP_CHECKOUT_DOMAIN` = `https://checkout.fitgearzzz.com`
   - `REACT_APP_ACCOUNT_DOMAIN` = `https://account.fitgearzzz.com`
   - `SHOPIFY_ACCOUNT_DOMAIN` = `https://account.fitgearzzz.com`
   - `SHOPIFY_STORE_DOMAIN` = `fitgearzzz.myshopify.com`
   - `FRONTEND_URL` = `https://fitgearzzz.com`
3. Set scope to **Production** + **Preview** as needed
4. Redeploy from Vercel dashboard

---

## Step 5: Verify .gitignore is Correct

The `frontend/.gitignore` now correctly ignores `.env` and `.env.*` files.
The committed `.env` was added BEFORE the gitignore was properly set.
After the history rewrite above, this issue will be fully resolved.

---

## Prevention Going Forward

- Never commit `.env` files — use `.env.example` with placeholder values only
- Use `git status` before every commit to check for sensitive files
- Consider adding a pre-commit hook: `pip install pre-commit detect-secrets`
- All real credentials live in Vercel environment variables only
- The `.env.example` file in this repo shows the required variable names with safe placeholders

---

*Last updated: June 2026 | Issue #4*

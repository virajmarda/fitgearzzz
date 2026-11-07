import React, { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import AnnouncementBar from "./components/AnnouncementBar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/Checkout";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AuthCallback from "./pages/AuthCallback";
import CustomerLogout from "./pages/CustomerLogout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import ShippingReturns from "./pages/ShippingReturns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import FeaturesIndex from "./pages/FeaturesIndex";
import FeatureDetail from "./pages/FeatureDetail";
import CatalogPage from "./pages/CatalogPage";
import Wishlist from "./pages/Wishlist";

import * as fbPixel from "./utils/fbPixel";

import "./App.css";
import "./styles/shopify-buy-button.css";
import "./styles/theme-bridge.css";

const CONTENT_ID = "fg-route-content";

const BARE_PATHS = [
  "/admin",
  "/auth/callback",
  "/customer_identity/logout",
  "/customer_authentication/sso_hint",
];

function isBarePath(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  return BARE_PATHS.some(
    (path) =>
      normalizedPath === path ||
      normalizedPath.startsWith(`${path}/`)
  );
}

/**
 * Forward Shopify's SSO hint to the existing callback handler.
 *
 * Preserve the original query string so encoded values are not
 * accidentally changed by string interpolation.
 *
 * OAuth state validation, PKCE verification and token exchange
 * remain the responsibility of AuthCallback and the auth service.
 */
function CustomerSSOCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);

    const hasAuthorizationResponse =
      Boolean(params.get("code")) &&
      Boolean(params.get("state"));

    const hasErrorResponse = params.has("error");

    if (hasAuthorizationResponse || hasErrorResponse) {
      navigate(
        {
          pathname: "/auth/callback",
          search,
        },
        { replace: true }
      );

      return;
    }

    navigate("/", { replace: true });
  }, [navigate, search]);

  return (
    <div role="status" aria-live="polite">
      Continuing to your account…
    </div>
  );
}

/**
 * Reset scroll on pathname changes.
 *
 * Query-only changes do not force customers to the top while
 * filtering or sorting. Hash navigation scrolls to its target
 * when that target is already rendered.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        let targetId;

        try {
          targetId = decodeURIComponent(hash.slice(1));
        } catch {
          targetId = hash.slice(1);
        }

        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: "auto",
            block: "start",
          });

          return;
        }
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

/**
 * One explicit page-view call per consecutive storefront URL.
 *
 * Hash changes, including the skip link, are not new page views.
 * Account callbacks and administrative routes are excluded here.
 *
 * This does not implement consent management or control events
 * emitted internally by fbPixel.init() or other scripts.
 */
function useStorefrontPageViews(isBare) {
  const { pathname, search } = useLocation();

  const initialized = useRef(false);
  const lastPageKey = useRef(null);

  useEffect(() => {
    if (isBare) {
      lastPageKey.current = null;
      return;
    }

    const pageKey = `${pathname}${search}`;

    if (lastPageKey.current === pageKey) {
      return;
    }

    try {
      if (!initialized.current) {
        fbPixel.init();
        initialized.current = true;
      }

      fbPixel.pageview();
      lastPageKey.current = pageKey;
    } catch {
      // Optional analytics must not prevent customers from shopping.
      console.warn(
        "[FitGearzzz] Optional page-view tracking could not be sent."
      );
    }
  }, [isBare, pathname, search]);
}

function NotFound() {
  return (
    <section
      aria-labelledby="fg-not-found-title"
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        padding: "clamp(48px, 10vw, 112px) 24px",
      }}
    >
      <p
        style={{
          margin: "0 0 16px",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        404 / A small detour
      </p>

      <h1
        id="fg-not-found-title"
        style={{
          margin: "0 0 24px",
          maxWidth: "22ch",
          fontSize: "clamp(28px, 4vw, 36px)",
          lineHeight: 1.25,
        }}
      >
        This page isn’t on the map.
      </h1>

      <p
        style={{
          margin: "0 0 32px",
          maxWidth: "56ch",
          fontSize: "16px",
          lineHeight: 1.75,
        }}
      >
        The address may have changed, or the page may no longer
        exist. You can head back home or explore the equipment.
      </p>

      <nav
        aria-label="Page recovery"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px 24px",
        }}
      >
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            padding: "8px 0",
            color: "inherit",
            fontWeight: 700,
            textUnderlineOffset: "4px",
          }}
        >
          Back to home
        </Link>

        <Link
          to="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            padding: "8px 0",
            color: "inherit",
            fontWeight: 700,
            textUnderlineOffset: "4px",
          }}
        >
          Explore the shop
        </Link>
      </nav>
    </section>
  );
}

function AppContent() {
  const location = useLocation();
  const isBare = isBarePath(location.pathname);

  useStorefrontPageViews(isBare);

  return (
    <>
      <ScrollToTop />

      <a href={`#${CONTENT_ID}`} className="fg-skip-link">
        Skip to content
      </a>

      {!isBare && (
        <>
          <AnnouncementBar />
          <Navbar />
        </>
      )}

      {/*
        A focusable skip-link target without adding another <main>
        around pages that may already provide their own landmark.
      */}
      <div id={CONTENT_ID} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:handle"
            element={<ProductDetail />}
          />
          <Route path="/catalog" element={<CatalogPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/orders" element={<Orders />} />

          {/*
            Compatibility destination for existing tracking links.
            This opens order history; it is not live parcel tracking.
          */}
          <Route
            path="/track-order"
            element={<Navigate to="/orders" replace />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/auth/callback"
            element={<AuthCallback />}
          />
          <Route
            path="/customer_identity/logout"
            element={<CustomerLogout />}
          />
          <Route
            path="/customer_authentication/sso_hint"
            element={<CustomerSSOCallback />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/shipping"
            element={<ShippingReturns />}
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />

          <Route
            path="/features"
            element={<FeaturesIndex />}
          />
          <Route
            path="/features/:slug"
            element={<FeatureDetail />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isBare && (
        <>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </>
      )}

      <Toaster richColors position="bottom-right" />

      {!isBare && <Analytics />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

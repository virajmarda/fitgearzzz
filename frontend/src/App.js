import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useSearchParams,
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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import FeaturesIndex from "./pages/FeaturesIndex";
import FeatureDetail from "./pages/FeatureDetail";
import CatalogPage from "./pages/CatalogPage";
import Wishlist from "./pages/Wishlist";
import "./App.css";
import "./styles/shopify-buy-button.css";
import * as fbPixel from "./utils/fbPixel";

// Shopify Customer Account PKCE — OAuth SSO hint handler
// Reads 'code' and 'state' params then redirects to /auth/callback
const CustomerSSOCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      navigate(`/auth/callback?code=${code}&state=${state}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, searchParams]);

  return null;
};

// Scroll to top on every route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    fbPixel.init();
    fbPixel.pageview();
  }, []);

  useEffect(() => {
    fbPixel.pageview();
  }, [location]);

  // Pages that should render without Navbar/Footer chrome
  const bare = ["/admin", "/auth/callback", "/customer_identity/logout"];
  const isBare = bare.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <ScrollToTop />
      {!isBare && <AnnouncementBar />}
      {!isBare && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:handle" element={<ProductDetail />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/customer_identity/logout" element={<CustomerLogout />} />
        <Route
          path="/customer_authentication/sso_hint"
          element={<CustomerSSOCallback />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/features" element={<FeaturesIndex />} />
        <Route path="/features/:slug" element={<FeatureDetail />} />
      </Routes>
      {!isBare && <Footer />}
      {!isBare && <WhatsAppButton />}
      {!isBare && <BackToTop />}
      <Toaster richColors position="bottom-right" />
      <Analytics />
    </>
  );
};

const App = () => (
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

export default App;

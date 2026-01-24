import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams,, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AuthCallback from "./pages/AuthCallback";
import CustomerLogout from "./pages/CustomerLogout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ShippingReturns from "./pages/ShippingReturns";
import FAQ from "./pages/FAQ";
import CatalogPage from "./pages/CatalogPage"; // ⬅️ new page
import "./App.css";
import './styles/shopify-buy-button.css';

const CustomerSSOCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const returnTo = searchParams.get("return_to");

    if (returnTo) {
      window.location.href = decodeURIComponent(returnTo);
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, searchParams]);

  return null;
};

function App() {
    const location = useLocation();

  useEffect(() => {
    // Track PageView on route change
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App min-h-screen bg-[#09090b] flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/catalog" element={<CatalogPage />} /> {/* ⬅️ new */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/customer_identity/logout" element={<CustomerLogout />} />
                <Route path="/customer_authentication/sso_hint" element={<CustomerSSOCallback />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/products/:handle" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/shipping" element={<ShippingReturns />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                className: "bg-zinc-900 border-zinc-800 text-white",
                style: {
                  background: "#18181b",
                  color: "#fafafa",
                  border: "1px solid #27272a",
                },
              }}
            />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

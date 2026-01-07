// src/pages/CustomerLogout.tsx (or similar)
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import whatever you use to clear auth, e.g. auth context
// import { useAuth } from "../context/AuthContext";

const CustomerLogout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const { logout } = useAuth(); // if you have this

  useEffect(() => {
    const doLogout = async () => {
      // 1. Clear your own auth/session (adjust to your setup)
      // await logout();
      localStorage.removeItem("token");
      localStorage.removeItem("customer");
      document.cookie =
        "customer_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // 2. (Optional) call your backend to log out from Shopify too
      // await fetch("/api/shopify/logout", { method: "POST", credentials: "include" });

      // 3. Read return_url from query, or fallback to home
      const returnUrl = searchParams.get("return_url");
      const target = returnUrl ? decodeURIComponent(returnUrl) : "/";

      navigate(target, { replace: true });
    };

    void doLogout();
  }, [navigate, searchParams]);

  return null; // or <div>Logging you out...</div>
};

export default CustomerLogout;

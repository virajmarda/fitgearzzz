// Preserve the existing Shopify Customer Account PKCE flow and session keys.
import React,{createContext,useContext,useState,useEffect,useCallback} from 'react';
import {initiateShopifyLogin} from '../utils/shopifyAuth';
import {BACKEND_URL,SHOPIFY_CLIENT_ID,ACCOUNT_DOMAIN} from '../config/shopify';
const AuthContext=createContext();
export const useAuth=()=>useContext(AuthContext);
export const AuthProvider=({children})=>{const [user,setUser]=useState(null),[loading,setLoading]=useState(true),[token,setToken]=useState(()=>sessionStorage.getItem('access_token'));
 const clearLocalSession=useCallback(()=>{['access_token','refresh_token','id_token','token_expires_at','oauth_state','code_verifier','oauth_initiated_at'].forEach(k=>sessionStorage.removeItem(k));['fitgearzzz_auth_token','fitgearzzz_user','customerAccessToken','token','customer'].forEach(k=>localStorage.removeItem(k));setToken(null);setUser(null);},[]);
 const fetchShopifyCustomer=useCallback(async()=>{const accessToken=sessionStorage.getItem('access_token');if(!accessToken){setUser(null);return null;}const expires=Number(sessionStorage.getItem('token_expires_at'));if(expires&&expires<Date.now()){clearLocalSession();throw new Error('Your session has expired. Please sign in again.');}const res=await fetch(`${BACKEND_URL}/api/auth/me`,{headers:{Authorization:`Bearer ${accessToken}`},signal:AbortSignal.timeout(15000)});if(!res.ok){if(res.status===401||res.status===403)clearLocalSession();throw new Error('We couldn’t load your account. Please try again.');}const customer=await res.json();if(!customer?.id)throw new Error('Account details could not be verified.');setUser(customer);setToken(accessToken);return customer;},[clearLocalSession]);
 useEffect(()=>{fetchShopifyCustomer().catch(()=>{}).finally(()=>setLoading(false));},[fetchShopifyCustomer]);
 const loginWithShopify=useCallback(async()=>{if(!SHOPIFY_CLIENT_ID||!ACCOUNT_DOMAIN)throw new Error('Account sign-in is temporarily unavailable. Please contact us for help with your order.');await initiateShopifyLogin();},[]);
 const logout=useCallback(()=>{clearLocalSession();},[clearLocalSession]);
 return <AuthContext.Provider value={{user,token,loading,loginWithShopify,fetchShopifyCustomer,logout,clearLocalSession,isAuthenticated:()=>Boolean(user&&token)}}>{children}</AuthContext.Provider>;
};

import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {toast} from 'sonner';
const CartContext=createContext();const CART_KEY='fitgearzzz_cart_v2';
export const useCart=()=>useContext(CartContext);
export function CartProvider({children}){const [cart,setCart]=useState(()=>{try{const value=JSON.parse(localStorage.getItem(CART_KEY)||'[]');return Array.isArray(value)?value.filter(i=>i&&i.id&&Number.isFinite(Number(i.price))&&i.quantity>0):[];}catch{return [];}});
 useEffect(()=>{try{localStorage.setItem(CART_KEY,JSON.stringify(cart));}catch{toast.error('This browser could not save your cart.');}},[cart]);
 const addToCart=(product,variant,quantity=1)=>{if(!product||!variant?.id?.startsWith('gid://shopify/ProductVariant/')||!variant.available){toast.error('Please choose an available product option.');return false;}const q=Math.min(99,Math.max(1,Number.parseInt(quantity,10)||1)),price=Number(variant.price??product.price),currency=variant.currency||product.currency;if(!Number.isFinite(price)||!currency){toast.error('The product price could not be confirmed.');return false;}if(cart.some(i=>i.currency&&i.currency!==currency)){toast.error('Items in different currencies cannot share a cart.');return false;}const item={id:`${product.id}::${variant.id}`,productId:product.id,variantId:variant.id,handle:product.handle,title:product.title,variantTitle:variant.title,price,currency,image:variant.image||product.image,quantity:q,stock:typeof product.stock==='number'?product.stock:null};setCart(prev=>{const old=prev.find(i=>i.id===item.id);return old?prev.map(i=>i.id===item.id?{...i,price,currency,quantity:Math.min(99,i.quantity+q)}:i):[...prev,item];});toast.success('Added to your cart');return true;};
 const removeFromCart=id=>{setCart(prev=>prev.filter(i=>i.id!==id));toast.success('Removed from your cart');};
 const updateQuantity=(id,qty)=>{const q=Number.parseInt(qty,10);if(!Number.isFinite(q)||q<1)return;setCart(prev=>prev.map(i=>i.id===id?{...i,quantity:Math.min(99,q,typeof i.stock==='number'&&i.stock>0?i.stock:99)}:i));};
 const total=useMemo(()=>cart.reduce((sum,i)=>sum+i.price*i.quantity,0),[cart]),count=useMemo(()=>cart.reduce((sum,i)=>sum+i.quantity,0),[cart]);
 return <CartContext.Provider value={{cart,cartItems:cart,addToCart,removeFromCart,updateQuantity,updateCartItem:updateQuantity,clearCart:()=>setCart([]),cartTotal:total,cartCount:count,loading:false,isLoading:false,getCartTotal:()=>total,getCartCount:()=>count}}>{children}</CartContext.Provider>;
}
export default CartContext;

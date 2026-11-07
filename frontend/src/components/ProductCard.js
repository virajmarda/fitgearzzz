import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../lib/formatCurrency';
import SafeImage from './SafeImage';
export default function ProductCard({product,index=9}) {
 const {addToCart}=useCart(); const {toggleWishlist,isInWishlist}=useWishlist();
 if(!product)return null;
 const variant=product.variants?.find(v=>v.available), soldOut=product.availability==='out_of_stock'||!variant, wished=isInWishlist(product.id), multiple=product.variants?.length>1;
 const price=Number(product.price),compare=Number(product.compareAtPrice)>price?Number(product.compareAtPrice):null;
 return <article className="fg-product" data-testid={`product-card-${product.handle}`}><Link to={`/products/${product.handle}`} className="fg-product-media" data-testid={`product-image-${product.handle}`} aria-label={product.title}><SafeImage src={product.image} alt={product.title} loading={index<4?'eager':'lazy'}/></Link><button className="fg-product-save" data-testid={`wishlist-toggle-${product.handle}`} aria-label={`${wished?'Remove':'Save'} ${product.title} ${wished?'from':'to'} wishlist`} aria-pressed={wished} onClick={()=>toggleWishlist(product)}><Heart size={18} fill={wished?'currentColor':'none'}/></button><div className="fg-product-body">{product.category&&<p className="fg-eyebrow">{product.category}</p>}<h3><Link to={`/products/${product.handle}`} data-testid={`product-title-${product.handle}`}>{product.title}</Link></h3><div className="fg-product-price">{formatCurrency(price,product.currency)}{compare&&<del>{formatCurrency(compare,product.currency)}</del>}</div>{multiple&&!soldOut?<Link className="fg-btn fg-btn-outline" to={`/products/${product.handle}`} data-testid={`product-options-${product.handle}`}>Choose options <ArrowUpRight size={16}/></Link>:<button className="fg-btn fg-btn-outline" disabled={soldOut} onClick={()=>addToCart(product,variant,1)} data-testid={`product-add-${product.handle}`}>{soldOut?'Unavailable':'Add to cart'}{!soldOut&&<ArrowUpRight size={16}/>}</button>}</div></article>;
}

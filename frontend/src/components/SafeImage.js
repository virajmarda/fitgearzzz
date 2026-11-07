import React, { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
export default function SafeImage({ src, alt = '', className = '', ...props }) {
 const [failed,setFailed] = useState(false);
 useEffect(()=>setFailed(false),[src]);
 return src && !failed ? <img src={src} alt={alt} className={className} onError={()=>setFailed(true)} {...props}/> : <div className={`fg-image-missing ${className}`} role="img" aria-label={alt ? `${alt}: image unavailable` : 'Image unavailable'}><ImageOff size={24}/><span>Image unavailable</span></div>;
}

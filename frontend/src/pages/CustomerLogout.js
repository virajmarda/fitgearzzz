import React,{useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Check} from 'lucide-react';
export default function CustomerLogout(){const {clearLocalSession}=useAuth(),done=useRef(false);useEffect(()=>{if(!done.current){clearLocalSession();done.current=true;}},[clearLocalSession]);return <main className="fg-page fg-container" data-testid="logout-page"><div className="fg-panel account-gate"><Check size={30}/><h1>You’re signed out.</h1><p>Your session on this website has ended. Your cart and wishlist remain on this device.</p><Link to="/" className="fg-btn" data-testid="logout-home">Back to the store</Link></div></main>}

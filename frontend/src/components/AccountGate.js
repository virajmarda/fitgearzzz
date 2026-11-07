import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {UserRound} from 'lucide-react';
import AuthModal from './AuthModal';
export default function AccountGate({title='Your account, in one place.',message='Sign in to see your profile, order history and saved addresses.'}){const [open,setOpen]=useState(false);return <div className="fg-panel account-gate"><UserRound size={30}/><p className="fg-eyebrow mt-6">YOUR FITGEARZZZ</p><h1>{title}</h1><p>{message}</p><div className="flex flex-wrap gap-4"><button className="fg-btn" onClick={()=>setOpen(true)} data-testid="account-sign-in">Sign in to your account</button><Link to="/products" className="fg-link" data-testid="account-continue-shopping">Continue shopping</Link></div><AuthModal open={open} onClose={()=>setOpen(false)}/></div>}

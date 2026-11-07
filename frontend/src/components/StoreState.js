import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, RefreshCw } from 'lucide-react';
export default function StoreState({ title = 'Catalog temporarily unavailable', message = 'We can’t reach the store right now. Product details, prices and availability will return when the connection is restored.', onRetry, children }) {
  return <div className="fg-state" data-testid="catalog-unavailable" role="status"><div className="fg-state-icon"><PackageOpen size={23}/></div><div><h2>{title}</h2><p>{message}</p><div className="fg-state-actions">{onRetry && <button data-testid="catalog-unavailable-retry-button" className="fg-btn fg-btn-outline" onClick={onRetry}><RefreshCw size={15}/>Try again</button>}{children || <Link className="fg-link" to="/contact" data-testid="store-support-link">Ask us for help</Link>}</div></div></div>;
}

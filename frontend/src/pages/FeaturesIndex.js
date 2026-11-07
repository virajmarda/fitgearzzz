import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {features} from '../data/features';
import SafeImage from '../components/SafeImage';
export default function FeaturesIndex(){return <main className="fg-page fg-container"><header className="fg-page-header"><p className="fg-eyebrow">FITGEARZZZ / FEATURES</p><h1>A closer look.</h1><p>Stories about products, materials, and the decisions behind the brand.</p></header><div className="feature-list">{features.map((f,i)=><Link to={`/features/${f.slug}`} key={f.id} className="feature-row" data-testid={`feature-${f.slug}`}><span>{String(i+1).padStart(2,'0')}</span><SafeImage src={f.heroImage} alt={f.heroAlt} loading="lazy"/><div><p className="fg-eyebrow">{f.kicker}</p><h2>{f.title}</h2><p>{f.excerpt}</p><small>{f.readTime} · {f.date}</small></div><ArrowUpRight size={22}/></Link>)}</div></main>}

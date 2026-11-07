import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function AnnouncementBar(){const [visible,setVisible]=useState(true);return visible?<div className="site-announcement"><Link to="/blog" data-testid="announcement-link">A little know-how for your next session.<span> Explore the journal <ArrowRight size={12}/></span></Link><button aria-label="Dismiss announcement" data-testid="announcement-dismiss" onClick={()=>setVisible(false)}><X size={14}/></button></div>:null;}

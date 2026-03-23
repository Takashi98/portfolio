import { siteData } from '../../data/siteData';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  const indianTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    timeZone: 'Asia/Kolkata' 
  });

  return (
    <footer className="bg-surface text-textPrimary px-section-x pt-24 pb-8 border-t border-borderContent">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24">
        <div>
          <h2 className="text-display-section uppercase leading-none mb-4">
            {siteData.footerText}
          </h2>
          <a href={`mailto:${siteData.email}`} className="text-xl md:text-3xl font-display hover:text-textSecondary transition-colors">
            {siteData.email}
          </a>
        </div>
        <div className="flex flex-col items-end gap-2 mt-12 md:mt-0 font-mono text-sm text-textSecondary">
          <p>{siteData.location}</p>
          <p>Kanpur, India</p>
          <p>Local time: {indianTime} (IST)</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center font-mono text-xs text-textSecondary pt-8 border-t border-borderContent/30">
        <p>&copy; {currentYear} {siteData.name}. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          {siteData.socials.map((s) => (
             <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-textPrimary transition-colors px-1">
               {s.label}
             </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

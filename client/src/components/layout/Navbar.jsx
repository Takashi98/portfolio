import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../../data/siteData';
import { Sun, Moon, Home, MessageCircle } from 'lucide-react';
import ContactPanel from '../contact/ContactPanel';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  // Initialize theme from document
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const whatsappUrl = `https://wa.me/${siteData.contact.whatsapp.number}?text=${encodeURIComponent(siteData.contact.whatsapp.message)}`;

  return (
    <>
      {/* Top Fixed Area: Brand & Theme Toggle */}
      <header className="fixed top-0 left-0 w-full z-40 text-textPrimary pointer-events-none">
        <div className="flex items-center justify-between px-8 py-8 md:px-12 md:py-10">
          <Link to="/" className="text-xl md:text-2xl font-display uppercase tracking-widest pointer-events-auto hover:text-colorBrand transition-colors">
            <span className="hidden md:inline">{siteData.name.split(' ')[0]}</span>
            <span className="md:hidden">VP</span>
          </Link>
          
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={toggleTheme} 
              className="w-10 h-10 flex items-center justify-center rounded-full border border-borderContent hover:border-[#e87a3e] hover:text-[#e87a3e] transition-colors bg-surface/50 backdrop-blur-sm"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Bottom Dock Navigation */}
      <nav className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c1c] dark:bg-[#111111] text-white p-2 rounded-full flex items-center gap-4 md:gap-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-xl transition-all duration-300 pointer-events-auto hover:border-white/20">
        
        {/* Home Icon */}
        <Link to="/" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0">
          <Home className="w-5 h-5 text-white" />
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 pl-2 pr-6">
          {siteData.navLinks.filter(l => l.name !== 'Contact').map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors capitalize"
            >
              {link.name.toLowerCase()}
            </a>
          ))}
        </div>

        {/* Contact Button — opens modal */}
        <button 
          onClick={() => setContactOpen(true)}
          className="bg-[#e87a3e] hover:brightness-110 text-white px-6 md:px-8 py-3.5 rounded-full text-[13px] md:text-sm font-medium tracking-wide transition-all transform hover:scale-[1.02] active:scale-95 whitespace-nowrap shadow-[0_5px_15px_-5px_rgba(232,122,62,0.4)]"
        >
          Contact me
        </button>
      </nav>

      {/* Floating WhatsApp FAB — always visible */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 md:bottom-10 right-6 md:right-10 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1fba59] rounded-full flex items-center justify-center shadow-[0_8px_30px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_40px_-5px_rgba(37,211,102,0.6)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
      </a>

      {/* Contact Panel Modal */}
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}


import { useState, useEffect } from 'react';
import { X, MessageCircle, Mail, Calendar, Copy, Check, Phone, ArrowUpRight } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function ContactPanel({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { contact, phone } = siteData;

  // Handle mount/unmount animation
  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = contact.email.address;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappUrl = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`;
  const mailtoUrl = `mailto:${contact.email.address}?subject=${encodeURIComponent(contact.email.subject)}&body=${encodeURIComponent(contact.email.body)}`;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Panel — Desktop: centered modal, Mobile: bottom sheet */}
      <div className={`fixed z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        inset-x-4 bottom-4 top-auto md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
        ${mounted 
          ? 'opacity-100 translate-y-0 md:scale-100' 
          : 'opacity-0 translate-y-8 md:scale-95 md:translate-y-0'
        }`}
      >
        <div className="w-full md:w-[520px] bg-surface rounded-[2rem] md:rounded-[2.5rem] border border-borderContent/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Header */}
          <div className="relative px-8 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full border border-borderContent/50 flex items-center justify-center text-textSecondary hover:text-textPrimary hover:border-textPrimary transition-all hover:rotate-90 duration-300"
              aria-label="Close contact panel"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-textPrimary leading-[1.1] pr-12">
              {contact.headline}
            </h2>
            <p className="text-textSecondary text-sm md:text-base mt-4 leading-relaxed max-w-sm opacity-80">
              {contact.microcopy}
            </p>
          </div>

          {/* Divider */}
          <div className="mx-8 md:mx-10 h-px bg-borderContent/50" />

          {/* Contact Options */}
          <div className="px-8 py-6 md:px-10 md:py-8 flex flex-col gap-3">
            
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-2xl border border-borderContent/40 bg-surface hover:bg-[#25D366]/10 dark:hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/20 group-hover:shadow-[#25D366]/40 transition-shadow">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-display text-lg uppercase tracking-wide text-textPrimary block">WhatsApp Me</span>
                <span className="text-xs font-mono text-textMuted block mt-0.5 truncate">{phone}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-textMuted group-hover:text-[#25D366] transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
            </a>

            {/* Email */}
            <a
              href={mailtoUrl}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-borderContent/40 bg-surface hover:bg-accent/5 dark:hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow">
                <Mail className="w-5 h-5 text-background" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-display text-lg uppercase tracking-wide text-textPrimary block">Email Me</span>
                <span className="text-xs font-mono text-textMuted block mt-0.5 truncate">{contact.email.address}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-textMuted group-hover:text-textPrimary transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
            </a>

            {/* Book a Call */}
            {contact.bookCall.enabled && (
              <a
                href={contact.bookCall.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-2xl border border-borderContent/40 bg-surface hover:bg-[#E87A3E]/10 dark:hover:bg-[#E87A3E]/15 hover:border-[#E87A3E]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E87A3E] flex items-center justify-center shrink-0 shadow-lg shadow-[#E87A3E]/20 group-hover:shadow-[#E87A3E]/40 transition-shadow">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-display text-lg uppercase tracking-wide text-textPrimary block">{contact.bookCall.label}</span>
                  <span className="text-xs font-mono text-textMuted block mt-0.5">Schedule via Calendly</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-textMuted group-hover:text-[#E87A3E] transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
              </a>
            )}
          </div>

          {/* Footer: Copy email + Phone */}
          <div className="mx-8 md:mx-10 h-px bg-borderContent/50" />
          <div className="px-8 py-5 md:px-10 md:py-6 flex items-center justify-between">
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-textMuted hover:text-textPrimary transition-colors group"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="text-[#25D366]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {/* Phone display */}
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-xs font-mono text-textMuted hover:text-textPrimary transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Toast notification for copy */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] bg-accent text-background px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest shadow-2xl transition-all duration-500 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        Email copied to clipboard ✓
      </div>
    </>
  );
}

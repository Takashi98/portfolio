import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { siteData } from '../../data/siteData';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      
      if (currentProgress === 100) {
        clearInterval(interval);
        
        // Trigger exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
          }
        });

        tl.to(counterRef.current, { y: -50, opacity: 0, duration: 0.6, ease: 'power3.in' })
          .to(textRef.current, { scale: 1.1, opacity: 0, duration: 0.8, ease: 'power3.inOut' }, "-=0.4")
          .to(containerRef.current, { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, "-=0.4");
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background text-textPrimary">
      <div className="absolute inset-0 bg-surface opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surfaceHover to-background" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 ref={textRef} className="text-display-section uppercase tracking-widest font-display mix-blend-difference">
          {siteData.name.split(' ')[0]}
        </h1>
        <div className="overflow-hidden mt-8">
          <span ref={counterRef} className="block text-xl font-mono text-textSecondary">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}

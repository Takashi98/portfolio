import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { homeData } from '../../data/homeData';
import { siteData } from '../../data/siteData';

export default function HeroSection() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const roleRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text into characters for a cinematic reveal
      const splitTitle1 = new SplitType(title1Ref.current, { types: 'chars' });
      const splitTitle2 = new SplitType(title2Ref.current, { types: 'chars' });
      
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial state
      gsap.set([splitTitle1.chars, splitTitle2.chars], { yPercent: 120, opacity: 0, rotateZ: 5 });
      
      // Animate
      tl.to([splitTitle1.chars, splitTitle2.chars], {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1.5,
        stagger: 0.04,
        delay: 0.2
      })
      .fromTo(roleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1.2 }, "-=1")
      .fromTo(locationRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-center px-section-x overflow-hidden bg-background">
      {/* Background overlay giving a subtle vignette or gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface to-background" />

      <div className="relative z-10 flex flex-col pt-32">
        <h1 className="text-display-hero uppercase leading-[0.85] w-full flex flex-col mix-blend-difference">
          <div className="overflow-hidden pb-2 md:pb-6">
            <span ref={title1Ref} className="block">{homeData.hero.title.split('\n')[0]}</span>
          </div>
          <div className="overflow-hidden pb-2 md:pb-6 md:ml-32">
            <span ref={title2Ref} className="block text-textSecondary">{homeData.hero.title.split('\n')[1]}</span>
          </div>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-16 md:mt-24 mb-8 border-t border-borderContent pt-8">
          <p ref={roleRef} className="text-xl md:text-4xl font-display text-textMuted uppercase tracking-wide">{homeData.hero.subtitle}</p>
          <div ref={locationRef} className="flex md:flex flex-col md:text-right font-mono text-[10px] md:text-xs text-textSecondary uppercase tracking-widest gap-2">
            <span className="animate-pulse md:inline hidden">Scroll to explore &darr;</span>
            <span className="md:hidden">Scroll down &darr;</span>
            <span>Based in {siteData.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { homeData } from '../../data/homeData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const vProgressRef = useRef(null);
  const dotsRef = useRef([]);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top 80%" : "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      });

      // Initial state
      gsap.set(itemsRef.current, { opacity: 0, y: 30 });
      gsap.set(dotsRef.current, { backgroundColor: "var(--color-border-content)", scale: 1 });
      if (!isMobile) gsap.set(progressRef.current, { width: 0 });
      if (isMobile) gsap.set(vProgressRef.current, { height: 0 });

      homeData.process.forEach((_, i) => {
        // 1. Activate Dot
        tl.to(dotsRef.current[i], {
          backgroundColor: "#E87A3E",
          scale: 1.4,
          boxShadow: "0 0 20px rgba(232, 122, 62, 0.4)",
          duration: 0.5,
          ease: "back.out(2)"
        }, i === 0 ? 0 : ">-0.2");

        // 2. Reveal Item Content
        tl.to(itemsRef.current[i], {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out"
        }, "<");

        // 3. Grow Line to next dot (if not last)
        if (i < homeData.process.length - 1) {
          if (!isMobile) {
            tl.to(progressRef.current, {
              width: `${(i + 1) * 25}%`,
              duration: 1,
              ease: "power1.inOut"
            }, ">-0.1");
          } else {
            tl.to(vProgressRef.current, {
              height: `${(index_to_percent(i + 1))}%`, 
              duration: 0.8,
              ease: "power1.inOut"
            }, ">-0.1");
          }
        }
      });

      function index_to_percent(i) {
        // Approximate percentage for vertical line
        return (i / (homeData.process.length - 1)) * 90;
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="w-full py-section-y px-section-x bg-surface relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-24 border-b border-borderContent pb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted block mb-3">How I Work</span>
            <h2 className="text-display-section uppercase leading-tight">
              Process
            </h2>
          </div>
          <p className="text-textSecondary text-base md:text-lg max-w-md leading-relaxed">
            A clear, intentional approach to every project — from understanding the goal to shipping the final product.
          </p>
        </div>

        {/* Desktop Timeline Row */}
        <div className="hidden md:block relative mb-16 px-8">
          {/* Base Track */}
          <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-zinc-400 dark:bg-zinc-700 -translate-y-1/2" />
          {/* Active Progress */}
          <div 
            ref={progressRef} 
            className="absolute top-1/2 left-8 h-[2px] bg-[#e87a3e] -translate-y-1/2 origin-left z-10" 
            style={{ width: 0 }}
          />
          
          <div className="grid grid-cols-5 relative">
            {homeData.process.map((_, i) => (
              <div key={i} className="flex justify-center">
                <div 
                  ref={el => dotsRef.current[i] = el}
                  className="w-3.5 h-3.5 rounded-full bg-borderContent relative z-20 border-2 border-surface" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Process Content Grid */}
        <div className="relative">
          {/* Mobile Vertical Track - Only visible on small screens */}
          <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <div 
            ref={vProgressRef} 
            className="md:hidden absolute left-[15px] top-4 w-[1px] bg-[#e87a3e] origin-top z-10" 
            style={{ height: 0 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative">
            {homeData.process.map((item, index) => (
              <div
                key={index}
                ref={el => itemsRef.current[index] = el}
                className="group relative flex flex-col pl-12 md:pl-0 md:p-6 md:text-center border-l-0 md:border-transparent"
              >
                {/* Custom Dot for horizontal/vertical logic */}
                <div 
                  ref={el => dotsRef.current[index] = el}
                  className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-4 md:top-[-45px] w-3.5 h-3.5 rounded-full bg-borderContent z-20 border-2 border-surface" 
                />

                {/* Step number */}
                <span className="font-mono text-[11px] text-[#e87a3e] uppercase tracking-widest mb-2 md:mb-4 block">
                  Step {item.step}
                </span>

                <h3 className="font-display text-lg md:text-xl uppercase tracking-wide mb-2 md:mb-4 text-textPrimary">
                  {item.title}
                </h3>

                <p className="text-textSecondary text-sm leading-relaxed group-hover:text-textPrimary transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



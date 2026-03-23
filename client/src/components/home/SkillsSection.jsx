import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { homeData } from '../../data/homeData';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef(null);
  const leftCardsRef = useRef([]);
  const rightCardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Animate the floating card from center to right as the section enters the viewport
      gsap.fromTo(rightCardRef.current, 
        { 
          x: "-25vw", // Offset to screen center for a 50/50 split
          scale: 1.1 
        }, 
        { 
          x: "0vw", 
          scale: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Start animating when section is mostly in view
            end: "top 10%",   // Finish docking right before sticky engages
            scrub: true,
          }
        }
      );

      // 2. Track active left-side card to update the right-side preview seamlessly
      leftCardsRef.current.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%", // When the card's top hits 60% of viewport
          end: "bottom 60%", // When the card's bottom passes 60% of viewport
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          // When going too far up past the first item, revert to profile state
          onLeaveBack: () => { if (index === 0) setActiveIndex(-1) } 
        });
      });

    }, sectionRef);

    // Refresh ScrollTrigger to calculate correct layout heights for native scrolling
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative w-full px-section-x bg-background min-h-screen border-t border-borderContent">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative w-full max-w-[1400px] mx-auto">
        
        {/* Left Column: Native Scrolling Text Elements */}
        <div className="flex flex-col pt-[30vh] pb-[40vh] relative z-10 w-full md:pr-12">
          {homeData.services.map((service, index) => (
            <div 
              key={service.id} 
              ref={(el) => (leftCardsRef.current[index] = el)}
              className="min-h-[60vh] flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-mono text-textSecondary px-3 py-1 border border-borderContent rounded-full">
                  {service.id}
                </span>
                <span className="text-sm font-mono uppercase text-textSecondary tracking-widest">
                  {service.label}
                </span>
              </div>
              <h3 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] mb-8 hover:text-textSecondary transition-colors duration-400">
                {service.title}
              </h3>
              <p className="text-textSecondary text-xl md:text-2xl text-balance max-w-lg leading-relaxed mix-blend-difference">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: High-End Sticky Dock */}
        <div className="hidden md:block h-full relative pointer-events-none z-20">
           {/* The sticky wrapper spans the viewport height and anchors the card centrally */}
           <div className="sticky top-0 h-screen flex items-center justify-end xl:justify-center w-full">
             
             {/* The Card that floats from center and holds synced previews */}
             <div 
               ref={rightCardRef} 
               className="w-full max-w-lg aspect-[3/4] bg-surfaceHover border border-borderContent p-12 glass-panel shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col pointer-events-auto transition-transform duration-600"
             >
                {/* 1. Base Profile / Intro State */}
                <div className={`absolute inset-0 p-12 flex flex-col justify-center items-center text-center transition-all duration-800 ease-editorial ${activeIndex === -1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                   {/* Dummy stylized circle indicating profile/focus */}
                   <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border border-borderContent p-1 bg-surface flex items-center justify-center shadow-lg">
                     <span className="font-display text-4xl text-textSecondary uppercase">NR</span>
                   </div>
                   <h3 className="font-display text-3xl uppercase mb-3 text-balance">Digital Product <br/> Architect</h3>
                   <div className="h-px w-12 bg-borderContent mb-6" />
                   <p className="text-textSecondary font-mono text-sm uppercase tracking-widest mt-auto">Syncing Scroll...</p>
                </div>

                {/* 2. Synced Injected Preview States */}
                {homeData.services.map((service, index) => (
                  <div 
                    key={service.id}
                    className={`absolute inset-0 p-12 flex flex-col justify-between transition-all duration-800 ease-editorial ${
                       activeIndex === index 
                         ? 'opacity-100 translate-y-0 scale-100 z-10' 
                         : activeIndex > index 
                           ? 'opacity-0 -translate-y-12 scale-95 z-0' 
                           : 'opacity-0 translate-y-12 scale-105 z-0'
                    } pointer-events-none`}
                  >
                    <div>
                      <span className="font-mono text-xs text-textSecondary uppercase tracking-widest mb-6 block border-b border-borderContent pb-4">
                        Expertise {service.id}
                      </span>
                      <h4 className="font-display text-4xl uppercase mb-6 leading-tight flex flex-col">
                        {service.title.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                      </h4>
                    </div>
                    
                    <div className="flex flex-col gap-3 border-t border-borderContent pt-8">
                      {service.tools.map(tool => (
                         <div key={tool} className="flex items-center justify-between text-sm font-mono">
                            <span className="text-textSecondary">— {tool}</span>
                            <span className="w-2 h-2 rounded-full bg-borderContent" />
                         </div>
                      ))}
                    </div>
                  </div>
                ))}
                
             </div>

           </div>
        </div>
        
      </div>
    </section>
  );
}

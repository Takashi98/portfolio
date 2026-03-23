import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import heroImg from '../../assets/vishal prajapati.jpeg';
import HeroBackground from './HeroBackground';
import Hero3DScene from './Hero3DScene';
import { homeData } from '../../data/homeData';
import { siteData } from '../../data/siteData';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSkillsCombo() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const roleRef = useRef(null);
  const locationRef = useRef(null);
  const leftCardsRef = useRef([]);
  const idCardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Cinematic Intro
      const splitTitle1 = new SplitType(title1Ref.current, { types: 'chars' });
      const splitTitle2 = new SplitType(title2Ref.current, { types: 'chars' });
      const introTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set([splitTitle1.chars, splitTitle2.chars], { yPercent: 120, opacity: 0, rotateZ: 5 });
      
      introTl.to([splitTitle1.chars, splitTitle2.chars], {
        yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.5, stagger: 0.04, delay: 0.2
      })
      .fromTo(roleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1.2 }, "-=1.2")
      .fromTo(locationRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 }, "-=1.2")
      // Animate the small card into existence in the hero (top right)
      .fromTo(cardRef.current, 
        { opacity: 0, scale: 0, rotation: -5 }, 
        { opacity: 1, scale: 0.55, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.7)' }, 
        "-=0.8"
      )
      // Animate the identity card in
      .fromTo(idCardRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
        "-=1.2"
      );

      // Scroll the identity card OUT of view as user scrolls down
      gsap.to(idCardRef.current, {
        y: -200,
        opacity: 0,
        scale: 0.8,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 0.5,
          scrub: true,
        }
      });

      // 2. The Fluid Float from Hero to Right Column Dock
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(cardRef.current, 
          { 
            x: "10vw",   // Positioned further right
            y: "-110vh",  // Pulled significantly high up so it natively sits in the center-right of the hero on load
          },
          {
            x: "0vw",
            y: "0vh",
            scale: 1,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: containerRef.current, // Triggers at the exact top of the Hero body
              start: "top top",      
              end: () => "+=" + window.innerHeight * 0.9, // Over the scroll of the hero
              scrub: true,
            }
          }
        );
      });

      // 3. Track active left-side cards for Skill Synching & Stacking
      leftCardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Entrance animation: slide up + fade in
        gsap.fromTo(card, 
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );

        // Sync right side content
        ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          onLeaveBack: () => { if (index === 0) setActiveIndex(-1) }
        });
        
        // Pushback Stacking Effect: Darken and scale down as the next card covers it
        if (index < leftCardsRef.current.length - 1) {
           gsap.to(card, {
             scale: 0.92,
             filter: "brightness(0.6)",
             scrollTrigger: {
                trigger: leftCardsRef.current[index + 1],
                start: "top 80%",
                end: "top 20%",
                scrub: true,
             }
           });
        }
      });

    }, containerRef);
    
    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background">
      
      {/* 
        The Magic Sticky Wrapper 
        Spans exactly over the Hero and Skills sections. 
        Only visible and driven on desktop implementations.
      */}
      <div className="hidden md:block absolute top-0 bottom-0 right-0 w-1/2 pointer-events-none z-30">
        <div className="sticky top-0 h-screen flex items-center justify-center w-full px-12 lg:px-24">
           {/* 
             The actual floating preview card.
           */}
           <div 
             ref={cardRef} 
             className="w-full max-w-[320px] lg:max-w-[360px] aspect-[4/5] bg-surfaceHover border border-borderContent/50 p-8 glass-panel shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col pointer-events-auto origin-center opacity-0 rounded-[2.5rem]"
           >
              {/* Overlay Grain / Glow effects can go here */}

              {/* Profile Intro State (Full Image) */}
              <div className={`absolute inset-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20 ${activeIndex === -1 ? 'opacity-100 scale-100 delay-[400ms]' : 'opacity-0 scale-95 pointer-events-none'}`}>
                 {/* Full Card Photo */}
                 <img src={heroImg} alt={siteData.name} className="absolute inset-0 w-full h-full object-cover mix-blend-normal" />
                 
                 {/* Dark Editorial Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                     <h3 className="font-display text-4xl uppercase mb-2 leading-[1.1] text-white tracking-tight">{siteData.name}</h3>
                     <p className="text-xs font-mono uppercase tracking-widest mb-4 opacity-80 text-white">{siteData.role}</p>
                     
                     <div className="w-full h-px bg-white/30 mb-6 mt-2" />
                     
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full border-[2px] border-white/50 border-t-white animate-spin" />
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-80 text-white">Syncing Content</span>
                     </div>
                 </div>
              </div>

               {/* Skills Previews */}
              {homeData.services.map((service, index) => (
                <div 
                  key={service.id}
                  className={`absolute inset-0 p-10 flex flex-col items-center justify-center text-center transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] bg-surfaceHover ${
                     activeIndex === index 
                       ? 'opacity-100 translate-y-0 scale-100 z-10' 
                       : activeIndex > index 
                         ? 'opacity-0 -translate-y-12 scale-95 z-0' 
                         : 'opacity-0 translate-y-12 scale-105 z-0'
                  } pointer-events-none`}
                >
                  {/* Index badge */}
                  <span className="font-mono text-[9px] text-textSecondary uppercase tracking-widest mb-6 block border border-borderContent px-4 py-1.5 rounded-full">
                    Expertise [{service.id}]
                  </span>
                  
                  {/* Title */}
                  <h4 className="font-display text-4xl lg:text-5xl uppercase mb-6 leading-[0.9] tracking-tight">
                    {service.title}
                  </h4>
                  
                  {/* Divider */}
                  <div className="w-10 h-px bg-borderContent mb-6" />

                  {/* Description */}
                  <p className="text-textSecondary text-sm leading-relaxed mb-8 max-w-[240px] opacity-70">
                    {service.description}
                  </p>
                  
                  {/* Tools grid */}
                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {service.tools.map(tool => (
                       <span key={tool} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-borderContent/60 text-textSecondary hover:bg-surface transition-colors pointer-events-auto cursor-default">
                         {tool}
                       </span>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Hero Section Container */}
      <section className="relative w-full h-screen flex flex-col justify-center px-section-x overflow-hidden z-20">
        <HeroBackground />
        <Hero3DScene />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface to-background" />

        <div className="relative z-10 flex flex-col pt-[20vh] md:pt-32 w-full md:w-3/4">
          <h1 className="text-display-hero uppercase leading-[0.85] w-full flex flex-col pointer-events-none mb-12">
            <div className="overflow-hidden pb-2 md:pb-6">
              <span ref={title1Ref} className="block text-textPrimary">{homeData.hero.title.split('\n')[0]}</span>
            </div>
            <div className="overflow-hidden pb-2 md:pb-6 md:ml-24">
              <span ref={title2Ref} className="block text-textSecondary">{homeData.hero.title.split('\n')[1]}</span>
            </div>
          </h1>
          
          <div className="flex justify-between items-end mt-4 border-t border-borderContent pt-8 pb-12">
            <p ref={roleRef} className="text-xl md:text-4xl font-display text-textMuted uppercase tracking-wide">{homeData.hero.subtitle}</p>
            <div ref={locationRef} className="hidden md:flex flex-col text-right font-mono text-[10px] text-textSecondary uppercase tracking-widest gap-2">
              <span className="animate-pulse">Scroll to explore</span>
              <span>Based in {siteData.location}</span>
            </div>
          </div>
        </div>

        {/* Identity Photo Card — top right of hero, scrolls away */}
        <div 
          ref={idCardRef}
          className="hidden md:flex absolute top-[15vh] right-[6vw] z-30 flex-col items-center bg-surface rounded-[2.5rem] p-8 shadow-[0_24px_80px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_80px_-15px_rgba(0,0,0,0.4)] border border-borderContent w-[280px] opacity-0 transition-shadow duration-500"
        >
          <div className="w-40 h-40 rounded-[2rem] overflow-hidden mb-6 border-2 border-borderContent shadow-sm">
            <img src={heroImg} alt={siteData.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-display text-xl uppercase tracking-wider text-textPrimary mb-1.5">{siteData.name}</h3>
          <p className="text-sm font-mono text-textSecondary uppercase tracking-widest leading-relaxed">Developer</p>
          <div className="w-12 h-px bg-borderContent my-5" />
          <p className="text-[11px] font-mono text-textMuted uppercase tracking-widest">Based in {siteData.location}</p>
        </div>
      </section>

      {/* Skills Section Container */}
      <section id="skills" className="relative w-full px-section-x min-h-screen z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-[1400px] mx-auto relative">
          
          <div className="col-span-1 flex flex-col pt-[60vh] pb-[30vh] relative z-20 w-full md:pr-16 pointer-events-none">
            {homeData.services.map((service, index) => (
              <div 
                key={service.id} 
                ref={(el) => (leftCardsRef.current[index] = el)}
                className="sticky bg-surface rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.15)] pointer-events-auto flex flex-col w-full border border-borderContent/50 mb-[40vh] origin-top z-10 will-change-transform overflow-hidden relative"
                style={{ top: `calc(15vh + ${index * 16}px)` }}
              >
                {/* Animated background orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
                  <div 
                    className="absolute w-[300px] h-[300px] rounded-full opacity-[0.07] dark:opacity-[0.12] blur-3xl"
                    style={{
                      background: `radial-gradient(circle, var(--color-accent) 0%, transparent 70%)`,
                      top: '-20%',
                      right: '-10%',
                      animation: `floatOrb1 ${12 + index * 3}s ease-in-out infinite`,
                    }}
                  />
                  <div 
                    className="absolute w-[250px] h-[250px] rounded-full opacity-[0.05] dark:opacity-[0.08] blur-3xl"
                    style={{
                      background: `radial-gradient(circle, var(--color-text-muted) 0%, transparent 70%)`,
                      bottom: '-15%',
                      left: '-5%',
                      animation: `floatOrb2 ${14 + index * 2}s ease-in-out infinite`,
                    }}
                  />
                  {/* Subtle grid pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
                    style={{
                      backgroundImage: `
                        linear-gradient(var(--color-text-muted) 1px, transparent 1px),
                        linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>
                {/* Stylized Label */}
                <span className="font-sans italic text-textSecondary text-sm md:text-base mb-6 opacity-80">
                  {service.label}
                </span>
                
                {/* Number + Title */}
                <h3 className="text-4xl md:text-5xl lg:text-5xl font-display font-medium tracking-tight mb-8 text-textPrimary leading-[1.1]">
                  {service.id}. {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-textSecondary text-lg md:text-[1.15rem] leading-relaxed mb-10 max-w-lg opacity-80">
                  {service.description}
                </p>
                
                {/* Bullet Points */}
                <ul className="flex flex-col gap-3">
                  {service.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-4 text-textSecondary md:text-lg">
                      <div className="w-1 h-1 rounded-full bg-textMuted shrink-0"></div>
                      <span className="opacity-70">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden md:block col-span-1 h-full pointer-events-none relative z-10" />

        </div>
      </section>

    </div>
  );
}

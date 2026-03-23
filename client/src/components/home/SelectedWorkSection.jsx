import { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function SelectedWorkSection() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const featured = portfolioData.slice(0, 2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        // Subtle Parallax setup
        const image = item.querySelector('.parallax-image');
        
        // Entrances
        gsap.fromTo(
          item,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Parallax scroll on image
        gsap.fromTo(
          image,
          { y: -30, scale: 1.1 },
          {
            y: 30,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-section-y px-section-x bg-surface">
      <div className="flex justify-between items-end mb-16 border-b border-borderContent pb-8">
        <div>
          <span className="text-xs font-mono uppercase text-textSecondary mb-4 block">Selected Work</span>
          <h2 className="text-display-section uppercase leading-none">Featured Projects</h2>
        </div>
        <Link to="/portfolio" className="hidden md:flex items-center gap-2 group hover:text-textSecondary transition-colors">
          <span className="font-mono text-sm uppercase">View All</span>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {featured.map((project, index) => (
          <div 
            key={project.id} 
            ref={(el) => (itemsRef.current[index] = el)}
            className={`group flex flex-col ${index === 1 ? 'md:mt-32' : ''}`}
          >
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-surfaceHover mb-6">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="parallax-image w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-1000 ease-editorial origin-center"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between items-baseline mb-2 overflow-hidden">
                <h3 className="text-2xl md:text-3xl font-display uppercase hover:text-textSecondary transition-colors">{project.title}</h3>
                <span className="text-xs font-mono text-textSecondary">{project.category}</span>
              </div>
              <p className="text-textSecondary text-sm line-clamp-2 w-4/5">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 md:hidden">
        <Link to="/portfolio" className="w-full py-4 border border-borderContent flex justify-center items-center gap-2 text-sm font-mono uppercase hover:bg-surfaceHover transition-colors">
          View All Work <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

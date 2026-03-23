import { homeData } from '../../data/homeData';
import { ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-section-y px-section-x bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gap max-w-[1400px] mx-auto">
        <div className="col-span-1 border-t border-borderContent pt-4 hidden md:block" />
        
        <div className="col-span-10 md:col-span-6 border-t border-borderContent pt-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted block mb-6">About Me</span>
          <h2 className="text-display-section uppercase leading-tight mb-8">
            {homeData.about.heading}
          </h2>
        </div>
        
        <div className="col-span-12 md:col-span-4 md:col-start-9 border-t border-borderContent pt-4 flex flex-col justify-between">
          <p className="text-textSecondary text-base md:text-lg mb-8 md:mb-12 text-balance leading-relaxed">
            {homeData.about.narrative}
          </p>
          
          <div className="flex flex-col gap-4 border-t border-borderContent pt-8">
            <a href="#contact" className="group flex items-center justify-between py-4 border-b border-borderContent hover:text-[#e87a3e] hover:border-[#e87a3e] transition-all">
              <span className="font-display text-xl uppercase tracking-wide">Get in touch</span>
              <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href="#lab" className="group flex items-center justify-between py-4 hover:text-[#e87a3e] transition-all">
              <span className="font-display text-xl uppercase tracking-wide">View my work</span>
              <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Web & UI/UX', 'Graphic Design', 'Video / Motion'];
  
  const filteredProjects = activeFilter === 'All' 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Selected Work - Nikola Radeski</title>
      </Helmet>
      
      <main className="pt-32 pb-section-y min-h-screen px-section-x bg-background">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-borderContent pb-12 mb-12">
          <div>
            <span className="font-mono text-xs uppercase text-textSecondary mb-4 block">Archive</span>
            <h1 className="text-display-section uppercase leading-none">Selected <br/> Work</h1>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="font-mono text-sm text-textSecondary uppercase mb-2">Updated</p>
            <p className="font-display text-xl">MARCH 2026</p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-borderContent pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-mono text-sm uppercase px-4 py-2 border rounded-full transition-colors ${
                activeFilter === cat 
                  ? 'bg-textPrimary text-background border-textPrimary' 
                  : 'border-borderContent text-textSecondary hover:border-textSecondary hover:text-textPrimary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-24">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="group flex flex-col cursor-pointer pb-8 border-b border-borderContent/50 hover:border-textSecondary transition-colors">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface mb-6">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-800 ease-editorial"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-600 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur text-textPrimary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-600 ease-editorial">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-display uppercase">{project.title}</h3>
                <span className="text-xs font-mono text-textSecondary bg-surface px-2 py-1">{project.category}</span>
              </div>
              <p className="text-textSecondary text-sm line-clamp-2">{project.description}</p>
            </div>
          ))}
        </div>
        
      </main>
    </>
  );
}

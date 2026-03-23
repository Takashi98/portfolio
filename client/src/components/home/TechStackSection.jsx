import { homeData } from '../../data/homeData';

const levelStyles = {
  primary: 'bg-[#e87a3e]/10 text-[#e87a3e] border-[#e87a3e]/30 hover:bg-[#e87a3e] hover:text-white',
  growing: 'bg-surface text-textPrimary border-borderContent hover:border-[#e87a3e]/50',
  learning: 'bg-surface text-textSecondary border-borderContent/60 hover:border-[#e87a3e]/30',
};

const categoryLabels = {
  frontend: 'Frontend',
  ecommerce: 'E-Commerce',
  backend: 'Backend',
  tools: 'Tools & Workflow',
};

export default function TechStackSection() {
  const { techStack } = homeData;

  return (
    <section id="stack" className="w-full py-section-y px-section-x bg-surface">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-borderContent pb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted block mb-3">Technologies</span>
            <h2 className="text-display-section uppercase leading-tight">
              Tech Stack
            </h2>
          </div>
          <p className="text-textSecondary text-base md:text-lg max-w-md leading-relaxed opacity-80">
            The tools and technologies I work with daily.
          </p>
        </div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-textMuted mb-6 border-b border-borderContent pb-3">
                {categoryLabels[category] || category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {items.map((tech) => (
                  <span
                    key={tech.name}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 hover:scale-105 cursor-default ${levelStyles[tech.level]}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-12 pt-6 border-t border-borderContent/30">
          <span className="font-mono text-[9px] uppercase tracking-widest text-textMuted">Proficiency:</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e87a3e]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-textMuted">Strong</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-textPrimary" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-textMuted">Growing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-textSecondary" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-textMuted">Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}

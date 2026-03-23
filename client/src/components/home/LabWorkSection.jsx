import { homeData } from '../../data/homeData';
import { ArrowUpRight } from 'lucide-react';

const typeColors = {
  'Practice Build': 'bg-[#e87a3e]/10 text-[#e87a3e] border-[#e87a3e]/20',
  'Concept Build': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'UI Experiment': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  'Learning Project': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
};

export default function LabWorkSection() {
  return (
    <section id="lab" className="w-full py-section-y px-section-x bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-borderContent pb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted block mb-3">Proof of Capability</span>
            <h2 className="text-display-section uppercase leading-tight">
              Lab Work
            </h2>
          </div>
          <p className="text-textSecondary text-base md:text-lg max-w-md leading-relaxed">
            Practice builds, concept work, and experiments — honest proof of what I can build.
          </p>
        </div>

        {/* Lab Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeData.labWork.map((item, index) => (
            <div
              key={index}
              className="group relative bg-surface rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-borderContent hover:border-borderHover transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Type Badge */}
              <span className={`inline-flex self-start px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border mb-6 ${typeColors[item.type] || 'bg-surfaceHover text-textMuted border-borderContent'}`}>
                {item.type}
              </span>

              {/* Title */}
              <h3 className="font-display text-xl uppercase tracking-tight mb-3 text-textPrimary group-hover:text-colorBrand transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-textSecondary text-sm leading-relaxed mb-8 flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-borderContent text-textSecondary group-hover:border-borderHover transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

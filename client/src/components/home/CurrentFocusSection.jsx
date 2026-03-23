import { homeData } from '../../data/homeData';
import { Globe, Store, Server, Sparkles } from 'lucide-react';

const iconMap = {
  globe: Globe,
  store: Store,
  server: Server,
  sparkles: Sparkles,
};

export default function CurrentFocusSection() {
  return (
    <section id="focus" className="w-full py-section-y px-section-x bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-borderContent pb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted block mb-3">What I'm Working On</span>
            <h2 className="text-display-section uppercase leading-tight">
              Current Focus
            </h2>
          </div>
          <p className="text-textSecondary text-base md:text-lg max-w-md leading-relaxed opacity-80">
            What I'm actively building, learning, and improving right now.
          </p>
        </div>

        {/* Focus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homeData.currentFocus.map((item, index) => {
            const Icon = iconMap[item.icon] || Globe;
            return (
              <div
                key={index}
                className="group relative bg-surface rounded-[2rem] p-8 md:p-10 border border-borderContent/50 hover:border-borderContent transition-all duration-500 overflow-hidden"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--color-accent)_0%,_transparent_60%)] opacity-[0.03]" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-surfaceHover border border-borderContent/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors" />
                  </div>

                  <h3 className="font-display text-2xl uppercase tracking-tight mb-4 text-textPrimary">
                    {item.title}
                  </h3>

                  <p className="text-textSecondary text-sm leading-relaxed opacity-80">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { homeData } from '../../data/homeData';

export default function SocialProofSection() {
  return (
    <section className="w-full py-24 px-section-x bg-background border-y border-borderContent">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2 flex flex-col items-start">
          <h2 className="text-3xl md:text-5xl font-display uppercase leading-tight mb-4">
            Trusted by industry <br/> leaders globally
          </h2>
          <p className="text-textSecondary font-mono text-sm uppercase tracking-widest">
            Delivering excellence since 2014
          </p>
        </div>
        
        <div className="md:w-1/2 w-full grid grid-cols-2 md:grid-cols-3 gap-8">
          {homeData.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="text-4xl md:text-6xl font-display text-textPrimary mb-2">
                {metric.value}
              </span>
              <span className="text-xs font-mono text-textSecondary uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

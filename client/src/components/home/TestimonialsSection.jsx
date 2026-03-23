import { homeData } from '../../data/homeData';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-section-y px-section-x bg-surface border-t border-borderContent">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-display-section uppercase leading-none">Client Reviews</h2>
        <span className="hidden md:block font-mono text-sm text-textSecondary uppercase">Don't just take my word for it</span>
      </div>

      <div className="flex flex-col gap-12">
        {homeData.testimonials.map((test) => (
          <div key={test.id} className="flex flex-col md:flex-row pb-12 border-b border-borderContent">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <h3 className="font-display text-2xl uppercase mb-1">{test.name}</h3>
              <p className="font-mono text-xs text-textSecondary uppercase tracking-widest">{test.discipline}</p>
              <p className="font-mono text-xs text-textMuted mt-4">{test.date}</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-2xl md:text-4xl font-display leading-tight italic text-balance before:content-['“'] after:content-['”']">
                {test.quote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

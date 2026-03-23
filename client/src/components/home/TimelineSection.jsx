const timelineList = [
  { id: 1, role: "Design Director", company: "Studio Vanguard", duration: "2021 — Present" },
  { id: 2, role: "Senior Product Designer", company: "NeonTech Inc.", duration: "2018 — 2021" },
  { id: 3, role: "UI/UX Designer", company: "Creative Alpha", duration: "2015 — 2018" },
  { id: 4, role: "Junior Designer", company: "Freelance", duration: "2013 — 2015" }
];

export default function TimelineSection() {
  return (
    <section className="w-full py-section-y px-section-x bg-background">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        
        <div className="md:w-1/3">
          <h2 className="text-display-section uppercase leading-tight mb-6">Career <br/> History</h2>
          <p className="text-textSecondary text-balance">
            A decade of designing high-impact digital experiences across agencies, startups, and freelance engagements.
          </p>
        </div>
        
        <div className="md:w-2/3 flex flex-col">
          {timelineList.map((item) => (
            <div key={item.id} className="group flex flex-col md:flex-row justify-between md:items-center py-8 border-b border-borderContent hover:px-4 hover:bg-surfaceHover transition-all duration-400 cursor-default">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0">
                <h3 className="text-2xl md:text-4xl font-display uppercase group-hover:text-accent transition-colors">{item.role}</h3>
              </div>
              <div className="md:w-1/4 mb-2 md:mb-0 text-textSecondary font-mono text-sm">
                {item.company}
              </div>
              <div className="md:w-1/4 text-right text-textMuted font-mono text-xs uppercase tracking-widest">
                {item.duration}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

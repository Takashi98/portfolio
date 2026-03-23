export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* CSS-only hexagonal grid pattern using repeating background */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08] animate-[fadeIn_2s_ease-out_0.5s_both]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, var(--color-text-muted) 12%, transparent 12.5%, transparent 87%, var(--color-text-muted) 87.5%, var(--color-text-muted)),
            linear-gradient(150deg, var(--color-text-muted) 12%, transparent 12.5%, transparent 87%, var(--color-text-muted) 87.5%, var(--color-text-muted)),
            linear-gradient(30deg, var(--color-text-muted) 12%, transparent 12.5%, transparent 87%, var(--color-text-muted) 87.5%, var(--color-text-muted)),
            linear-gradient(150deg, var(--color-text-muted) 12%, transparent 12.5%, transparent 87%, var(--color-text-muted) 87.5%, var(--color-text-muted)),
            linear-gradient(60deg, var(--color-text-muted) 25%, transparent 25.5%, transparent 75%, var(--color-text-muted) 75%, var(--color-text-muted)),
            linear-gradient(60deg, var(--color-text-muted) 25%, transparent 25.5%, transparent 75%, var(--color-text-muted) 75%, var(--color-text-muted))
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />

      {/* Radial fade mask to dissolve the edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, var(--color-background) 75%)`,
        }}
      />

      {/* Subtle animated gradient shimmer overlay */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20 animate-[shimmer_8s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(circle 600px at var(--shimmer-x, 30%) var(--shimmer-y, 40%), var(--color-surface) 0%, transparent 70%)`,
        }}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 0.15; transform: scale(1); }
        }
        .dark @keyframes fadeIn {
          to { opacity: 0.08; }
        }
        @keyframes shimmer {
          0%, 100% { --shimmer-x: 25%; --shimmer-y: 35%; }
          25% { --shimmer-x: 65%; --shimmer-y: 25%; }
          50% { --shimmer-x: 75%; --shimmer-y: 55%; }
          75% { --shimmer-x: 35%; --shimmer-y: 65%; }
        }
        @property --shimmer-x {
          syntax: '<percentage>';
          inherits: false;
          initial-value: 30%;
        }
        @property --shimmer-y {
          syntax: '<percentage>';
          inherits: false;
          initial-value: 40%;
        }
      `}</style>
    </div>
  );
}

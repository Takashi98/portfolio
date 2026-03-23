/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        surfaceHover: 'var(--color-surface-hover)',
        borderContent: 'var(--color-border)',
        borderHover: 'var(--color-border-hover)',
        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
        textMuted: 'var(--color-text-muted)',
        accent: 'var(--color-accent)', 
        colorBrand: '#e87a3e',
        colorBrandTint: 'rgba(232, 122, 62, 0.1)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'], // Body
        display: ['"Clash Display"', '"Inter"', 'sans-serif'], // Headers
        mono: ['"JetBrains Mono"', 'monospace'], // Micro labels
      },
      fontSize: {
        'micro': ['10px', '1em'],
        'display-hero': ['clamp(3rem, 8vw, 8rem)', '0.9'],
        'display-section': ['clamp(2rem, 5vw, 5rem)', '0.95'],
      },
      spacing: {
        'grid-gap': '24px',
        'section-y': 'clamp(6rem, 15vw, 12rem)',
        'section-x': 'clamp(1.5rem, 5vw, 4rem)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      }
    },
  },
  plugins: [],
}

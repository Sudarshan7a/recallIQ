import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-container': 'var(--color-primary-container)',
        surface: 'var(--color-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        'on-surface': 'var(--color-on-surface)',
        accent: 'var(--color-surface-tint)'
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-default)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)'
      },
      spacing: {
        'base': 'var(--space-base)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)'
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)'
      }
    }
  },
  plugins: []
}

export default config

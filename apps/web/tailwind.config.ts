import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#090514',
        input: '#0d0820',
        'bg-input': '#0d0820',
        surface: {
          1: '#130c25',
          2: '#1a1230',
          3: '#241b40',
        },
        elevated: '#2a1f4d',
        border: {
          subtle: '#2a1b4e',
          DEFAULT: '#3b2a6b',
          strong: '#553f8b',
        },
        brand: {
          primary: '#8b5cf6',
          secondary: '#6366f1',
          tertiary: '#06b6d4',
        },
        status: {
          success: '#34d399',
          warning: '#fbbf24',
          danger: '#ef4444',
          info: '#60a5fa',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          muted: '#64748b',
          disabled: '#475569',
          inverse: '#090514',
        }
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 40px -4px rgba(139,92,246,0.55)',
        'glow-danger': '0 0 40px -4px rgba(239,68,68,0.45)',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
        '2xl': '28px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.2, 0, 0, 1) both',
        'slide-up': 'slideUp 320ms cubic-bezier(0.3, 0, 0, 1) both',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(8px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
export default config;

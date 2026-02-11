/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-void': '#000000',
        'bg-dark': '#020408',
        'bg-sidebar': '#060912',
        'bg-card': '#0b101b',
        'bg-elevated': '#141c2b',
        'bg-card-hover': '#121826',
        primary: {
          DEFAULT: '#2563eb',
          light: '#60a5fa',
          muted: '#1d4ed8',
          glow: 'rgba(37, 99, 235, 0.4)',
        },
        success: {
          DEFAULT: '#059669',
          light: '#34d399',
          glow: 'rgba(5, 150, 105, 0.3)',
        },
        danger: {
          DEFAULT: '#dc2626',
          light: '#f87171',
        },
        warning: '#d97706',
        text: {
          main: '#f9fafb',
          secondary: '#d1d5db',
          muted: '#6b7280',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          bright: 'rgba(255, 255, 255, 0.12)',
          active: 'rgba(37, 99, 235, 0.4)',
        },
        glass: {
          subtle: 'rgba(255, 255, 255, 0.02)',
          medium: 'rgba(255, 255, 255, 0.05)',
          strong: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['80px', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-md': ['64px', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-primary': '0 0 20px var(--primary-glow)',
        'glow-success': '0 0 20px var(--success-glow)',
        'card': '0 20px 40px -20px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s infinite ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D2137',
          light: '#1B3A5C',
          dark: '#07121F',
        },
        gold: {
          DEFAULT: '#C8963E',
          light: '#E8B86D',
          dark: '#A47730',
        },
        warm: {
          50: '#FAFAF8',
          100: '#F5F3EF',
          200: '#EDE9E3',
        },
      },
      fontFamily: {
        serif: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

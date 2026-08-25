/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        husk: {
          50: '#fcf8f2',
          100: '#f7eedf',
          200: '#eed8be',
          300: '#e1bd95',
          400: '#d29c69',
          500: '#c58148',
          600: '#b76a3b',
          700: '#985232',
          800: '#7c432d',
          900: '#653928',
          950: '#361c13',
        },
        areca: {
          50: '#fdfbf7',
          100: '#f7f2e7',
          200: '#ede0c7',
          300: '#dec79f',
          400: '#cca773',
          500: '#bd8b50',
          600: '#aa7143',
          700: '#8d5939',
          800: '#734832',
          900: '#5e3c2c',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(16, 40, 24, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(16, 40, 24, 0.15)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.35)',
      }
    },
  },
  plugins: [],
}

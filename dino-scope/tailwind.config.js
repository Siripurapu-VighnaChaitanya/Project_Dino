/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        volcanic: {
          orange: '#cf4520', // Deep intense orange
          magma: '#8a1c0e', // Darker flow
        },
        jungle: {
          DEFAULT: '#1a3c34', // Deep green
          light: '#2d5a4e',
          mist: '#4a7c6f',
        },
        obsidian: {
          DEFAULT: '#09090b', // Almost black
          shard: '#18181b', // Dark gray
        },
        ash: {
          DEFAULT: '#a1a1aa',
          light: '#d4d4d8',
          dark: '#52525b',
        },
        amber: {
          glow: '#ffbf00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'], // We might need to add a font link
      },
      animation: {
        'slow-zoom': 'zoom 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

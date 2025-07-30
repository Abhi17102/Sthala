/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EF6C00',
        secondary: '#37474F',
        accent: '#00ACC1',
        background: '#F9F9F9',
        text: '#212121',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        blink: {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: '#EF6C00' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        typewriter: 'typewriter 3s steps(12) infinite alternate',
        blink: 'blink 1s infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        float: 'float 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
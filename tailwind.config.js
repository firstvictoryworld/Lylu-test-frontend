/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        indigo: {
          350: '#9277ff',
          450: '#7c5dfa',
          1000: '#1e2139',
          1100: '#252945',
          1200: '#0c0e16',
          1250: '#1f213a',
          1300: '#141625',
        },
        gray: {
          25: '#f9fafe',
          50: '#f8f8f8',
          75: '#dee3f9',
          150: '#494e6e',
          250: '#dee3f9',
          350: '#dfe3fa',
          450: '#888eb0',
          550: '#7388c3',
          650: '#777e98',
          1100: '#2a2c43'
        },
        red: {
          350: '#ff9796',
          450: '#ec5757',
        },
        green: {
          750: '#33d69f',
          1100: '#1f2c3f'
        },
        orange: {
          750: '#ff8f02',
          1100: '#2b2735',
        },

      },
      zIndex: {
        '75': 75,
        '100': 100,
      },
      gridTemplateColumns: {
        'auto-6': 'repeat(6, auto)',
      },
    },
  },
  plugins: [],
}

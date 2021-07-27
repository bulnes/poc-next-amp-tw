const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
          title: '#218ee1',
          primary:"#2c3e50",
          cards: {
            bg:'#ecf0f1',
            border: '#bdc3c7'
          },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

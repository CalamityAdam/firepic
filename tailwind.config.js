module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    colors: {
      primaryBg: '#222323',
      primaryFg: '#dddddd',
      primarySuccess: '#62BA46',
      primaryWarning: '#FBB927',
      primaryError: '#FF5257',
      purple: {
        DEFAULT: '#A550A7',
      },
      blue: {
        DEFAULT: '#007AFF',
      },
      teal: {
        DEFAULT: '#00C7A3',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

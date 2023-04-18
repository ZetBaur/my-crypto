/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},

    colors: {
      backgroundDark: '#141C2D',
      foregroundDark: '#202A40',
      textColorDark: '#E5E6E7',

      backgroundLight: '#FCFCFC',
      foregroundLight: 'F2F0F0',
      textColorLight: '#141525',

      buttonColor: '#3E4396',
      itemColor: '#4CCEAC',
      activeLinkColor: '#3E4396',
    },
  },
  plugins: [],
};

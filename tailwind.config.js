/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FFB37B',
        button: '#F2920C',
        'theme-bg': '#EDE9E4',
        gray: colors.gray,
        red: colors.red,
      }
    },
  },
  plugins: [],
}
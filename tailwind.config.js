/** @type {import('tailwindcss').Config} */
import { getElementPlusThemColor } from './src/utils/getThemeColor'
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ...getElementPlusThemColor() }
    },
  },
  plugins: [],
}


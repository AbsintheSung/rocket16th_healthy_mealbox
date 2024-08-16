/** @type {import('tailwindcss').Config} */
import { getElementPlusThemColor } from './src/utils/getThemeColor'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    /*自訂斷點，蓋過官方預設值 */
    screens: {
      ssm: '430px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1320px'
    },
    container: {
      center: true,
      padding: '0.75rem',
      screens: {
        ssm: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1320px'
      }
    },
    extend: {
      colors: {
        ...getElementPlusThemColor(),
        primary: '#58C067',
        primaryDark:'#286D33',
        primary2: '#FE7F5F'
      }
    }
  },
  plugins: []
}

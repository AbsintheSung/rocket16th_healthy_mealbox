/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    /*自訂斷點，蓋過官方預設值 */
    screens: {
      ssm: '430px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1344px' //1320 + 12(左) + 12(右) = 1344
    },
    container: {
      center: true,
      padding: '0.75rem', //16*0.75=12
      screens: {
        ssm: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1344px' //1320 + 12(左) + 12(右) = 1344
      }
    },
    fontFamily: {
      'Noto-Sans-TC': ['Noto Sans TC', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'home-main': "url('@/assets/image/home-main.png')",
        'plaid-adorn': "url('@/assets/image/plaid.png')",
        "background-style-1": "url('@/assets/image/background-style-1.png')",
        "background-style-2": "url('@/assets/image/background-style-2.png')",
        "background-style-3": "url('@/assets/image/background-style-3.png')"
      },
      colors: {
        primary: {
          base: '#58C067',
          50: '#F2FBF3',
          100: '#E2F6E5',
          200: '#C5EDCA',
          300: '#98DDA2',
          400: '#58C067',
          500: '#3EA94D',
          600: '#2E8B3B',
          700: '#286D33',
          800: '#24572C',
          900: '#1F4826',
          950: '#0C2711'
        },
        secondary: {
          base: '#FA8B6F',
          50: '#FEF4F2',
          100: '#FEE8E2',
          200: '#FFD4C9',
          300: '#FDB6A4',
          400: '#FA8B6F',
          500: '#F26541',
          600: '#DF4923',
          700: '#BB3A1A',
          800: '#9B3319',
          900: '#80301C',
          950: '#461509'
        },
        success: {
          base: '#67c23a'
        },
        warning: {
          base: '#e6a23c'
        },
        danger: {
          base: '#f56c6c'
        },
        error: {
          base: '#f56c6c'
        },
        info: {
          base: '#909399'
        }
      },
      boxShadow: {
        base: '5px 5px black'
      }
    }
  },
  plugins: []
}

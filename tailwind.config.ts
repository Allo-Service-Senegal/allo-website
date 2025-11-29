import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003238',
          50: '#e6f2f3',
          100: '#cce5e7',
          200: '#99cbcf',
          300: '#66b1b7',
          400: '#33979f',
          500: '#003238',
          600: '#002a2f',
          700: '#002126',
          800: '#00191d',
          900: '#001014',
        },
        secondary: {
          DEFAULT: '#5dc3ab',
          50: '#eef9f6',
          100: '#dcf3ed',
          200: '#b9e7db',
          300: '#96dbc9',
          400: '#73cfb7',
          500: '#5dc3ab',
          600: '#4a9c89',
          700: '#387567',
          800: '#254e44',
          900: '#132722',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

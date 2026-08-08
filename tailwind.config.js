/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#e88a1a',
          600: '#d97706',
          700: '#c2710d',
          800: '#9a5b0f',
          900: '#7c4a12',
        },
        maroon: {
          500: '#800020',
          600: '#6b001a',
          700: '#560015',
        },
      },
    },
  },
  plugins: [],
}
